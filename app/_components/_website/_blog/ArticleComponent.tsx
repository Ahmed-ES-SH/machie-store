/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShare,
  FaBookmark,
  FaComment,
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCamera,
  FaVideo,
  FaMobile,
} from "react-icons/fa";
import { MdCenterFocusWeak, MdSmartDisplay } from "react-icons/md";
import Img from "@/app/_components/_global/Img";
import { articles } from "@/constants/Articles";
import { ArticleType } from "@/app/_components/_website/_blog/ArticleCard";
import { useSearchParams } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

export default function ArticleComponent() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("articleId");

  const features = [
    {
      delay: 0.9,
      from: "blue-50",
      to: "indigo-50",
      border: "border-blue-200",
      icon: <MdSmartDisplay className="text-3xl text-blue-600 mr-3" />,
      title: "True 4K OLED Display",
      titleColor: "text-blue-800",
      textColor: "text-blue-700 max-md:text-[14px]",
      description:
        "Experience unprecedented visual clarity with Sony's 6.5-inch 4K OLED display, offering true-to-life colors and HDR support for professional content review.",
    },
    {
      delay: 1.1,
      from: "purple-50",
      to: "pink-50",
      border: "border-purple-200",
      icon: <FaVideo className="text-3xl text-purple-600 mr-3" />,
      title: "S-Cinetone Profiles",
      titleColor: "text-purple-800",
      textColor: "text-purple-700",
      description:
        "Capture cinematic footage with professional S-Cinetone color profiles, bringing Hollywood-grade color science to your mobile productions.",
    },
    {
      delay: 1.3,
      from: "green-50",
      to: "emerald-50",
      border: "border-green-200",
      icon: <MdCenterFocusWeak className="text-3xl text-green-600 mr-3" />,
      title: "Real-time Tracking AF",
      titleColor: "text-green-800",
      textColor: "text-green-700",
      description:
        "Never miss a shot with advanced real-time tracking autofocus that locks onto subjects with precision, perfect for dynamic content creation.",
    },
    {
      delay: 1.5,
      from: "orange-50",
      to: "red-50",
      border: "border-orange-200",
      icon: <FaCamera className="text-3xl text-orange-600 mr-3" />,
      title: "Pro Camera System",
      titleColor: "text-orange-800",
      textColor: "text-orange-700",
      description:
        "Triple-lens setup with advanced computational photography, manual controls, and RAW support for ultimate creative flexibility.",
    },
  ];

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [Article, setArticle] = useState<ArticleType>(articles[0]);
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    if (articleId) {
      const foundArticle = articles.find(
        (article) => article.id === Number(articleId)
      );
      if (foundArticle) {
        setArticle(foundArticle);
      }
    }
  }, [articleId]);

  const handleAddComment = () => {
    setLoading(true);

    setTimeout(() => {
      setComments((prev) => [...prev, comment]);
      setComment("");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen xl:flex-1/2 w-full bg-gradient-to-br from-slate-50 to-blue-50 py-8 xl:px-4 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 xl:p-8 p-6 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span className="bg-white/20 whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                Creator Tools
              </span>
              <div className="flex space-x-2">
                {Article.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/15 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <h1 className="xl:text-4xl text-2xl font-bold mb-4 leading-tight">
              {Article.title}
            </h1>

            <p className="xl:text-lg text-[14px] opacity-90 mb-6 leading-relaxed">
              {Article.description}
            </p>

            <div className="flex items-center flex-wrap gap-6 text-sm opacity-90">
              <div className="flex items-center  gap-2">
                <FaUser />
                <span className="whitespace-nowrap">Tech Reviewer</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt />
                <span className="whitespace-nowrap">{Article.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock />
                <span className="whitespace-nowrap">8 min read</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <Img
            src={Article.image}
            alt="Sony Xperia 1 V"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white lg:text-sm text-[12px]">
            {Article.title}
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-8 max-md:p-4">
          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg max-w-none mb-8"
          >
            <p className="text-gray-700 leading-relaxed mb-6 text-[14px] lg:text-lg">
              Sony's latest flagship, the Xperia 1 V, represents a significant
              leap forward in mobile technology specifically designed for
              content creators. With its stunning 4K OLED display and
              professional-grade camera capabilities, this device bridges the
              gap between smartphone convenience and professional creative
              tools.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {features.map((box, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: box.delay }}
                  className={`bg-gradient-to-br from-${box.from} to-${box.to} border ${box.border} p-6 rounded-xl`}
                >
                  <div className="flex items-center max-md:flex-col max-md:items-start max-md:gap-4 mb-4">
                    {box.icon}
                    <h3 className={`text-xl font-bold ${box.titleColor}`}>
                      {box.title}
                    </h3>
                  </div>
                  <p className={box.textColor}>{box.description}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              The Xperia 1 V's design philosophy centers around empowering
              creators with tools that were previously exclusive to professional
              equipment. The device features a dedicated shutter button for
              tactile control, advanced heat dissipation for extended recording
              sessions, and a robust build quality that can withstand the
              demands of professional use.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl my-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaMobile className="mr-3" />
                Creator-Focused Features
              </h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">•</span>
                  21:9 CinemaWide display for immersive content viewing and
                  editing
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">•</span>
                  120Hz refresh rate with variable refresh rate technology
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">•</span>
                  Professional video recording up to 4K 120fps
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">•</span>
                  Advanced image stabilization for smooth handheld footage
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 mt-1">•</span>
                  Content creator apps pre-installed and optimized
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              With the Xperia 1 V, Sony has created more than just a smartphone
              – it's a comprehensive creative platform that understands the
              unique needs of modern content creators. Whether you're shooting
              for social media, professional projects, or personal artistic
              expression, this device provides the tools and quality needed to
              bring your vision to life.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-between border-t border-b border-gray-200 py-6 mb-8"
          >
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <FaHeart className={isLiked ? "text-white" : ""} />
                <span className="font-medium">{likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                <FaShare />
                <span className="font-medium">Share</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  isBookmarked
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                }`}
              >
                <FaBookmark className={isBookmarked ? "text-white" : ""} />
                <span className="font-medium">Save</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + star * 0.1 }}
                >
                  <FaStar className="text-yellow-400 text-lg" />
                </motion.div>
              ))}
              <span className="ml-3 text-gray-600 font-medium">4.9</span>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
              <FaComment className="mr-3 text-blue-600" />
              Reader Comments
            </h3>

            {/* Existing Comments */}
            <div className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Alex Chen</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Amazing review! I've been using the Xperia 1 V for my YouTube
                  channel and the 4K display is absolutely game-changing. The
                  S-Cinetone profiles give such a professional look to my
                  videos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  As a professional photographer, I'm impressed by the real-time
                  tracking autofocus. It rivals some of my dedicated camera
                  equipment. Sony really nailed it with this one!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6 rounded-xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Mike Rodriguez</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The battery life during extended 4K recording sessions is
                  impressive. Finally, a phone that can keep up with my creative
                  workflow!
                </p>
              </motion.div>
            </div>

            {comments &&
              comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl my-4"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Test-user</p>
                      <p className="text-sm text-gray-500">now</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment}</p>
                </motion.div>
              ))}

            {/* Add Comment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg"
            >
              <h4 className="font-bold mb-4 text-xl text-gray-800 flex items-center">
                <FaComment className="mr-2 text-blue-600" />
                Join the Discussion
              </h4>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Share your thoughts about ${Article.title}...`}
                className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows={4}
              />
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  disabled={loading || !comment.trim()}
                  onClick={handleAddComment}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <VscLoading className="text-white size-6" />
                    </motion.div>
                  ) : (
                    <>
                      <FaComment />
                      <span>Post Comment</span>
                    </>
                  )}
                </motion.button>
                <span className="text-sm text-gray-500 font-medium">
                  {comment.length}/500 characters
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
