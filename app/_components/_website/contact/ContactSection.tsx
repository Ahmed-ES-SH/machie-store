"use client";
import React, { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import Img from "../../_global/Img";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const offices = [
    {
      country: "United States",
      title: "United States Office",
      address: "205 Middle Road, 2nd Floor, New York",
      phone: "+1 1234 567 88",
      email: "info@example.com",
      color: "blue",
    },
    {
      country: "United Kingdom",
      title: "United Kingdom Office",
      address: "79 Manor Way, 2nd Floor, Great Fransham",
      phone: "+49 1234 567 88",
      email: "contact@example.com",
      color: "green",
    },
    {
      country: "Germany",
      title: "Germany Office",
      address: "Holstenwall 86, Sachsen-Anhalt, Zschornewitz",
      phone: "+44 1234 567 88",
      email: "info@example.com",
      color: "purple",
    },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 mt-3 md:mt-8 xl:mt-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Offices and Description */}
          <div className="space-y-8">
            {/* Offices Grid */}
            <motion.div className="grid gap-6" variants={itemVariants}>
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  variants={itemVariants}
                >
                  <div className="space-y-4">
                    {/* Country Header */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          office.color === "blue"
                            ? "bg-blue-500"
                            : office.color === "green"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {office.country}
                      </h3>
                    </div>

                    {/* Office Title */}
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {office.title}
                    </h4>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FiMapPin
                          className="text-gray-500 mt-1 flex-shrink-0"
                          size={16}
                        />
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {office.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiPhone
                          className="text-gray-500 flex-shrink-0"
                          size={16}
                        />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                        >
                          {office.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiMail
                          className="text-gray-500 flex-shrink-0"
                          size={16}
                        />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description Text */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              variants={itemVariants}
            >
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Nam maximus nunc a augue pulvinar, non euismod mauris tempus.
                  Cras non elit vel magna molestie pellentesque in eu dui. Donec
                  laoreet quis erat vitae finibus.
                </p>
                <p>
                  Vestibulum enim eros, porta eget quam et, euismod dictum elit.
                </p>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Img
                src="/images/contact-img.webp"
                alt="Modern workspace with laptop, coffee, and plant"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 sticky top-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-3">
                <motion.h2
                  className="text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Get in Touch
                </motion.h2>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Quisque mattis tortor eu tristique sodales. Aenean sit amet
                  justo nec sem vestibulum.
                </motion.p>
              </div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your name *
                    </label>
                    <div className="relative">
                      <FiUser
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full outline-none pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your email *
                    </label>
                    <div className="relative">
                      <FiMail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full outline-none  pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full outline-none px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    placeholder="Enter subject"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your message
                  </label>
                  <div className="relative">
                    <FiMessageSquare
                      className="absolute left-3 top-4 text-gray-400"
                      size={18}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full outline-none pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
