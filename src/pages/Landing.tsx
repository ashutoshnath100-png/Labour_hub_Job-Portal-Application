import React, { useState, useEffect } from "react";
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
  ArrowRight,
  Star,
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
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const handleSearch = () => {
    navigate(
      `/find-labour?skill=${encodeURIComponent(selectedSkill)}&location=${encodeURIComponent(location)}`
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/home-stats`);
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/category-counts`);
        const data = await res.json();
        setCategoryCounts(data?.counts || {});
      } catch (e) {
        console.log("Category counts error", e);
      }
    };
    fetchCategoryCounts();
    fetchStats();
  }, []);

  return (
    <main className="w-full font-sans bg-[#F9FAFB] text-[#1A1A1A] overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-[#0A0F1D]">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-sm font-medium tracking-wide"
          >
            <Star size={14} className="fill-orange-400" />
            TRUSTED BY 10,000+ HOUSEHOLDS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-black mb-8 leading-[1.1] tracking-tight"
          >
            Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Manual Labor</span> <br />
            On Your Demand
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl mb-12 font-light leading-relaxed"
          >
            A premium network of verified local professionals. 
            Quality work, direct communication, and instant hiring.
          </motion.p>

          {/* ================= SEARCH BAR (SaaS Style) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-center items-center gap-3 p-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl max-w-4xl mx-auto shadow-2xl"
          >
            <div className="flex items-center w-full md:w-1/3 px-4 border-r border-white/10">
              <Users size={18} className="text-orange-500 mr-3" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="bg-transparent py-4 w-full outline-none text-white cursor-pointer"
              >
                <option className="bg-gray-900" value="All">All Skills</option>
                <option className="bg-gray-900" value="Electrician">Electrician</option>
                <option className="bg-gray-900" value="Plumber">Plumber</option>
                <option className="bg-gray-900" value="Carpenter">Carpenter</option>
              </select>
            </div>

            <div className="flex items-center w-full md:flex-1 px-4">
              <MapPin size={18} className="text-orange-500 mr-3" />
              <input
                type="text"
                placeholder="Enter Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent py-4 w-full outline-none text-white placeholder-gray-500"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 transition-all px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95 w-full md:w-auto justify-center"
            >
              <Search size={18} /> Search
            </button>
          </motion.div>

          {/* ================= STATS ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto"
          >
            <HeroStat value={stats.verifiedWorkers} label="Verified Experts" />
            <HeroStat value={stats.successfulJobs} label="Completed Projects" />
            <HeroStat value={stats.citiesCovered} label="Service Hubs" />
            <HeroStat value={`${stats.userRating}★`} label="Average Rating" />
          </motion.div>

          {/* ================= SKILL CHIPS ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-12 mb-10"
          >
            <HeroChip icon={<Plug size={16} />} name="Electrician" />
            <HeroChip icon={<Wrench size={16} />} name="Plumber" />
            <HeroChip icon={<Hammer size={16} />} name="Carpenter" />
            <HeroChip icon={<Paintbrush size={16} />} name="Painter" />
            <HeroChip icon={<Car size={16} />} name="Driver" />
          </motion.div>

          {/* ================= TRUST BADGES ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center gap-10 text-gray-400 text-xs font-semibold tracking-widest uppercase"
          >
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-orange-500"/> Verified</div>
            <div className="flex items-center gap-2"><PhoneCall size={16} className="text-orange-500"/> Direct Connect</div>
            <div className="flex items-center gap-2"><Zap size={16} className="text-orange-500"/> Instant</div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Platform Advantage</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 text-[#0A0F1D]">Professionalism Guaranteed</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg font-light">
            We bridge the gap between traditional labor and modern reliability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature icon={<MapPin size={28} />} title="Localized Results" desc="Connecting you with talent in your immediate vicinity." />
            <Feature icon={<ShieldCheck size={28} />} title="Identity Verified" desc="Every professional undergoes rigorous document verification." />
            <Feature icon={<Clock size={28} />} title="24/7 Availability" desc="Find help when you need it, day or night." />
            <Feature icon={<Zap size={28} />} title="Priority Access" desc="Skip the wait with our instant matching technology." />
          </div>
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="py-24 px-6 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="text-left">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Our Network</span>
              <h2 className="text-4xl font-black mt-2 text-[#0A0F1D]">Industry Specializations</h2>
            </div>
            <Link to="/find-labour" className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all">
              Explore All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 px-6 bg-[#0A0F1D] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">The Workflow</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-20">Hire in Minutes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Step number="01" icon={<Search size={32} />} title="Search Skill" />
            <Step number="02" icon={<Users size={32} />} title="Vett Profiles" />
            <Step number="03" icon={<PhoneCall size={32} />} title="Quick Contact" />
            <Step number="04" icon={<CheckCircle size={32} />} title="Task Done" />
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const HeroStat = ({ value, label }: any) => (
  <div className="flex flex-col">
    <span className="text-4xl font-black text-white mb-1">{value}</span>
    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{label}</span>
  </div>
);

const HeroChip = ({ icon, name }: any) => (
  <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
    <span className="text-orange-500">{icon}</span>
    <span>{name}</span>
  </div>
);

const Feature = ({ icon, title, desc }: any) => (
  <div className="bg-[#F9FAFB] p-10 rounded-3xl border border-gray-100 text-left hover:shadow-xl transition-all duration-500 group">
    <div className="w-14 h-14 bg-white shadow-sm text-orange-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h3 className="font-bold text-xl mb-3 text-[#0A0F1D]">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const Skill = ({ icon, name, count }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-transparent hover:border-orange-200 flex flex-col items-center gap-4 transition-all shadow-sm hover:shadow-xl cursor-pointer group"
  >
    <div className="w-16 h-16 bg-[#F9FAFB] text-gray-600 group-hover:text-orange-500 group-hover:bg-orange-50 rounded-2xl flex items-center justify-center transition-all">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-[#0A0F1D]">{name}</h3>
    <span className="bg-gray-100 text-gray-500 group-hover:bg-orange-500 group-hover:text-white px-3 py-1 rounded-full text-xs font-bold transition-all">
      {count}+ Pro
    </span>
  </motion.div>
);

const Step = ({ icon, title, number }: any) => (
  <div className="flex flex-col items-center group">
    <div className="relative mb-8">
      <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-black border-4 border-[#0A0F1D]">
        {number}
      </span>
      <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
    </div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-500 text-xs uppercase tracking-widest">Seamless Integration</p>
  </div>
);

export default Landing;