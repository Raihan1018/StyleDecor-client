import React, { useState } from "react";

// Data structure for the electrical plans
const plansData = [
  {
    name: "Standard Repair",
    priceMonthly: 2000,
    features: [
      "Minor wiring repairs (up to 3 points)",
      "Light fixture replacement (1-2 units)",
      "Outlet/switch installation (1-2 units)",
      "Basic troubleshooting",
    ],
  },
  {
    name: "Circuit Check-up",
    priceMonthly: 4500,
    priceDiscountedMonthly: 4200, // Monthly Discount
    features: [
      "Full circuit breaker inspection",
      "Wiring upgrade consultation",
      "GFC/AFCI outlet installation (up to 3 units)",
      "Ceiling fan installation (1 unit)",
      "Emergency service priority",
    ],
  },
  {
    name: "Home Rewiring",
    priceMonthly: 7000,
    priceDiscountedMonthly: 6500, // Monthly Discount
    features: [
      "Comprehensive home electrical audit",
      "Panel replacement planning",
      "Smart home device integration (up to 5 devices)",
      "Dedicated circuit installation for appliances",
      "Full surge protection system",
    ],
  },
];

// Helper component for the checkmark SVG (White Theme: Blue accent)
const CheckIcon = ({ className = "w-6 h-6 text-blue-600" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    ></path>
  </svg>
);

// Helper component for individual pricing cards
const PricingCard = ({ plan, isMonthly, yearlyDiscount, color }) => {
  const price = plan.priceDiscountedMonthly || plan.priceMonthly;
  const originalPrice = plan.priceMonthly;

  let displayPrice;
  let discountedPrice = null;
  let originalPriceDisplay = null;
  let timeUnit = "/mo";

  if (isMonthly) {
    displayPrice = price;
    if (plan.priceDiscountedMonthly) {
      originalPriceDisplay = originalPrice;
    }
  } else {
    const annualPrice = price * 12;
    discountedPrice = Math.round(annualPrice * (1 - yearlyDiscount));
    displayPrice = discountedPrice;
    originalPriceDisplay = annualPrice;
    timeUnit = "/yr";
  }

  // Dynamic Tailwind classes (Simplified for White Theme)
  const cardClasses = `
    relative z-0 flex flex-col items-center p-8 rounded-md 
    border-2 bg-white transition-all duration-300 ease-in-out
    transform hover:scale-[1.03] hover:shadow-xl 
    border-gray-300
  `;
  const buttonClasses = `
    btn px-8 py-3 mt-4 text-lg font-semibold uppercase rounded transition-colors duration-300 text-${color}-500 border-${color}-500 hover:bg-${color}-500 hover:text-white
  `;
  const colorClasses = `bg-${color}-600 text-white text-${color}-600`;
  const discountTextClasses = `text-sm text-center text-green-600 font-semibold mb-2`;

  return (
    <div className={cardClasses}>
      {/* Name Tag */}
      <span
        className={`absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg ${colorClasses
          .split(" ")
          .slice(0, 2)
          .join(" ")}`}
      >
        {plan.name}
      </span>

      {/* Price Display */}
      <p className="flex items-center justify-center my-6 space-x-2 font-bold mt-16">
        {originalPriceDisplay && (
          <span className="text-lg line-through text-gray-700">
            &nbsp;{originalPriceDisplay.toLocaleString("en-IN")} ৳&nbsp;
          </span>
        )}
        <span
          className={`pb-2 text-4xl ${colorClasses
            .split(" ")
            .slice(2)
            .join(" ")}`}
        >
          {displayPrice.toLocaleString("en-IN")} ৳
        </span>
        {isMonthly && <span className="text-lg">{timeUnit}</span>}
      </p>

      {/* Annual Discount Note */}
      {!isMonthly && (
        <p className={discountTextClasses}>
          🎉 Save {yearlyDiscount * 100}% Annually!
        </p>
      )}

      {/* Features List */}
      <ul className="flex-1 space-y-2 mb-6 text-left w-full">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckIcon className={`w-6 h-6 text-${color}-600`} />
            <span className="capitalize">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={buttonClasses}>Subscribe</button>
    </div>
  );
};

const Electrical = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const isMonthly = billingPeriod === "monthly";
  const yearlyDiscountRate = 0.05;
  const color = "blue"; // Theme color for Electrical

  // Button classes (Simplified for White Theme)
  const activeBtnClasses = `px-4 py-1 font-semibold border rounded-l-lg bg-${color}-600 border-${color}-600 text-white transition-colors`;
  const inactiveBtnClasses = `px-4 py-1 border rounded-r-lg border-${color}-600 text-gray-800 transition-colors`;

  return (
    <div>
      <section className="py-6 bg-white text-gray-900">
        <div className="container mx-auto p-4 sm:p-10">
          <div className="mb-16 space-y-4 text-center">
            <h1 className="text-4xl font-semibold leading-tight">
              Electrical Pricing
            </h1>
            <p className="px-4 sm:px-8 lg:px-24">
              Professional electrical services for safety and reliability in
              your home or office.
            </p>
            {/* Toggler Button Group */}
            <div
              className={`inline-flex border-2 rounded-lg border-${color}-600`}
            >
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={
                  isMonthly
                    ? activeBtnClasses.replace("rounded-r-lg", "")
                    : inactiveBtnClasses.replace("rounded-r-lg", "")
                }
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annually")}
                className={
                  !isMonthly
                    ? activeBtnClasses.replace("rounded-l-lg", "")
                    : inactiveBtnClasses.replace("rounded-l-lg", "")
                }
              >
                Annually
              </button>
            </div>
            {/* Annual Discount Highlight */}
            {!isMonthly && (
              <p className={`text-sm text-${color}-600 font-bold mt-2`}>
                * You save an extra {yearlyDiscountRate * 100}% with the Annual
                Plan!
              </p>
            )}
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:max-w-full lg:gap-2 xl:gap-6 lg:grid-cols-3">
            {plansData.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                isMonthly={isMonthly}
                yearlyDiscount={yearlyDiscountRate}
                color={color}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Electrical;
