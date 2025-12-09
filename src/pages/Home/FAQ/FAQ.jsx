import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How do I book a service?",
    answer:
      "You can book a service by visiting our website, selecting the desired service, choosing a date and time, and completing the booking form.",
  },
  {
    question: "Are your professionals verified?",
    answer:
      "Yes! All our professionals are background-checked, trained, and experienced to ensure safety and quality service.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Absolutely. You can reschedule your appointment by contacting our support team or through your account dashboard before 24 hours of the scheduled time.",
  },
  {
    question: "Do you provide eco-friendly services?",
    answer:
      "Yes! We use safe, eco-friendly cleaning products, gardening tools, and other materials whenever possible.",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer:
      "Customer satisfaction is our top priority. If you are not satisfied, contact our support team and we will resolve the issue promptly.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className=" shadow-md rounded-xl mb-4 border border-gray-100"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <span className="text-violet-600">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <div className="py-16 px-6 md:px-14 lg:px-28 ">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
        Frequently Asked <span className="text-violet-600">Questions</span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Find answers to common questions about our services, booking process,
        and policies.
      </p>

      <div className="max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
