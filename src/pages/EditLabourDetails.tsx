import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type React from "react";
import axios from "axios";


export default function EditLabourProfile() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([
    "Electrician",
    "Wiring",
    "AC Repair",
  ]);
  const [newSkill, setNewSkill] = useState<string>("");


  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    experience: 8,
    rate: 600,
    rate_type: "Per Day",
    location: "Sector 18, Noida, UP",
    about:
      "Experienced electrician with expertise in residential and commercial wiring, AC installation and repair.",
  });


  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "labour") return;


        const res = await fetch("http://localhost:4000/api/labour/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json().catch(() => ({}));
        if (!res.ok) return;


        setProfile((p) => ({
          ...p,
          name: data?.name || "",
          phone: data?.phone || "",
          experience: Number(data?.experience || 0),
          rate: Number(data?.price || 0),
          location: data?.location || "",
          about: data?.about || "",
          rate_type: data?.rate_type || "Per Day",
        }));


        if (Array.isArray(data?.skills)) setSkills(data.skills);
      } catch (e) {
        console.error("loadProfile error:", e);
      }
    };


    loadProfile();
  }, []);


  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };


  const addSkill = () => {
    const s = newSkill.trim();
    if (!s) return;


    if (skills.some((x) => x.toLowerCase() === s.toLowerCase())) {
      setNewSkill("");
      return;
    }


    setSkills([...skills, s]);
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };


  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Token missing,login again")


      await axios.patch(
        "http://localhost:4000/api/labour/profile",
        {
          name: profile.name,
          phone: profile.phone,
          experience: profile.experience,
          price: profile.rate,
          location: profile.location,
          about: profile.about,
          skills: skills,
          rate_type: profile.rate_type,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      alert("Profile saved ✅");
      navigate("/labour-dashboard");
    } catch (err) {
      console.error(err);
      alert("Profile update failed ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white">
          <p
            className="text-sm opacity-90 cursor-pointer"
            onClick={() => navigate("/labour-dashboard")}
          >
            ← Back to Dashboard
          </p>


          <h1 className="text-3xl font-semibold mt-2">Edit Profile</h1>
          <p className="opacity-90">
            Update your profile to attract more employers
          </p>
        </div>


        <div className="p-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-28 h-28 rounded-2xl bg-orange-100 overflow-hidden flex items-center justify-center shadow">
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-orange-500">👤</span>
              )}
            </div>


            <div>
              <h3 className="font-semibold text-lg">Profile Photo</h3>
              <p className="text-sm text-gray-500 mb-2">JPG, PNG · Max 5MB</p>


              <label className="cursor-pointer text-orange-600 font-medium hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600">
                Experience (Years)
              </label>
              <input
                type="number"
                value={profile.experience}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    experience: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-gray-600">
                Your Rate (₹)
              </label>
              <div className="flex gap-3 mt-1">
                <input
                  type="number"
                  value={profile.rate}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      rate: Number(e.target.value),
                    }))
                  }
                  className="flex-1 rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                />


                <select
                  value={profile.rate_type}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, rate_type: e.target.value }))
                  }
                  className="rounded-xl border px-4 py-3"
                >
                  <option>Per Day</option>
                  <option>Per Hour</option>
                </select>
              </div>
            </div>
          </div>


          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600">
              Address / Location
            </label>
            <input
              value={profile.location}
              onChange={(e) =>
                setProfile((p) => ({ ...p, location: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>


          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600">
              About Yourself
            </label>
            <textarea
              rows={4}
              value={profile.about}
              onChange={(e) =>
                setProfile((p) => ({ ...p, about: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>


          <div className="mt-8">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Your Skills
            </label>


            <div className="flex flex-wrap gap-3 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>


            <div className="flex gap-3">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 rounded-xl border px-4 py-3 outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl shadow"
              >
                Add
              </button>
            </div>
          </div>


          <div className="flex justify-end gap-4 mt-12">
            <button
              type="button"
              onClick={() => navigate("/labour-dashboard")}
              className="px-6 py-3 rounded-xl border hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="button"
              onClick={handleSave}
              className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}