import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [uploading, setUploading] = useState(false);

  // TanStack mutation for registration
  const mutation = useMutation({
    mutationFn: async ({ email, password, name, photo }) => {
      // 1️⃣ Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Upload photo if exists
      let photoURL = null;
      if (photo && photo[0]) {
        setUploading(true);
        const storageRef = ref(
          storage,
          `users/${userCredential.user.uid}/${photo[0].name}`
        );
        await uploadBytes(storageRef, photo[0]);
        photoURL = await getDownloadURL(storageRef);
        setUploading(false);
      }

      // 3️⃣ Update profile with displayName and photoURL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      return userCredential.user;
    },
    onSuccess: (user) => {
      toast.success("Registration successful!");
      reset(); // Reset form after success
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success("Google login successful!");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white"
      >
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Your name"
                {...register("name", { required: "Name is required" })}
                className={`input input-bordered w-full pl-10 ${
                  errors.name ? "input-error" : ""
                }`}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`input input-bordered w-full pl-10 ${
                  errors.email ? "input-error" : ""
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`input input-bordered w-full pl-10 ${
                  errors.password ? "input-error" : ""
                }`}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Photo Upload */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Profile Photo (optional)</span>
            </label>
            <div className="relative flex items-center gap-2">
              <FaUpload className="text-gray-500" />
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            disabled={mutation.isLoading || uploading}
          >
            {mutation.isLoading || uploading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all duration-300"
        >
          <FaGoogle className="text-red-500" />
          Sign up with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Register;
