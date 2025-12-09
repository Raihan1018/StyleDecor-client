import React from "react";
import {
  FaSearch,
  FaCalendarCheck,
  FaUserCheck,
  FaSmile,
} from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaSearch className="w-10 h-10 text-violet-600" />,
    title: "Choose a Service",
    desc: "Browse through our services and select the one that suits your needs.",
  },
  {
    icon: <FaCalendarCheck className="w-10 h-10 text-violet-600" />,
    title: "Schedule a Booking",
    desc: "Pick a convenient date and time for our professionals to arrive.",
  },
  {
    icon: <FaUserCheck className="w-10 h-10 text-violet-600" />,
    title: "Professional Arrives",
    desc: "Our trained experts arrive on time and provide top-quality service.",
  },
  {
    icon: <FaSmile className="w-10 h-10 text-violet-600" />,
    title: "Enjoy Hassle-Free Service",
    desc: "Sit back and relax while we take care of everything. Satisfaction guaranteed!",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 px-6 md:px-14 lg:px-28">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
        How <span className="text-violet-600">It Works</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Follow these simple steps to book a service and enjoy a hassle-free
        experience.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
