import React, { useEffect, useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { formatDistanceToNow } from "date-fns"; // <-- date-fns import
import "swiper/css";
import "swiper/css/effect-cards";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const ClientReview = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosSecure.get("/clientReviews"); // API endpoint
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch client reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="py-16 px-6 md:px-14 lg:px-28 bg-gray-50">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4">
        What Our <span className="text-violet-600">Clients Say</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Feedback from our valued clients. We take pride in delivering excellent
        service every time.
      </p>

      {/* Swiper Section */}
      <div className="max-w-xl mx-auto">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="mySwiper"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          ref={swiperRef}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review._id || index}>
              <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center text-center">
                {/* Client Photo */}
                <img
                  src={
                    review.photo ||
                    `https://randomuser.me/api/portraits/men/${index + 10}.jpg`
                  }
                  alt={review.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-violet-600 shadow-md"
                />

                {/* Client Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {review.name || `Client ${index + 1}`}
                </h3>

                {/* Created At */}
                {review.createdAt && (
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDistanceToNow(new Date(review.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                )}

                {/* Rating Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: review.rating || 5 }).map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-400 mr-1" />
                  ))}
                  {Array.from({ length: 5 - (review.rating || 5) }).map(
                    (_, idx) => (
                      <FaStar key={idx} className="text-gray-300 mr-1" />
                    )
                  )}
                </div>

                {/* Feedback Text */}
                <p className="text-gray-600 text-sm">{review.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientReview;
