import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaPlus,
  FaTag,
  FaDollarSign,
  FaClock,
  FaPercent,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const AddServices = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories dynamically from services
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get("/services");
        const uniqueCategories = Array.from(
          new Set(data.map((s) => s.category).filter(Boolean))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  const onSubmit = async (formData) => {
    // Confirmation before submitting
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this service?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    });

    if (!result.isConfirmed) return;

    try {
      setSubmitting(true);

      // Convert features from comma-separated string to array
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);

      const serviceData = {
        ...formData,
        features: featuresArray,
        price: Number(formData.price),
      };

      await axiosSecure.post("/services", serviceData);

      // Show success alert
      Swal.fire({
        title: "Service Added!",
        text: `The service "${formData.title}" has been added successfully.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      reset();
    } catch (err) {
      console.error("Failed to add service:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add service. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-6 md:px-14 lg:px-28 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12"
      >
        Add New <span className="text-violet-600">Service</span>
      </motion.h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6"
      >
        {/* Service Title */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Service Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter service title"
            className="input input-bordered w-full"
            {...register("title", { required: "Title is required" })}
          />
          <FaPlus className="absolute right-4 top-12 text-gray-400" />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Category</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">
              Price (BDT per hour)
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="input input-bordered w-full"
            {...register("price", { required: "Price is required", min: 1 })}
          />
          <FaDollarSign className="absolute right-4 top-12 text-gray-400" />
          {errors.price && (
            <span className="text-red-500 text-sm mt-1">
              {errors.price.message}
            </span>
          )}
        </div>

        {/* Discount */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Discount (%)</span>
          </label>
          <input
            type="number"
            placeholder="Enter discount (optional)"
            className="input input-bordered w-full"
            {...register("discount", { min: 0, max: 100 })}
          />
          <FaPercent className="absolute right-4 top-12 text-gray-400" />
        </div>

        {/* Unit (fixed per hour) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Unit</span>
          </label>
          <input
            type="text"
            value="hour"
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            {...register("unit")}
          />
        </div>

        {/* Features */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Features (comma separated)
            </span>
          </label>
          <textarea
            placeholder="e.g., Furniture Assembly, Tool Handling, Minor Adjustments"
            className="textarea textarea-bordered w-full"
            {...register("features", { required: "Features are required" })}
          ></textarea>
          {errors.features && (
            <span className="text-red-500 text-sm mt-1">
              {errors.features.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="btn btn-primary bg-violet-600 hover:bg-violet-700 text-white w-full flex justify-center items-center gap-2 py-3 text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={submitting}
        >
          <FaCheck /> {submitting ? "Adding..." : "Add Service"}
        </motion.button>
      </form>
    </div>
  );
};

export default AddServices;
