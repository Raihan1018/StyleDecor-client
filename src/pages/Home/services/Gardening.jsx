import React, { useState } from "react";
import PricingCard from "./PricingCard";

const Gardening = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
  {
    title: "Basic",
    price: 600,
    discount: 3,
    features: [
      "Plant Watering & Care",
      "Basic Weed Removal",
      "Garden Sweeping",
      "Small Plant Trimming",
    ],
  },
  {
    title: "Standard",
    price: 1200,
    discount: 5,
    features: [
      "All Basic Plan Services",
      "Lawn Mowing",
      "Hedge & Bush Trimming",
      "Soil Fertilizing",
      "Pest Checkup",
    ],
  },
  {
    title: "Premium",
    price: 2200,
    discount: 7,
    features: [
      "All Standard Plan Services",
      "Garden Layout Improvement",
      "Planting New Plants & Pots",
      "Pest Treatment Support",
      "Seasonal Garden Maintenance",
    ],
  },
];


  return (
    <div className="py-12">
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6">
        See Our <span className="text-violet-500">Gardening</span> Pricing Plan
      </h3>

      {/* Toggle */}
      <div className="flex justify-center items-center gap-4 mb-10">
        <button
          onClick={() => setIsYearly(false)}
          className={`btn ${!isYearly ? "btn-primary" : "btn-outline"}`}
        >
          Monthly
        </button>

        <button
          onClick={() => setIsYearly(true)}
          className={`btn ${isYearly ? "btn-primary" : "btn-outline"}`}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {plans.map((plan, i) => (
          <PricingCard
            key={i}
            title={plan.title}
            price={plan.price}
            discount={plan.discount}
            features={plan.features}
            isYearly={isYearly}
          />
        ))}
      </div>
    </div>
  );
};

export default Gardening;
