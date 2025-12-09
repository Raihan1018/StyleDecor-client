import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const MeetOurExperts = () => {
  const axiosSecure = useAxiosSecure();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const { data } = await axiosSecure.get("/experts");
        setExperts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="py-16 px-6 md:px-14 lg:px-28 ">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4">
        Meet Our <span className="text-violet-600">Experts</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Our team of professionals are trained, experienced, and ready to serve
        you across multiple categories.
      </p>

      {/* Marquee Section */}
      <Marquee gradient={false} speed={50} pauseOnHover className="py-4">
        {experts.map((expert, index) => (
          <motion.div
            key={expert._id || index}
            whileHover={{ scale: 1.08, rotate: 1 }}
            className="w-64 mx-3 flex-shrink-0 backdrop-blur-md bg-white/30 shadow-xl hover:shadow-2xl border  rounded-3xl p-6 flex flex-col items-center transition-all duration-300"
          >
            {/* Expert Photo */}
            <div className="relative w-32 h-32 mb-4">
              <img
                src={
                  expert.photo ||
                  `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
                }
                alt={expert.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-violet-600 shadow-md"
              />
              <div className="absolute -bottom-2 right-0 bg-violet-600 text-white px-2 py-1 text-xs rounded-full shadow-md">
                {expert.category || "General"}
              </div>
            </div>

            {/* Expert Name */}
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <FaUserTie className="text-violet-600" />{" "}
              {expert.name || `Expert ${index + 1}`}
            </h3>

            {/* Expertise Badge */}
            <p className="text-sm bg-gradient-to-r from-violet-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-sm uppercase font-semibold">
              {expert.category || "General"}
            </p>
          </motion.div>
        ))}
      </Marquee>

      {/* Mobile-friendly grid fallback */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
        {experts.map((expert, index) => (
          <motion.div
            key={expert._id || index}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-md bg-white/30 shadow-xl border border-gray-200 rounded-3xl p-4 flex flex-col items-center transition-all duration-300"
          >
            <img
              src={
                expert.photo ||
                `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
              }
              alt={expert.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-violet-600 shadow-md mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {expert.name || `Expert ${index + 1}`}
            </h3>
            <p className="text-sm bg-gradient-to-r from-violet-500 to-pink-500 text-white px-2 py-1 rounded-full mt-2 shadow-sm uppercase font-semibold">
              {expert.category || "General"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurExperts;
