import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTags,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const getCategoryButtonClasses = (currentFilter, category) => {
  const baseClasses =
    "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap";

  if (currentFilter === category) {
    return `${baseClasses} bg-blue-600 text-white shadow-md ring-2 ring-blue-300`;
  } else {
    return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-500`;
  }
};
// ------------------------------------------------------------------------

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isYearly, setIsYearly] = useState(false);

  // Fetch services
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/services");
      return data;
    },
  });

  // Filter and group services
  const filteredServices = useMemo(() => {
    if (!services || !Array.isArray(services)) return [];
    return services.filter(
      (s) =>
        s.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "All" || s.category === categoryFilter)
    );
  }, [services, searchTerm, categoryFilter]);

  const groupedData = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const category = service.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {});
  }, [filteredServices]);

  const categories = useMemo(() => {
    if (!services) return ["All"];
    const uniqueCategories = new Set(
      services.map((s) => s.category).filter(Boolean)
    );
    return ["All", ...uniqueCategories];
  }, [services]);

  // Price calculation now returns the monthly price (adjusted for yearly billing)
  const calculateFinalPrice = (price, discount, isYearly) => {
    const basePrice = Number(price) || 0;
    const itemDiscountRate = (Number(discount) || 0) / 100;

    let monthlyPriceAfterBaseDiscount = basePrice * (1 - itemDiscountRate);

    // Apply a hypothetical yearly saving (e.g., 20% off the annual cost)
    if (isYearly) {
      const yearlyDiscountRate = 0.2; // 20% off annual cost
      const annualPrice = monthlyPriceAfterBaseDiscount * 12;
      monthlyPriceAfterBaseDiscount =
        (annualPrice * (1 - yearlyDiscountRate)) / 12;
    }

    return monthlyPriceAfterBaseDiscount.toFixed(2);
  };

  //  helper to get the standard monthly price (for strike-through display)
  const getStandardMonthlyPrice = (price, discount) => {
    const basePrice = Number(price) || 0;
    const itemDiscountRate = (Number(discount) || 0) / 100;
    return (basePrice * (1 - itemDiscountRate)).toFixed(2);
  };

  // --- Loading & Error States ---
  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        Error loading services: {error.message || "Unknown error"}
      </p>
    );
  if (filteredServices.length === 0)
    return (
      <p className="text-center py-10 text-orange-600 text-xl font-medium">
        No services found matching your criteria. 😥
      </p>
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h3 className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold text-gray-800 mb-10">
        Transparent Pricing Plans
      </h3>

      {/* --- Search, Toggle, and Filter Section (Combined) --- */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        {/* Search and Category Filters (Grouped) */}
        <div className="w-full md:w-2/3 flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="form-control w-full lg:w-2/5">
            <label className="label hidden lg:block">
              <span className="label-text font-medium text-gray-600">
                Search Plan
              </span>
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by plan name..."
                className="input input-bordered w-full border-2 focus:border-blue-500 rounded-l-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn bg-blue-600 text-white hover:bg-blue-700 border-none rounded-r-lg">
                
              </button>
            </div>
          </div>

          {/* Category Filter - Pill Buttons */}
          <div className="form-control w-full lg:w-3/5">
            <label className="label hidden lg:block">
              <span className="label-text font-medium text-gray-600">
                Filter by Category
              </span>
            </label>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start p-1 bg-gray-50 rounded-lg border border-gray-200 overflow-x-auto">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={getCategoryButtonClasses(categoryFilter, cat)}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat === "All" ? (
                    <FaTags className="inline-block mr-1" />
                  ) : null}
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly/Yearly Toggle (Redesigned) */}
      <div className="form-control w-full md:w-1/3 flex justify-center items-center p-2 border-2 border-blue-500 rounded-lg shadow-inner mx-auto">
        <label className="label px-4">
          <span className="label-text font-bold text-blue-600 flex items-center gap-1 px-4 py-2">
            Choose Billing Cycle
          </span>
        </label>
        <div className="flex justify-center items-center gap-1 p-1 bg-gray-50 rounded-full w-full ">
          <button
            onClick={() => setIsYearly(false)}
            className={`
                flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-1
                ${
                  !isYearly
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }
              `}
          >
            <FaCalendarAlt /> Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`
                flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-1
                ${
                  isYearly
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }
              `}
          >
            <FaCalendarCheck /> Yearly
          </button>
        </div>
      </div>

      {Object.entries(groupedData).map(([category, plans]) => (
        <div key={category} className="mb-14">
          <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-8 border-b-4 border-blue-500 inline-block pb-1 transform hover:translate-x-1 transition-transform">
            {category} Services
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan._id || plan.title}
                className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500 p-7 rounded-xl flex flex-col relative"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Yearly Savings Badge */}
                {isYearly && (
                  <div className="absolute top-0 right-0 transform translate-y-[-50%] translate-x-[20%] bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg rotate-3">
                    SAVE 20%
                  </div>
                )}

                {/* Card Content */}
                <div className="flex flex-col mb-4 border-b pb-4">
                  <h5 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.title}
                  </h5>
                  <div className="flex items-center gap-3">
                    {isYearly && (
                      <span className="text-sm text-gray-400 line-through">
                        ${getStandardMonthlyPrice(plan.price, plan.discount)}
                      </span>
                    )}
                    <span className="text-4xl font-extrabold text-blue-600">
                      $
                      {calculateFinalPrice(plan.price, plan.discount, isYearly)}
                    </span>
                    <span className="text-lg text-gray-500">/ month</span>
                  </div>
                  <p
                    className={`text-xs font-semibold mt-1 ${
                      isYearly ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    ({isYearly ? "Billed Annually" : "Billed Monthly"})
                  </p>
                </div>

                <p className="text-sm text-gray-600 mb-4 font-semibold">
                  {plan.discount > 0
                    ? `🔥 Base discount: ${plan.discount}%!`
                    : "No active base discount."}
                </p>

                <ul className="mb-6 space-y-3 flex-grow">
                  {Array.isArray(plan.features) &&
                    plan.features.map((feature, idx) => (
                      <li
                        key={`${plan._id}-${feature}-${idx}`}
                        className="flex items-start gap-3 text-gray-700 text-base"
                      >
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                </ul>

                <motion.button
                  className="btn btn-primary w-full bg-blue-600 text-white border-none hover:bg-blue-700 mt-auto py-3 text-lg font-semibold"
                  whileHover={{ scale: 1.02, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isYearly ? "Commit Annually" : "Subscribe Monthly"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
