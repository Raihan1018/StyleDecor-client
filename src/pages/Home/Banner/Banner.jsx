import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1740657254989-42fe9c3b8cce?q=80&w=1312&auto=format&fit=crop",
    title: "Professional Plumbing Services",
    subtitle: "Fast, reliable, and affordable solutions for your home.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1678766819262-cdc490bfd0d1?q=80&w=1171&auto=format&fit=crop",
    title: "Expert Electrical Repair",
    subtitle: "Certified technicians for safe and efficient service.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661963478928-2d2d3e9b1e25?q=80&w=1170&auto=format&fit=crop",
    title: "Premium Painting Services",
    subtitle: "Give your home a fresh and beautiful new look.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1661313691854-343d607bbace?q=80&w=1170&auto=format&fit=crop",
    title: "Home Cleaning Service",
    subtitle: "Deep cleaning with a 100% satisfaction guarantee.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1681492027437-35ae6d190149?q=80&w=1170&auto=format&fit=crop",
    title: "Furniture Assembly",
    subtitle: "Quick and perfect assembly for all furniture types.",
  },
  {
    img: "https://images.unsplash.com/photo-1758524055610-24248eefebb6?q=80&w=1332&auto=format&fit=crop",
    title: "Garden & Lawn Care",
    subtitle: "Keep your outdoor space fresh and beautiful.",
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[80vh] lg:h-[90vh] rounded-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.img}
                alt="service"
                className="w-full h-full object-cover"
              />

              {/* Dark / Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-20 text-white">
                <h1
                  className="text-3xl lg:text-6xl font-bold mb-4 animate-fadeInUp"
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h1>

                <p
                  className="text-lg lg:text-2xl max-w-2xl mb-6 opacity-90 animate-fadeInUp"
                  style={{ animationDelay: "0.4s" }}
                >
                  {slide.subtitle}
                </p>

                <Link to={'all-services'}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold w-fit shadow-lg animate-fadeInUp"
                  style={{ animationDelay: "0.6s" }}
                >
                  Book Service
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
