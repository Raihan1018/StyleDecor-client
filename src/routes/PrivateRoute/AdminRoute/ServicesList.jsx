import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const ServicesList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [priceSort, setPriceSort] = useState(""); // low/high
  const [categoryFilter, setCategoryFilter] = useState(""); // selected category

  const { register, handleSubmit, reset } = useForm();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await axiosSecure.get("/services")).data,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/services/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async (serviceData) =>
      axiosSecure.put(`/services/${serviceData._id}`, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setModalOpen(false);
      Swal.fire("Updated!", "Service has been updated.", "success");
    },
  });

  // Get all unique categories
  const categories = useMemo(() => {
    if (!services) return [];
    return Array.from(new Set(services.map((s) => s.category).filter(Boolean)));
  }, [services]);

  // Filter & Sort services
  const displayedServices = useMemo(() => {
    if (!services) return [];
    let filtered = [...services];

    // Filter by category
    if (categoryFilter)
      filtered = filtered.filter((s) => s.category === categoryFilter);

    // Sort by price
    if (priceSort === "low") filtered.sort((a, b) => a.price - b.price);
    else if (priceSort === "high") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [services, priceSort, categoryFilter]);

  if (isLoading) return <Loading />;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          },
        });
      }
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    reset(service);
    setModalOpen(true);
  };

  const onUpdateSubmit = (data) => {
    const featuresArray = data.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    updateMutation.mutate({
      ...data,
      features: featuresArray,
      price: Number(data.price),
    });
  };

  return (
    <div className="py-12 px-6 md:px-14 lg:px-28 bg-gray-50">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6">
        All <span className="text-violet-500">Services</span>
      </h2>

      {/* Sorting & Filter */}
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <select
          className="select select-bordered w-52"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <select
          className="select select-bordered w-52"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price (BDT/hr)</th>
              <th>Discount (%)</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedServices.map((service, index) => (
              <tr key={service._id}>
                <th>{index + 1}</th>
                <td>{service.title}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>{service.discount || 0}</td>
                <td>{service.features?.join(", ")}</td>
                <td className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-sm btn-info"
                    onClick={() =>
                      Swal.fire(
                        service.title,
                        service.features?.join(", "),
                        "info"
                      )
                    }
                  >
                    <FaEye />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(service)}
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(service._id)}
                  >
                    <FaTrash />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {modalOpen && editingService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full relative shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Update Service</h3>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onUpdateSubmit)}
            >
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("title", { required: true })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("category", { required: true })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Price (BDT/hr)
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("price", { required: true, min: 1 })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Discount (%)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("discount")}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Features</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  {...register("features", { required: true })}
                ></textarea>
              </div>

              <div className="flex gap-4 mt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-success flex-1 flex justify-center items-center gap-2"
                >
                  <FaCheck /> Update
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-secondary flex-1"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
