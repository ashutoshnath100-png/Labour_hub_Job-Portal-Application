
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TopBar from "../components/Topbar"

type Labour = {
  labourId: string
  name: string
  document: string
  ignoredJobs: number
}

const LabourVerification = () => {

  const navigate = useNavigate()

  const [data, setData] = useState<Labour[]>([])
  const [reminderMsg, setReminderMsg] = useState("")
  const [warningMsg, setWarningMsg] = useState("")
  const [blockMsg, setBlockMsg] = useState("")

  const [reminderRemaining, setReminderRemaining] = useState(0)
  const [warningRemaining, setWarningRemaining] = useState(0)
  const [blockRemaining, setBlockRemaining] = useState(0)

  useEffect(() => {
    fetchLabours()
    fetchCooldowns()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setReminderRemaining(p => p > 1000 ? p - 1000 : 0)
      setWarningRemaining(p => p > 1000 ? p - 1000 : 0)
      setBlockRemaining(p => p > 1000 ? p - 1000 : 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const fetchCooldowns = async () => {

    const token = localStorage.getItem("token")

    const reminder = await fetch(`${import.meta.env.VITE_API_URL}/admin/reminder-cooldown`, { headers: { Authorization: `Bearer ${token}` } })
    const warning = await fetch(`${import.meta.env.VITE_API_URL}/admin/warning-cooldown`, { headers: { Authorization: `Bearer ${token}` } })
    const block = await fetch(`${import.meta.env.VITE_API_URL}/admin/block-cooldown`, { headers: { Authorization: `Bearer ${token}` } })

    const r = await reminder.json()
    const w = await warning.json()
    const b = await block.json()

    setReminderRemaining(r.remaining || 0)
    setWarningRemaining(w.remaining || 0)
    setBlockRemaining(b.remaining || 0)

  }

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    return `${h}h ${m}m ${s}s`
  }

  const fetchLabours = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/labour-verification`, { headers: { Authorization: `Bearer ${token}` } })

    const result = await res.json()

    if (result.success) {
      setData(result.data)
    }

  }

  const sendReminderBulk = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/send-reminder-bulk`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })

    const result = await res.json()

    if (result.success) {
      setReminderMsg("Reminder sent successfully")
    } else {
      setReminderMsg(result.message)
    }

    fetchCooldowns()

    setTimeout(() => setReminderMsg(""), 3000)

  }

  const sendWarningBulk = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/send-warning-bulk`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })

    const result = await res.json()

    if (result.sent > 0) {
      setWarningMsg("Warning sent successfully")
    } else {
      setWarningMsg("No applicable labour for warning")
    }

    fetchCooldowns()

    setTimeout(() => setWarningMsg(""), 3000)

  }

  const blockUser = async (id: string) => {

    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/block-labour/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result = await res.json()

    if (result.success) {
      setBlockMsg("User blocked successfully")
      fetchLabours()
    }

  }

  const blockAllInactive = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/block-all-inactive`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    })

    const result = await res.json()

    if (result.blocked > 0) {
      setBlockMsg("Inactive users blocked")
    } else {
      setBlockMsg("No inactive labour to block")
    }

    fetchCooldowns()
    fetchLabours()

    setTimeout(() => setBlockMsg(""), 3000)

  }

  const missed = data.filter(l => l.ignoredJobs === 1).length
  const reminder = data.filter(l => l.ignoredJobs === 2).length
  const warning = data.filter(l => l.ignoredJobs === 3).length
  const inactive = data.filter(l => l.ignoredJobs >= 4).length

  const badgeColor = (count: number) => {
    if (count === 1) return "bg-blue-500"
    if (count === 2) return "bg-yellow-500"
    if (count === 3) return "bg-orange-500"
    return "bg-red-600"
  }

  const badgeText = (count: number) => {
    if (count === 1) return "Missed Job"
    if (count === 2) return "Reminder"
    if (count === 3) return "Warning"
    return "Inactive"
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <TopBar />

      <div className="max-w-[1300px] mx-auto px-6 py-8">

        <h1 className="text-2xl font-semibold mb-6">
          Labour Verification
        </h1>

        <div className="grid grid-cols-4 gap-5 mb-8">

          <div className="bg-white border rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Missed</p>
            <h2 className="text-3xl font-bold text-blue-600">{missed}</h2>
          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Reminder</p>
                <h2 className="text-3xl font-bold text-yellow-600">{reminder}</h2>
              </div>

              <button
                disabled={reminderRemaining > 0}
                onClick={sendReminderBulk}
                className="bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-600 text-white px-4 py-4 rounded-lg text-sm"
              >
                Send Reminder
              </button>
            </div>

            {reminderRemaining > 0 &&
              <p className="text-xs text-red-500 mt-2">
                Next reminder available in {formatTime(reminderRemaining)}
              </p>
            }

            {reminderMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {reminderMsg}
              </p>
            }

          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Warning</p>
                <h2 className="text-3xl font-bold text-orange-600">{warning}</h2>
              </div>

              <button
                disabled={warningRemaining > 0}
                onClick={sendWarningBulk}
                className="bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 text-white px-4 py-4 rounded-lg text-sm"
              >
                Send Warning
              </button>
            </div>

            {warningRemaining > 0 &&
              <p className="text-xs text-red-500 mt-2">
                Next warning available in {formatTime(warningRemaining)}
              </p>
            }

            {warningMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {warningMsg}
              </p>
            }

          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Block</p>
                <h2 className="text-3xl font-bold text-red-600">{inactive}</h2>
              </div>

              <button
                disabled={blockRemaining > 0}
                onClick={blockAllInactive}
                className="bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-700 text-white px-6 py-4 rounded-lg text-sm"
              >
                Block All
              </button>
            </div>

            {blockRemaining > 0 &&
              <p className="text-xs text-red-500 mt-2">
                Next block available in {formatTime(blockRemaining)}
              </p>
            }

            {blockMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {blockMsg}
              </p>
            }

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          {data.map(l => (
            <div
              key={l.labourId}
              onClick={() => navigate(`/admin/users/${l.labourId}`)}
              className="bg-white border rounded-xl shadow hover:shadow-md transition cursor-pointer p-4"
            >

              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-800 text-sm">
                  {l.name}
                </h2>

                <span className={`text-white text-[10px] px-2 py-0.5 rounded-full ${badgeColor(l.ignoredJobs)}`}>
                  {badgeText(l.ignoredJobs)}
                </span>
              </div>

              <p className="text-xs text-gray-400">
                Ignored Jobs
              </p>

              <h3 className="text-xl font-bold text-gray-800">
                {l.ignoredJobs}
              </h3>

              <div className="flex justify-between items-center mt-3">

                <a
                  href={l.document}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-indigo-600 hover:underline">
                  View Document
                </a>

                {l.ignoredJobs >= 4 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      blockUser(l.labourId)
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md"
                  >
                    Block
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>

  )
}

export default LabourVerification