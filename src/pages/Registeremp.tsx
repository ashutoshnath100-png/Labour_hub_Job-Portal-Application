import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Registeremp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    password: "",
    confirmPassword: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.location.trim() &&
    formData.about.trim() &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!isFormValid) {
      setError("Please fill all fields correctly");
      return;
    }


    setLoading(true);
    setError("");


    try {
      const res = await fetch("http://localhost:4000/api/employees/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          location: formData.location.trim(),
          about: formData.about.trim(),
          password: formData.password,
        }),
      });


      const data = await res.json().catch(() => ({}));


      if (res.ok) {
        alert("Registration Successful!");
        navigate("/login", { replace: true });
      } else {
        setError(data?.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error / Backend not running");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <Link
          to="/Home"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-4 font-medium"
        >
          ← Back
        </Link>


        <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-12 p-6 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold mb-2">Register as an Employer</h2>
            <p className="text-gray-500 mb-6">
              Create your account and start hiring skilled workers
            </p>


            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Your Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />


              <Input
                label="Email Address"
                placeholder="Enter your email id"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />


              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                name="phone"
              />


              <Input
                label="Address / Location"
                placeholder="Enter your area/locality"
                value={formData.location}
                onChange={handleChange}
                name="location"
              />


              <div>
                <label className="block text-sm font-medium mb-1">
                  About yourself
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Brief about yourself and hiring needs..."
                  className="w-full border rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>


              <Input
                label="Password"
                type="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />


              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />


              {formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}


              {error && <p className="text-sm text-red-500">{error}</p>}


              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-2.5 rounded-md font-semibold transition ${isFormValid && !loading
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
                  }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>


            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold">
                Sign In
              </Link>
            </p>
          </div>


          <div className="hidden md:flex items-center justify-center">
            <img
              src="/employer-illustration.svg"
              alt="Employer Illustration"
              className="w-96 lg:w-[520px] xl:w-[640px] h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md px-3 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600 select-none"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        )}
      </div>
    </div>
  );
};

export default Registeremp;

