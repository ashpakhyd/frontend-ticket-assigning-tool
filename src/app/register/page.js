"use client";

import "../login/login.css";
import { useRegisterMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({ ...data, role: "ADMIN" }).unwrap();
      alert(res.message || "Registered. OTP sent.");
      router.push(`/verify-otp?phone=${data.phone}`);
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Registration failed";
      alert(errorMessage);
    }
  };

  return (
    <main className="app-screen">
      <div className="welcome-panel">
        <div className="welcome-logo">🎉</div>
        <div className="welcome-content">
          <h1>Join Us!</h1>
          <p>Create your account to get started with our service</p>
        </div>
      </div>
      
      <div className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <h2>Create Account</h2>
            <p>Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}

            <input
              type="tel"
              placeholder="Mobile number"
              {...register("phone", { 
                required: "Phone is required",
                minLength: { value: 10, message: "Phone must be 10 digits" },
                maxLength: { value: 10, message: "Phone must be 10 digits" },
                pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" }
              })}
              onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)}
            />
            {errors.phone && <span className="error">{errors.phone.message}</span>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁" : "👁"}
              </button>
            </div>
            {errors.password && <span className="error">{errors.password.message}</span>}

            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "SIGN UP"}
            </button>
          </form>

          <div className="login-footer">
            <p>Already have an account? <span style={{color: '#fbbf24', cursor: 'pointer'}} onClick={() => router.push("/login")}>Log in</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
