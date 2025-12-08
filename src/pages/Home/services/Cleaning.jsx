import React, { useState } from "react";
import PricingCard from "./PricingCard";

const Cleaning = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Basic",
      price: 700,
      discount: 3,
      features: [
        "Room Dusting & Sweeping",
        "Surface Cleaning",
        "Trash Removal",
        "Basic Bathroom Cleaning",
      ],
    },
    {
      title: "Standard",
      price: 1500,
      discount: 5,
      features: [
        "All Basic Plan Services",
        "Floor Mopping & Deep Dusting",
        "Kitchen Surface Cleaning",
        "Bathroom Deep Clean",
        "Window Glass & Fan Cleaning",
      ],
    },
    {
      title: "Premium",
      price: 3000,
      discount: 7,
      features: [
        "All Standard Plan Services",
        "Full Home Deep Cleaning",
        "Carpet & Sofa Cleaning",
        "Appliance Exterior Cleaning",
        "Balcony & Outdoor Cleaning",
        "Same-Day Service Available",
      ],
    },
  ];

  return (
    <div className="py-12">
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6">
        See Our <span className="text-violet-500">Cleaning</span> Pricing Plan
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

export default Cleaning;
