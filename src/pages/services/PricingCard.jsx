"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const PricingCard = ({ title, price, discount, features = [], isYearly }) => {
  const yearlyPrice = Math.round(price * 12 * (1 - discount / 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative card bg-base-100 shadow-xl border hover:shadow-2xl transition p-6 flex flex-col"
    >
      {/* 🔥 Discount Badge (Yearly Only) */}
      {isYearly && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md"
        >
          {discount}% OFF
        </motion.div>
      )}

      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>

      <div className="text-center mb-4">
        <span className="text-4xl font-extrabold text-primary">
          {isYearly ? yearlyPrice : price}৳
        </span>

        <p className="text-sm text-gray-500 mt-1">
          {isYearly ? (
            <>
              Yearly (save{" "}
              <span className="text-green-500 font-bold">{discount}%</span>)
            </>
          ) : (
            "Per Month"
          )}
        </p>
      </div>

      <ul className="space-y-2 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <FaCheckCircle className="text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className="btn bg-violet-600 text-white">Book Now</button>
    </motion.div>
  );
};

export default PricingCard;
