import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Car,
  Scissors,
  Plug,
  Users,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

const Landing: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    verifiedWorkers: 0,
    successfulJobs: 0,
    citiesCovered: 0,
    userRating: 0,
  });
  const[categoryCounts, setCategoreyCounts] = useState<Record<string, number>>({});
  const handleSearch = () => {
    navigate(
      `/find-labour?skill=${encodeURIComponent(
        selectedSkill
      )}&location=${encodeURIComponent(location)}`
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/home-stats");
        const data = await res.json();

        setStats({
          verifiedWorkers: data.verifiedWorkers ?? 0,
          successfulJobs: data.successfulJobs ?? 0,
          citiesCovered: data.citiesCovered ?? 0,
          userRating: data.userRating ?? 0,
        });
      } catch (e) {
        console.log("Home stats error", e);
      }
    };
    const fetchCategoryCounts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/category-counts");
        const data = await res.json();
        setCategoreyCounts(data?.counts || {});
      } catch (e) {
        console.log("Category counts error", e);
      }
    };
    fetchCategoryCounts();
    fetchStats();
  }, []);
  return (
    <main className="w-full font-sans text-gray-800">

      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-gradient-to-br from-[#0B3C88] via-[#0E4BA8] to-[#0B3C88] flex items-center px-6 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:22px_22px] opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
          >
            Find Skilled <span className="text-[#FF7A00]">Workers</span> Near You
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-blue-100 max-w-3xl mx-auto text-lg sm:text-xl mb-12"
          >
            Connect with verified local labourers for construction, plumbing,
            electrical work and more. Hire instantly with just a call.
          </motion.p>

          {/* ================= SEARCH BAR ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 mb-14"
          >
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 rounded-lg py-3 w-[30%] outline-none text-gray-700"
            >
              <option value="All">All Skills</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Carpenter">Carpenter</option>
            </select>

            <Input
              icon={<MapPin size={18} />}
              placeholder="Location"
              value={location}
              onChange={(e: any) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <button
              onClick={handleSearch}
              className="bg-[#FF7A00] hover:bg-orange-600 transition px-10 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
            >
              <Search size={18} /> Search
            </button>
          </motion.div>

          {/* ================= STATS ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14"
          >
            <HeroStat value={stats.verifiedWorkers} label="Verified Workers" />
            <HeroStat value={stats.successfulJobs} label="Successful Jobs" />
            <HeroStat value={stats.citiesCovered} label="Cities Covered" />
            <HeroStat value={`${stats.userRating}★`} label="User Rating" />
          </motion.div>

          {/* ================= SKILL CHIPS ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <HeroChip icon={<Plug size={18} />} name="Electrician" />
            <HeroChip icon={<Wrench size={18} />} name="Plumber" />
            <HeroChip icon={<Hammer size={18} />} name="Carpenter" />
            <HeroChip icon={<Paintbrush size={18} />} name="Painter" />
            <HeroChip icon={<Car size={18} />} name="Driver" />
          </motion.div>

          {/* ================= TRUST BADGES ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-8 text-blue-100 text-sm"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} /> Verified Profiles
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall size={18} /> Direct Call
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} /> Instant Hiring
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="min-h-screen flex items-center bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FF7A00] font-semibold mb-3">Why Choose Us</p>
          <h2 className="text-4xl font-bold mb-6">
            The Smarter Way to Hire Labour
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-14 text-lg">
            We simplify the labour hiring process using smart, reliable
            technology built for everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Feature icon={<MapPin size={28} />} title="Nearby Workers" />
            <Feature icon={<ShieldCheck size={28} />} title="Verified Profiles" />
            <Feature icon={<Clock size={28} />} title="Real-Time Availability" />
            <Feature icon={<Zap size={28} />} title="Instant Hiring" />
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="min-h-screen flex items-center px-4 sm:px-6">
        <div className="w-full text-center">
          <p className="text-[#FF7A00] font-semibold text-lg mb-3">
            Popular Categories
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16">
            Find Workers by Skill
          </h2>

          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14">
              <Skill icon={<Plug size={28} />} name="Electrician" count={categoryCounts["Electrician"] ?? 0} />
              <Skill icon={<Wrench size={28} />} name="Plumber" count={categoryCounts["Plumber"] ?? 0} />
              <Skill icon={<Hammer size={28} />} name="Carpenter" count={categoryCounts["Carpenter"] ?? 0} />
              <Skill icon={<Users size={28} />} name="Mason" count={categoryCounts["Mason"] ?? 0} />
              <Skill icon={<Zap size={28} />} name="Welder" count={categoryCounts["Welder"] ?? 0} />
              <Skill icon={<Car size={28} />} name="Driver" count={categoryCounts["Driver"] ?? 0} />
              <Skill icon={<Scissors size={28} />} name="Tailor" count={categoryCounts["Tailor"] ?? 0} />
              <Skill icon={<Paintbrush size={28} />} name="Painter" count={categoryCounts["Painter"] ?? 0} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="min-h-screen flex items-center bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#FF7A00] font-semibold mb-3">How It Works</p>
          <h2 className="text-4xl font-bold mb-14">
            Hire Workers in 4 Simple Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Link to="/find-labour">
              <Step icon={<Search size={32} />} title="Search Worker" />
            </Link>
            <Step icon={<Users size={32} />} title="View Profile" />
            <Step icon={<PhoneCall size={32} />} title="Contact Directly" />
            <Step icon={<CheckCircle size={32} />} title="Get Work Done" />
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ icon, placeholder, value, onChange, onKeyPress }: any) => (
  <div className="flex items-center bg-white rounded-xl px-5 w-full md:w-72 shadow">
    <span className="text-gray-400 mr-3">{icon}</span>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className="py-3 w-full outline-none text-gray-700"
    />
  </div>
);

const Feature = ({ icon, title }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center">
    <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-[#FF7A00] mb-5">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
  </div>
);

const Skill = ({ icon, name,count }: any) => (
  <div className="border rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-[#FF7A00] hover:shadow transition cursor-pointer">
    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#FF7A00]">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-sm text-gray-500">{count}+ Workers</p>
  </div>
);

const Step = ({ icon, title }: any) => (
  <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center">
    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#FF7A00] mb-6">
      {icon}
    </div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">Simple, fast and reliable process</p>
  </div>
);

const HeroStat = ({ value, label }: any) => (
  <div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-blue-200 text-sm">{label}</p>
  </div>
);

const HeroChip = ({ icon, name }: any) => (
  <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-2.5 rounded-full text-sm">
    {icon}
    <span>{name}</span>
  </div>
);

export default Landing;