import React, { useState } from "react";

// Data structure for the cleaning plans
const plansData = [
  {
    name: "Basic Cleaning",
    priceMonthly: 1500,

    features: [
      "Room cleaning (1-2 rooms)",
      "Dusting surfaces",
      "Basic kitchen cleaning",
      "Basic bathroom cleaning",
    ],
  },
  {
    name: "Standard Cleaning",
    priceMonthly: 3000,
    // Original price was 3000, current is 2800 -> 6.67% discount monthly
    priceDiscountedMonthly: 2800,
    features: [
      "Full house cleaning",
      "Kitchen & bathroom deep clean",
      "Aliquam",
      "Window dusting",
      "Furniture wipe",
    ],
  },
  {
    name: "Premium Cleaning",
    priceMonthly: 4000,
    // Original price was 4000, current is 3700 -> 7.5% discount monthly
    priceDiscountedMonthly: 3700,
    features: [
      "Full house deep cleaning",
      "Bathroom & kitchen sterilization",
      "Furniture & wall dusting",
      "Terrace/balcony cleaning",
    ],
  },
];

// Helper component for the checkmark SVG
const CheckIcon = ({ className = "w-6 h-6 dark:text-violet-600" }) => (
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
const PricingCard = ({ plan, isMonthly, yearlyDiscount }) => {
  const price = plan.priceDiscountedMonthly || plan.priceMonthly;
  const originalPrice = plan.priceMonthly;

  // Calculate prices based on the selected plan type
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
    // Annual Calculation: (Monthly Price * 12) * (1 - Discount)
    const annualPrice = price * 12;
    // Apply 5% yearly discount (0.05)
    discountedPrice = Math.round(annualPrice * (1 - yearlyDiscount));
    displayPrice = discountedPrice;
    originalPriceDisplay = annualPrice;
    timeUnit = "/yr";
  }

  // Tailwind classes for styling
  const cardClasses = `
    relative z-0 flex flex-col items-center p-8 rounded-md 
    border-2 dark:bg-gray-100 transition-all duration-300 ease-in-out
    transform hover:scale-[1.03] hover:shadow-2xl 
    
  `;
  const buttonClasses = `
    btn px-8 py-3 mt-4 text-lg font-semibold uppercase rounded transition-colors duration-300 text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white
    
  `;

  return (
    <div className={cardClasses}>
      <span className="absolute top-0 px-6 pt-1 pb-2 font-medium rounded-b-lg dark:bg-violet-600 dark:text-gray-50">
        {plan.name}
      </span>

      <p className="flex items-center justify-center my-6 space-x-2 font-bold mt-16">
        {originalPriceDisplay && (
          <span className="text-lg line-through dark:text-gray-700">
            &nbsp;{originalPriceDisplay.toLocaleString("en-IN")} ৳&nbsp;
          </span>
        )}
        <span className="pb-2 text-4xl dark:text-violet-600">
          {displayPrice.toLocaleString("en-IN")} ৳
        </span>
        {isMonthly && <span className="text-lg">{timeUnit}</span>}
      </p>

      {!isMonthly && (
        <p className="text-sm text-center text-green-600 font-semibold mb-2">
          🎉 Save {yearlyDiscount * 100}% Annually!
        </p>
      )}

      <ul className="flex-1 space-y-2 mb-6 text-left w-full">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckIcon />
            <span className="capitalize">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={buttonClasses}>Subscribe</button>
    </div>
  );
};

const Cleaning = () => {
  // State to manage the pricing period: 'monthly' or 'annually'
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const isMonthly = billingPeriod === "monthly";
  const yearlyDiscountRate = 0.05; // 5%

  // Button classes
  const activeBtnClasses =
    "px-4 py-1 font-semibold border rounded-l-lg dark:bg-violet-600 dark:border-violet-600 dark:text-gray-50 transition-colors";
  const inactiveBtnClasses =
    "px-4 py-1 border rounded-r-lg dark:border-violet-600 transition-colors";

  return (
    <div>
      <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
        <div className="container mx-auto p-4 sm:p-10">
          <div className="mb-16 space-y-4 text-center">
            <h1 className="text-4xl font-semibold leading-tight">
              Cleaning Pricing
            </h1>
            <p className="px-4 sm:px-8 lg:px-24">
              Sunt suscipit eaque qui iure unde labore numquam iusto alias
              explicabo, pariatur ipsam, cupiditate aliquid modi?
            </p>
            {/* Toggler Button Group */}
            <div className="inline-flex border-2 rounded-lg dark:border-violet-600">
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
              <p className="text-sm text-violet-600 font-bold mt-2">
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
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cleaning;
