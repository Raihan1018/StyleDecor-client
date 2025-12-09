import React from "react";
import {
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaMedal,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaShieldAlt className="w-12 h-12 text-violet-600" />,
    title: "Trusted & Verified Service",
    desc: "We provide fully verified, background-checked and trained professionals to ensure safety and quality.",
  },
  {
    icon: <FaClock className="w-12 h-12 text-violet-600" />,
    title: "On-Time Service",
    desc: "We value your time. Our experts arrive on schedule and complete the work efficiently.",
  },
  {
    icon: <FaUsers className="w-12 h-12 text-violet-600" />,
    title: "Experienced Professionals",
    desc: "Our team is highly experienced in gardening, assembly, shifting, cleaning, pest control and more.",
  },
  {
    icon: <FaMedal className="w-12 h-12 text-violet-600" />,
    title: "Quality Guarantee",
    desc: "We maintain premium standards and guarantee the best quality for every service you book.",
  },
  {
    icon: <FaLeaf className="w-12 h-12 text-violet-600" />,
    title: "Eco-Friendly Solutions",
    desc: "Whether gardening or cleaning, our experts use safe, eco-friendly equipment and materials.",
  },
  {
    icon: <FaCheckCircle className="w-12 h-12 text-violet-600" />,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden fees. Choose from monthly or yearly plans.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-16 px-6 md:px-14 lg:px-28">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        Why <span className="text-violet-600">Choose Us?</span>
      </h2>

      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        We provide modern, affordable and professional home services built on
        trust, quality and customer satisfaction. Your comfort is our
        responsibility.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg hover:shadow-xl transition-all p-8 rounded-2xl border border-gray-100"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {item.title}
            </h3>
            <p className="text-center text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-xl font-medium mb-4">
          Your satisfaction is our top priority.
        </p>
        <Link to={'all-services'} className="btn bg-violet-500 text-white px-8 py-3 rounded-full text-lg">
          Book a Service Now
        </Link>
      </div>
    </div>
  );
};

export default WhyChooseUs;
