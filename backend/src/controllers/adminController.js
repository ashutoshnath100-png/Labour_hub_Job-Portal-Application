import { connection, collectionName } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { OAuth2Client } from "google-auth-library";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import axios from "axios";

dotenv.config();


const secretKey = process.env.SECRET_KEY;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};




export const adminLogin = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const db = await connection();


    if (!email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }


    if (!isValidEmail(email)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }


    const user = await db.collection(collectionName).findOne({ email });


    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        field: "password",
        message: "Wrong Password"
      });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: "50d" }
    );


    return resp.status(200).send({
      success: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    return resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};




export const googleAdminLogin = async (req, resp) => {
  try {
    const { token } = req.body;


    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    const payload = ticket.getPayload();
    const { email, name } = payload;


    const db = await connection();
    let user = await db.collection(collectionName).findOne({ email });


    if (!user) {
      const result = await db.collection(collectionName).insertOne({
        name,
        email,
        googleLogin: true,
        createdAt: new Date(),
      });


      user = {
        _id: result.insertedId,
        email,
      };
    }


    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: "50d" }
    );


    return resp.status(200).send({
      success: true,
      token: jwtToken,
    });
  } catch (error) {
    return resp.status(401).send({
      success: false,
      message: "Google authentication failed",
    });
  }
};




export const verifyForgotPassword = async (req, resp) => {
  try {
    const { email, mobile } = req.body;


    if (!email || !mobile) {
      return resp.status(400).send({
        success: false,
        message: "Email and mobile are required",
      });
    }


    const db = await connection();
    const admin = await db.collection(collectionName).findOne({ email });


    if (!admin || admin.mobile !== mobile) {
      return resp.status(400).send({
        success: false,
        message: "Verification failed",
      });
    }


    resp.send({
      success: true,
      message: "Verification successful",
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: err.message,
    });
  }
};




export const resetPasswordDirect = async (req, resp) => {
  try {
    const { email, mobile, password, confirmPassword } = req.body;


    if (!email || !mobile || !password || !confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }


    if (password !== confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }


    const db = await connection();
    const admin = await db.collection(collectionName).findOne({ email });


    if (!admin || admin.mobile !== mobile) {
      return resp.status(400).send({
        success: false,
        message: "Verification failed",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await db.collection(collectionName).updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );


    resp.send({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: err.message,
    });
  }
};




export const getAdminProfile = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;


    const admin = await db.collection(collectionName).findOne(
      { _id: new ObjectId(adminId) },
      { projection: { password: 0 } }
    );


    if (!admin) {
      return resp.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }


    resp.send({
      success: true,
      data: admin,
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};




export const updateAdminProfile = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;
    const { name, mobile } = req.body;


    await db.collection(collectionName).updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { name, mobile } }
    );


    resp.send({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


export const changeAdminPassword = async (req, resp) => {
  try {
    const db = await connection();
    const adminId = req.admin.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;


    if (!currentPassword || !newPassword || !confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }


    if (newPassword !== confirmPassword) {
      return resp.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }


    const admin = await db.collection(collectionName).findOne({
      _id: new ObjectId(adminId),
    });


    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );


    if (!isMatch) {
      return resp.status(401).send({
        success: false,
        message: "Current password incorrect",
      });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);


    await db.collection(collectionName).updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { password: hashedPassword } }
    );


    resp.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


export const recentRegistrations = async (req, resp) => {
  try {
    const db = await connection();

    const labourUsers = await db.collection("labour").find({}).toArray();
    const employeeUsers = await db.collection("employees").find({}).toArray();

    const labour = labourUsers.map((u) => ({
      ...u,
      role: "labour"
    }));

    const employees = employeeUsers.map((u) => ({
      ...u,
      role: "employee"
    }));

    const allUsers = [...labour, ...employees]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    resp.send({
      success: true,
      data: allUsers
    });
  } catch (err) {
    resp.status(500).send({
      success: false,
      message: "server error"
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const { role, search, status } = req.query;
    const db = await connection();

    const labourUsers = await db.collection("labour").find({}).sort({ createdAt: -1 }).toArray();
    const employeeUsers = await db.collection("employees").find({}).sort({ createdAt: -1 }).toArray();

    const hireRequests = await db.collection("hireRequests").find({}).sort({ createdAt: -1 }).toArray();

    const ignored = await db.collection("hireRequests").aggregate([
      {
        $match: {
          status: "timed_out"
        }
      },
      {
        $group: {
          _id: "$labourId",
          ignoredJobs: { $sum: 1 }
        }
      }
    ]).toArray();

    const ignoreMap = {};
    ignored.forEach(i => {
      ignoreMap[i._id.toString()] = i.ignoredJobs;
    });

    const labours = labourUsers.map(u => {
      const request = hireRequests
        .filter(r => r.labourId?.toString() === u._id.toString())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      return {
        ...u,
        role: "labour",
        status: request ? request.status : "Unassigned",
        ignoredJobs: ignoreMap[u._id.toString()] || 0
      };
    });

    const employees = employeeUsers.map(u => ({
      ...u,
      role: "employee",
      status: u.status || "accepted",
      ignoredJobs: 0
    }));

    let allUsers = [...labours, ...employees];

    if (role && role !== "all") {
      allUsers = allUsers.filter(u => u.role === role);
    }

    if (status && status !== "all") {
      allUsers = allUsers.filter(u => u.status === status);
    }

    if (search) {
      const s = search.toLowerCase();
      allUsers = allUsers.filter(u =>
        u.name?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
      );
    }

    res.send({
      success: true,
      users: allUsers
    });

  } catch {
    res.status(500).send({ success: false });
  }
};


export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = await connection();

    await db.collection("hireRequests").updateOne(
      { labourId: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    res.send({
      success: true,
      message: "Status updated"
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Update failed"
    });
  }
};


const sendWhatsAppReminder = async (phone) => {
  await axios.post(
    "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages",
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: "Reminder: You missed job requests. Please respond." }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  )
}

const sendWhatsAppWarning = async (phone) => {
  await axios.post(
    "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages",
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: "Warning: You are ignoring job requests. Please respond immediately." }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  )
}

export const getLabourVerification = async (req, res) => {
  try {

    const db = await connection()

    const data = await db.collection("hireRequests").aggregate([
      {
        $match: {
          status: "timed_out",
        }
      },
      {
        $group: {
          _id: "$labourId",
          ignoredJobs: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "labour",
          localField: "_id",
          foreignField: "_id",
          as: "labour"
        }
      },
      { $unwind: "$labour" },
      {
        $project: {
          labourId: "$_id",
          name: "$labour.name",
          phone: "$labour.phone",
          document: "$labour.document",
          ignoredJobs: 1
        }
      }
    ]).toArray()

    res.send({ success: true, data })

  } catch {
    res.status(500).send({ success: false })
  }
}

export const sendReminder = async (req, res) => {
  try {

    const db = await connection()

    const users = await db.collection("hireRequests").aggregate([
      {
        $match: {
          status: "timed_out",
        }
      },
      {
        $group: {
          _id: "$labourId",
          ignoredJobs: { $sum: 1 }
        }
      },
      {
        $match: { ignoredJobs: 2 }
      }
    ]).toArray()

    if (!users.length) {
      return res.send({ success: false, message: "No users eligible for reminder" })
    }

    const now = new Date()
    const next24 = new Date(now.getTime() + 86400000)

    let sent = 0

    for (const u of users) {

      const last = await db.collection("labourActions").findOne(
        { labourId: u._id, type: "reminder" },
        { sort: { createdAt: -1 } }
      )

      if (last && new Date(last.nextAllowedAt) > now) {
        continue
      }

      const labour = await db.collection("labour").findOne({
        _id: new ObjectId(u._id)
      })

      if (!labour) continue

      if (labour?.phone) {
        try {
          await sendWhatsAppReminder(labour.phone)
        } catch (err) {
          console.log("WhatsApp failed:", err.message)
        }
      }

      await db.collection("labourActions").insertOne({
        labourId: u._id,
        type: "reminder",
        createdAt: now,
        nextAllowedAt: next24
      })

      await db.collection("notifications").insertOne({
        userId: u._id,
        type: "reminder",
        message: "You missed job requests. Please respond.",
        isRead: false,
        createdAt: new Date()
      })

      sent++
    }

    res.send({
      success: true,
      sent
    })

  } catch (error) {

    console.log("Reminder Error:", error)

    res.status(500).send({
      success: false,
      error: error.message
    })

  }
}

export const sendWarning = async (req, res) => {
  try {

    const db = await connection()

    const users = await db.collection("hireRequests").aggregate([
      { $match: { status: "timed_out" } },
      { $group: { _id: "$labourId", ignoredJobs: { $sum: 1 } } },
      { $match: { ignoredJobs: 3 } }
    ]).toArray()

    const now = new Date()
    const next24 = new Date(now.getTime() + 86400000)

    let sent = 0

    for (const u of users) {

      const last = await db.collection("labourActions").findOne(
        { labourId: u._id, type: "warning" },
        { sort: { createdAt: -1 } }
      )

      if (last && new Date(last.nextAllowedAt) > now) {
        continue
      }

      const labour = await db.collection("labour").findOne({
        _id: new ObjectId(u._id)
      })

      if (!labour) continue

      if (labour?.phone) {
        await sendWhatsAppWarning(labour.phone)
      }

      await db.collection("labourActions").insertOne({
        labourId: u._id,
        type: "warning",
        createdAt: now,
        nextAllowedAt: next24
      })

      await db.collection("notifications").insertOne({
        userId: new ObjectId(u._id),
        type: "warning",
        message: "Warning: You are ignoring job requests.",
        isRead: false,
        createdAt: new Date()
      })

      sent++
    }

    res.send({ success: true, sent })

  } catch (error) {

    console.log("Warning Error:", error)

    res.status(500).send({ success: false })

  }
}

export const getReminderCooldown = async (req, res) => {
  try {

    const db = await connection()

    const last = await db.collection("labourActions").findOne(
      { type: "reminder" },
      { sort: { createdAt: -1 } }
    )

    if (!last) {
      return res.send({ remaining: 0 })
    }

    const remaining = new Date(last.nextAllowedAt) - new Date()

    res.send({ remaining: remaining > 0 ? remaining : 0 })

  } catch {
    res.send({ remaining: 0 })
  }
}

export const getWarningCooldown = async (req, res) => {
  try {

    const db = await connection()

    const last = await db.collection("labourActions").findOne(
      { type: "warning" },
      { sort: { createdAt: -1 } }
    )

    if (!last) {
      return res.send({ remaining: 0 })
    }

    const remaining = new Date(last.nextAllowedAt) - new Date()

    res.send({ remaining: remaining > 0 ? remaining : 0 })

  } catch {
    res.send({ remaining: 0 })
  }
}

export const blockLabour = async (req, res) => {
  try {

    const db = await connection()
    const { id } = req.params

    await db.collection("labour").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "blocked", updatedAt: new Date() } }
    )

    res.send({ success: true })

  } catch {
    res.status(500).send({ success: false })
  }
}

export const blockAllInactive = async (req, res) => {
  try {

    const db = await connection()

    const users = await db.collection("hireRequests").aggregate([
      { $match: { status: "timed_out" } },
      { $group: { _id: "$labourId", ignoredJobs: { $sum: 1 } } },
      { $match: { ignoredJobs: { $gte: 4 } } }
    ]).toArray()

    const now = new Date()
    const next24 = new Date(now.getTime() + 86400000)

    let blocked = 0

    for (const u of users) {

      const labour = await db.collection("labour").findOne({
        _id: new ObjectId(u._id)
      })

      if (!labour) continue

      const last = await db.collection("labourActions").findOne(
        { labourId: u._id, type: "block" },
        { sort: { createdAt: -1 } }
      )

      if (last && new Date(last.nextAllowedAt) > now) {
        continue
      }

      if (labour.status !== "blocked") {

        await db.collection("labour").updateOne(
          { _id: new ObjectId(u._id) },
          { $set: { status: "blocked", updatedAt: new Date() } }
        )

        blocked++
      }

      await db.collection("labourActions").insertOne({
        labourId: u._id,
        type: "block",
        createdAt: now,
        nextAllowedAt: next24
      })

    }

    res.send({
      success: true,
      blocked
    })

  } catch (error) {

    console.log("Block Error:", error)

    res.status(500).send({ success: false })

  }
}

export const getBlockCooldown = async (req, res) => {
  try {

    const db = await connection()

    const last = await db.collection("labourActions").findOne(
      { type: "block" },
      { sort: { createdAt: -1 } }
    )

    if (!last) {
      return res.send({ remaining: 0 })
    }

    const remaining = new Date(last.nextAllowedAt) - new Date()

    res.send({ remaining: remaining > 0 ? remaining : 0 })

  } catch {
    res.send({ remaining: 0 })
  }
}

export const getDashboardStats = async (req, res) => {
  try {

    const db = await connection();

    const labourCount = await db.collection("labour").countDocuments();
    const employerCount = await db.collection("employees").countDocuments();

    const totalUsers = labourCount + employerCount;

    const approved = await db.collection("hireRequests").distinct("labourId", {
      status: "accepted"
    })

    const pendingUser = await db.collection("hireRequests").distinct("labourId",{
      status: "pending"
    });

    const rejected = await db.collection("hireRequests").countDocuments({
      status: "rejected"
    });

    const activeWorkers = approved.length;
    const pending = pendingUser.length;
    
    res.send({
      success: true,
      data: {
        totalUsers,
        activeWorkers,
        pending,
        rejected: rejected,
        employers: employerCount,
        labour: labourCount
      }
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: "Dashboard stats failed"
    });

  }
};


export const getSingleUser = async (req, resp) => {
  try {

    const { id } = req.params
    const db = await connection()
    const objectId = new ObjectId(id)

    let user = await db.collection("labour").findOne({ _id: objectId })

    let role = "labour"

    if (!user) {
      user = await db.collection("employees").findOne({ _id: objectId })
      role = "employee"
    }

    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found"
      })
    }

    let status = "Unassigned"

    if (role === "labour") {

      const request = await db.collection("hireRequests")
        .find({ labourId: objectId })
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray()

      if (request.length) {
        status = request[0].status
      }

    }

    resp.send({
      success: true,
      data: {
        ...user,
        role,
        status
      }
    })

  } catch (error) {

    resp.status(500).send({
      success: false,
      message: "Failed to fetch User"
    })

  }
}

export const updateUserProfileStatus = async (req, resp) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accept", "reject"].includes(status)) {
      return resp.status(400).send({
        success: false,
        message: "Invalid status value"
      })
    }

    const db = await connection();
    const objectId = new ObjectId(id);

    let result = await db.collection("labour").updateOne(
      { _id: objectId },
      { $set: { status, updateAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      result = await db.collection("employees").updateOne(
        { _id: objectId },
        { $set: { status, updateAt: new Date() } }
      );
    }

    if (result.matchedCount === 0) {
      return resp.status(404).send({
        success: false,
        message: "User not found"
      })
    }

    resp.send({
      success: true,
      message: "User status updated"
    })
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Failed to update user status"
    })
  }
}



export const getReportsData = async (req, res) => {
  try {
    const db = await connection();
    const { days } = req.query;

    let filter = {};

    if (days) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - parseInt(days));
      filter = { createdAt: { $gte: pastDate } };
    }

    const users = await db.collection("labour").find(filter).toArray();

    const labourCount = users.filter(u => u.role === "labour").length;
    const employerCount = users.filter(u => u.role === "employer").length;

    const dailyMap = {};
    users.forEach(user => {
      const date = new Date(user.createdAt).toISOString().split("T")[0];
      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });

    const dailyGrowth = Object.keys(dailyMap).map(date => ({
      date,
      count: dailyMap[date]
    }));

    const monthlyArray = new Array(12).fill(0);
    users.forEach(user => {
      const month = new Date(user.createdAt).getMonth();
      monthlyArray[month] += 1;
    });

    res.send({
      success: true,
      labourCount,
      employerCount,
      dailyGrowth,
      monthlyData: monthlyArray,
      total: users.length
    });

  } catch (error) {
    res.status(500).send({ success: false });
  }
};


export const exportCSVData = async (req, res) => {
  try {
    const db = await connection();

    const labours = await db.collection("labour").find({}).toArray();
    const employers = await db.collection("employees").find({}).toArray();

    const users = [
      ...labours.map(u => ({
        name: u.name || "",
        email: u.email || "",
        role: "labour"
      })),
      ...employers.map(u => ({
        name: u.name || "",
        email: u.email || "",
        role: "employer"
      }))
    ];

    let csv = "Name,Email,Role\n";

    users.forEach(u => {
      csv += `${u.name},${u.email},${u.role}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("report.csv");
    res.send(csv);

  } catch (error) {
    res.status(500).send({ success: false });
  }
};

export const exportPDFData = async (req, res) => {
  try {

    const db = await connection();

    const labours = await db.collection("labour").find({}).toArray();
    const employers = await db.collection("employees").find({}).toArray();

    const users = [
      ...labours.map(u => ({
        name: u.name || "",
        email: u.email || "",
        role: "labour"
      })),
      ...employers.map(u => ({
        name: u.name || "",
        email: u.email || "",
        role: "employer"
      }))
    ];

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Urban Force Report", { align: "center" });

    doc.moveDown();

    let y = 120;

    doc.fontSize(12).text("Name", 50, y);
    doc.text("Email", 250, y);
    doc.text("Role", 450, y);

    y += 20;

    users.forEach(u => {
      doc.text(u.name, 50, y);
      doc.text(u.email, 250, y);
      doc.text(u.role, 450, y);
      y += 20;
    });

    doc.end();

  } catch (error) {
    res.status(500).send({ success: false });
  }
};