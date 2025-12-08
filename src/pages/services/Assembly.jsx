import React, { useState } from "react";
import PricingCard from "./PricingCard";

const Assembly = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Basic",
      price: 400,
      discount: 3,
      features: [
        "Furniture Assembly (Small Items)",
        "Shelf & Rack Setup",
        "Basic Tool Usage",
        "Minor Adjustments & Tightening",
      ],
    },
    {
      title: "Standard",
      price: 900,
      discount: 5,
      features: [
        "All Basic Plan Services",
        "Bed, Wardrobe & Table Assembly",
        "TV Stand & Cabinet Setup",
        "Curtain Rod & Wall Mount Fittings",
        "Safety Check After Installation",
      ],
    },
    {
      title: "Premium",
      price: 1600,
      discount: 7,
      features: [
        "All Standard Plan Services",
        "Full Room/Office Furniture Assembly",
        "Custom Installation Support",
        "Heavy Item Assembly (Large Wardrobe, Desk)",
        "Emergency Same-Day Support",
      ],
    },
  ];

  return (
    <div className="py-12">
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6">
        See Our <span className="text-violet-500">Assembly</span> Pricing Plan
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

export default Assembly;
