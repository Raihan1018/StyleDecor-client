import React, { useState } from "react";
import PricingCard from "./PricingCard";

const Electrical = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Basic",
      price: 500,
      discount: 3,
      features: [
        "Light & Fan Checkup & Repair",
        "Minor Wiring Fixes",
        "Switch & Socket Checkup",
        "Circuit Breaker Testing",
      ],
    },
    {
      title: "Standard",
      price: 1000,
      discount: 5,
      features: [
        "All Basic Plan Services",
        "New Switch/Socket Installation",
        "Ceiling Fan Installation/Repair",
        "Light Holder/Fitting Installation",
        "Load Test & Safety Check",
      ],
    },
    {
      title: "Premium",
      price: 2000,
      discount: 7,
      features: [
        "All Standard Plan Services",
        "Full House Wiring Checkup",
        "Distribution Board Maintenance",
        "Appliance Connection Support (AC, Geyser, Fridge)",
        "Emergency Electrical Support (Same Day)",
      ],
    },
  ];

  return (
    <div className="py-12">
      <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-6">
        See Our <span className="text-violet-500">Electrical</span> Pricing Plan
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

export default Electrical;
