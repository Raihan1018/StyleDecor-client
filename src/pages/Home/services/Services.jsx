import { TypeAnimation } from "react-type-animation";
import { Swiper } from "swiper/react"; // Assuming 'Swiper' is the correct component name for the default export.
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Cleaning from "./Cleaning";
import Electrical from "./Electrical";
import Plumbing from "./Plumbing";
import Painting from "./Painting";
import Assembly from "./Assembly";
import Gardening from "./Gardening";

const SERVICE_SEQUENCE = [
  // Text to display, followed by the pause time in milliseconds
  "We produce Cleaning Services for your home",
  1500, // Pause for 1.5 seconds
  "We produce Electrical Services",
  1500,
  "We produce Plumbing Services",
  1500,
  "We produce Painting Services",
  1500,
  "We develop Assembly Services",
  1500,
  "We develop Gardening Services",
  1500,
];

// Define content for the Swiper Slides
const SERVICE_SLIDES = [
  {
    title: "Cleaning Services",
    description: "Deep cleaning, dusting, and general home upkeep.",
    icon: "🧹",
  },
  {
    title: "Electrical Services",
    description: "Wiring, fixture installation, and power repairs.",
    icon: "⚡",
  },
  {
    title: "Plumbing Services",
    description: "Leak repair, pipe fitting, and drain cleaning.",
    icon: "💧",
  },
  {
    title: "Painting Services",
    description: "Interior and exterior painting, wallpaper removal.",
    icon: "🎨",
  },
  {
    title: "Assembly Services",
    description: "Furniture, equipment, and fixture assembly.",
    icon: "🛠️",
  },
  {
    title: "Gardening Services",
    description: "Lawn care, pruning, and landscape maintenance.",
    icon: "🌳",
  },
];

const tab = [
  "https://threedio-prod-var-cdn.icons8.com/og/preview_sets/previews/5qHQVtPIEFbBqqTW.webp",
];

const Services = () => {
  return (
    <div className="py-10 ">
      {/* Container for content with some padding and background */}

      <h3 className="text-center text-2xl md:text-3xl lg:text-4xl py-3 capitalize font-bold text-gray-800">
        At a glance our services
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 my-5">
        {/* --- Type Animation Section --- */}
        <div className="text-center mt-4 h-16 w-full md:w-1/2">
          <TypeAnimation
            sequence={SERVICE_SEQUENCE}
            speed={50}
            style={{
              fontSize: "2em",
              display: "inline-block",
              color: "#3b82f6",
            }} // Example color: blue-500
            className="font-mono font-semibold"
            repeat={Infinity}
          />
        </div>

        {/* --- Swiper Section --- */}
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          className="w-full max-w-sm"
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {/* 3. Mapped the service data to generate SwiperSlides */}
            {SERVICE_SLIDES.map((service, index) => (
              <SwiperSlide
                key={index}
                className="bg-blue-50 p-6 rounded-lg shadow-xl flex flex-col justify-center items-center text-center"
              >
                <span className="text-5xl mb-3">{service.icon}</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl py-3 capitalize font-bold text-gray-800">
        Choose our Services{" "}
      </h2>
      {/* Service details */}
      <div>
        <Tabs>
          <TabList className="mx-auto flex flex-wrap gap-4 justify-center my-8">
            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=V2mXDW29kocg&format=png&color=000000"
                alt="Cleaning Services"
                title="Cleaning Services"
              />
            </Tab>
            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=nx8bQ5LGq0IO&format=png&color=000000"
                alt="Electrical Services"
                title="Electrical Services"
              />
            </Tab>
            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=nAJdF6qUI2Ww&format=png&color=000000"
                alt="Plubming Services"
                title="Plumbing Services"
              />
            </Tab>
            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=Xwqu8cUREfko&format=png&color=000000"
                alt="Painting Services"
                title="Painting Services"
              />
            </Tab>

            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=6s1yiEqYf2tz&format=png&color=000000"
                alt="Assembly Services"
                title="Assembly Services"
              />
            </Tab>
            <Tab>
              <img
                className="w-11"
                src="https://img.icons8.com/?size=100&id=VdgNbHMiugD0&format=png&color=000000"
                alt="Gardening Services"
                title="Gardening Services"
              />
            </Tab>
          </TabList>

          <TabPanel>
            <Cleaning />
          </TabPanel>

          <TabPanel>
            <Electrical />
          </TabPanel>

          <TabPanel>
            <Plumbing />
          </TabPanel>

          <TabPanel>
            <Painting />
          </TabPanel>

          <TabPanel>
            <Assembly />
          </TabPanel>

          <TabPanel>
            <Gardening />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default Services;
