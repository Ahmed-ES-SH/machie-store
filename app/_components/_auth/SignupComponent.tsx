/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { OAuthStrategy } from "@clerk/types";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import Img from "@/app/_components/_global/Img";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import VerifyCode from "./VerifyCode";

type FormFields = "email" | "password" | "name";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
}

export default function SignUpComponent() {
  const { user } = useUser();
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const { signIn } = useSignIn();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  // This not Necessary because middleware File but Just in case
  useEffect(() => {
    if (user) {
      router.push(`/`);
    }
  }, [user, router]);

  const validateForm = (): boolean => {
    const newErrors: {
      name: string;
      email: string;
      password: string;
    } = {
      name: "",
      email: "",
      password: "",
    };

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((msg) => msg !== "");
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.success(
        "The account has been created successfully. Please check your email to activate the account and log in at any time."
      );
      setPendingVerification(true);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!signIn) return;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: `/`,
        redirectUrlComplete: "/",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  const handleInputChange = (field: FormFields, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const CloseVerify = () => {
    setPendingVerification(false);
  };

  if (user) return null;

  return (
    <div className="min-h-screen c-container mt-2  flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      {!pendingVerification ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-md p-8 w-full lg:w-[80%] xl:w-1/2 relative z-10 border border-gray-200"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <Img
              src="/logo.png"
              className="w-60 my-3  mx-auto object-contain"
            />
          </motion.div>
          <div className="text-center my-3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">Sign up by your account</p>
          </div>
          {/* Social Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 mb-6"
          >
            <button
              onClick={() => signInWith("oauth_google")}
              className=" hover:scale-[103%] w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-3 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3  ">
                <Img src="/google.png" className="w-5 h-5 object-contain" />
                <span className="w-[180px]">Continue with Google</span>
              </div>
            </button>
            <button
              onClick={() => signInWith("oauth_facebook")}
              className=" hover:scale-[103%] w-full bg-[#1877F2] text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-3 hover:bg-[#166FE5] transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-center gap-3">
                <FaFacebook className="w-5 h-5 text-white" />
                <span className="w-[180px]">Continue with Facebook</span>
              </div>
            </button>
          </motion.div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                or Sign up with new account
              </span>
            </div>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* clerk-captcha */}
            <div className="hidden" id="clerk-captcha" />
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FiX className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <FiX className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-blue text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-600  hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <span>Sign up</span>
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href={"/signin"}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <VerifyCode onClose={CloseVerify} />
      )}
    </div>
  );
}
