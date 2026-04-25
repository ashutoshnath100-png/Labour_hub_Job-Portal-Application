import { motion } from "framer-motion";
import { Search, ShieldCheck, PhoneCall, Star } from "lucide-react";


const steps = [
  {
    id: 1,
    title: "Search for a Worker",
    desc: "Choose the skill and location to find nearby workers instantly.",
    icon: <Search className="w-6 h-6 text-orange-500" />,
    img: "/search.svg",
  },
  {
    id: 2,
    title: "Get Verified Labour",
    desc: "All workers are ID-verified and trusted by users.",
    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
    img: "/verified.svg",
  },
  {
    id: 3,
    title: "Connect Instantly",
    desc: "Call or chat directly. No agents, no delay.",
    icon: <PhoneCall className="w-6 h-6 text-orange-500" />,
    img: "/connect.svg",
  },
  {
    id: 4,
    title: "Job Done & Rate",
    desc: "Complete the job and rate the worker for trust.",
    icon: <Star className="w-6 h-6 text-orange-500" />,
    img: "/rate.svg",
  },
];

function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-700 py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How <span className="text-orange-500">Urban Force</span> Works
          </h2>
          <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
            Hire trusted local workers in just four simple steps.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Dotted line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-blue-300 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white text-gray-800 rounded-2xl p-6 shadow-xl text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {step.id}
                </div>

                {/* Illustration */}
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-32 h-32 mx-auto mb-6 object-contain"
                />

                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button
            onClick={() => (window.location.href = "/find-labour")}
            className="bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-full font-semibold shadow-xl transition"
          >
            Find Workers Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
export default HowItWorks;
