"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTruck,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaLinkedin,
  FaWhatsapp,
  FaCheck,
} from "react-icons/fa";
import { MdCompare, MdFeaturedPlayList } from "react-icons/md";
import Img from "@/app/_components/_global/Img";
import Breadcrumb from "@/app/_components/_global/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/app/types/productType";
import { useFetchData } from "@/app/hooks/useFetchData";
import Loading from "@/app/_components/_global/Loading";
import { BiStar } from "react-icons/bi";
import { RiProductHuntLine } from "react-icons/ri";
import ErrorMessage from "@/app/_components/_global/ErrorMessage";
import SliderOfRecommendedProducts from "./SliderOfRecommendedProducts";
import { useCartStore } from "@/app/store/CartStore";
import { useWishlistStore } from "@/app/store/WishlistStoreStore";

export default function ProductPage() {
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } =
    useCartStore();
  const { addToWishlist, wishlistItems } = useWishlistStore();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: product, loading } = useFetchData<ProductType>(
    `/products/${productId}`
  );
  const productQuantity = useMemo(() => {
    return cartItems.find((item) => item.id === product?.id)?.quantity || 1;
  }, [cartItems, product?.id]);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState(false);

  const keyFeatures = [
    "Slim body with metal cover",
    "Latest Intel Core i5-1135G7 processor (4 cores / 8 threads)",
    "8GB DDR4 RAM and fast 512GB PCIe SSD",
    "NVIDIA GeForce MX350 2GB GDDR5 graphics card",
    "Backlit keyboard, touchpad with gesture support",
  ];

  const specs = [
    { label: "Screen Size", value: "10.9 in" },
    { label: "Operating System", value: "Apple iOS" },
    { label: "Brand", value: `${product?.brand}` },
  ];

  const handleQuantityChange = useCallback(
    (action: string, product: ProductType) => {
      if (action === "increase") {
        increaseQuantity(product);
      } else if (action === "decrease" && productQuantity > 1) {
        decreaseQuantity(product?.id);
      }
    },
    [increaseQuantity, decreaseQuantity, productQuantity]
  );

  // Render stars
  const renderStars = () => {
    if (!product) return;
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <BiStar
            key={i}
            size={12}
            className="fill-yellow-400 text-yellow-400 size-6"
          />
        ))}
        {hasHalfStar && (
          <BiStar
            size={12}
            className="fill-yellow-400 text-yellow-400 size-6"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <BiStar key={i} size={12} className="text-gray-300" />
        ))}
        <span className="text-gray-500 text-xs mr-1">
          ({product.reviews?.length || 0})
        </span>
      </div>
    );
  };

  function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  // Calculate discounted price
  const discountedPrice =
    product && product.price * (1 - product.discountPercentage / 100);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    } else {
      setError(true);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (product) {
      const isInWishlist = wishlistItems.find((item) => item.id == product.id);
      if (isInWishlist) {
        setIsWishlisted(true);
      }
    }
  }, [product, wishlistItems]);

  const handleAddToWishList = (product: ProductType) => {
    const isInWishlist = wishlistItems.find((item) => item.id == product.id);
    if (!isInWishlist) {
      addToWishlist(product);
      setIsWishlisted(true);
    }
  };

  if (loading) return <Loading />;

  if (!product)
    return (
      <ErrorMessage
        isOpen={error}
        onClose={() => setError(false)}
        Message="This Product Not Available Or Something is Wrong"
      />
    );

  return (
    <>
      <div className="min-h-screen c-container bg-gray-50 my-4">
        {/* Breadcrumb */}
        <Breadcrumb />

        <div className="w-full mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Discount Badge */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10"
                >
                  -{product.discountPercentage}%
                </motion.div>

                {/* Main Image */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-[70%]"
                    >
                      <Img
                        src={
                          selectedImage && selectedImage.trim() !== ""
                            ? selectedImage
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={`product-img`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-3 ">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 w-20 h-20 bg-white rounded-lg p-2 border border-gray-200 hover:scale-110 duration-300 transition-all`}
                  >
                    <Img
                      src={
                        image && image.trim() !== ""
                          ? image
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={`iPad ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Product Title & Model */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600">
                  Model: <span className="font-medium">MYFL2LLA</span> | SKU:{" "}
                  <span className="font-medium">{product?.sku}</span>
                </p>
              </div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2"
              >
                {renderStars()}
                <h5 className="text-gray-600">
                  {product.reviews.length}{" "}
                  <span className="font-light">Review</span>
                </h5>
              </motion.div>

              {/* Stock Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  {product.availabilityStatus} ({product?.stock})
                </span>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-red-600">
                    ${product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${discountedPrice?.toFixed(2)}
                  </span>
                </div>
              </motion.div>

              {/* Quantity & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange("decrease", product)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <FaMinus className="text-gray-600" />
                    </motion.button>
                    <span className="px-4 py-3 font-medium text-lg">
                      {productQuantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange("increase", product)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <FaPlus className="text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={() => addToCart(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FaShoppingCart />
                    <span>Add to cart</span>
                  </motion.button>
                </div>

                {/* Wishlist & Compare */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToWishList(product)}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                      isWishlisted
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"
                    }`}
                  >
                    <FaHeart className={isWishlisted ? "fill-current" : ""} />
                    <span>Add to wishlist</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <MdCompare />
                    <span>Compare</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <FaTruck className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-semibold text-blue-800">
                      2-day Delivery
                    </p>
                    <p className="text-sm text-blue-600">
                      Speedy and reliable parcel delivery!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Popular Alert */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <p className="text-yellow-800">
                    <span className="font-semibold">
                      Other people want this.
                    </span>{" "}
                    5 people have this in their carts right now.
                  </p>
                </div>
              </motion.div>

              {/* Categories & Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-gray-600">Categories: </span>
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {tag}
                      <span
                        className={`text-gray-600 ${
                          product.tags.length - 1 == index ? "hidden" : ""
                        }`}
                      >
                        ,{" "}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-gray-600 font-medium">Share:</span>
                  <div className="flex space-x-2">
                    {[
                      { icon: FaFacebook, color: "bg-blue-600" },
                      { icon: FaTwitter, color: "bg-blue-400" },
                      { icon: FaPinterest, color: "bg-red-600" },
                      { icon: FaLinkedin, color: "bg-blue-700" },
                      { icon: FaWhatsapp, color: "bg-green-500" },
                    ].map((social, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 ${social.color} text-white rounded-full flex items-center justify-center text-sm hover:shadow-lg transition-all`}
                      >
                        <social.icon />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Specs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <MdFeaturedPlayList className="mr-2 text-blue-600" />
                  Quick Specifications
                </h3>
                <div className="space-y-2">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium text-gray-800">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: "description", label: "Description" },
                  { id: "specification", label: "Specification" },
                  {
                    id: "reviews",
                    label: `Reviews (${product.reviews.length})`,
                  },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose max-w-none"
                >
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <RiProductHuntLine className="mr-2 text-gray-600" />
                    Key Features:
                  </h3>

                  <ul className="space-y-3">
                    {keyFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "specification" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">
                      General
                    </h3>
                    <div className="space-y-3">
                      {specs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-gray-600">{spec.label}</span>
                          <span className="font-medium text-gray-800">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">
                      Technical Specs
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Processor</span>
                        <span className="font-medium text-gray-800">
                          A14 Bionic
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Storage</span>
                        <span className="font-medium text-gray-800">64GB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Connectivity</span>
                        <span className="font-medium text-gray-800">
                          Wi-Fi + Cellular
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start gap-6"
                >
                  {product.reviews.map((review) => (
                    <div
                      key={review.data}
                      className="bg-white rounded-lg border border-gray-200 p-6 w-full"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.reviewerName}
                          </h4>
                          <p className="text-[11px] mb-1">
                            {review.reviewerEmail}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {Array.from({ length: review.rating }).map(
                                (_, index) => (
                                  <FaStar
                                    key={index}
                                    className="text-yellow-400 text-sm"
                                  />
                                )
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDateTime(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        <SliderOfRecommendedProducts />
      </div>
    </>
  );
}
