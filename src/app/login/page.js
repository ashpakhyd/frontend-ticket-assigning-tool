"use client";

import "./login.css";
import { useLoginMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [resetPhone, setResetPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const loginData = { ...data, appType: "admin" };
      const res = await login(loginData).unwrap();
      localStorage.setItem("token", res.token);
      dispatch(setCredentials({ token: res.token }));
      router.push("/");
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  };

  const handleSendOtp = async () => {
    if (!resetPhone) {
      alert("Phone number is required");
      return;
    }
    if (resetPhone.length < 10) {
      alert("Phone must be at least 10 digits");
      return;
    }
    if (!/^[0-9]+$/.test(resetPhone)) {
      alert("Only numbers allowed");
      return;
    }
    
    setIsResetting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: resetPhone, appType: "admin" })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "OTP sent successfully");
        setShowOtpScreen(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp) {
      alert("OTP is required");
      return;
    }
    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }
    if (!/^[0-9]+$/.test(otp)) {
      alert("OTP must contain only numbers");
      return;
    }
    if (!newPassword) {
      alert("New password is required");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    
    setIsResetting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: resetPhone, 
          otp: otp, 
          newPassword: newPassword,
          appType: "admin"
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Password reset successful");
        // Reset all states and go back to login
        setShowForgotPassword(false);
        setShowOtpScreen(false);
        setResetPhone("");
        setOtp("");
        setNewPassword("");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  // OTP Screen
  if (showForgotPassword && showOtpScreen) {
    return (
      <main className="app-screen">
        <div className="welcome-panel">
          <div className="welcome-logo">🔐</div>
          <div className="welcome-content">
            <h1>Enter OTP</h1>
            <p>Enter the 6-digit code sent to {resetPhone}</p>
          </div>
        </div>
        
        <div className="login-panel">
          <div className="login-card">
            <div className="login-header">
              <h2>Verify OTP</h2>
              <p>Enter verification code</p>
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
            />

            <input
              type="password"
              placeholder="New Password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={handleResetPassword}
              disabled={isResetting}
            >
              {isResetting ? "Resetting..." : "Reset Password"}
            </button>

            <button
              className="text-btn back-btn"
              onClick={() => setShowOtpScreen(false)}
            >
              ← Back to Phone
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Forgot Password Screen
  if (showForgotPassword) {
    return (
      <main className="app-screen">
        <div className="welcome-panel">
          <div className="welcome-logo">🔒</div>
          <div className="welcome-content">
            <h1>Reset Password</h1>
            <p>Enter your phone number to receive OTP</p>
          </div>
        </div>
        
        <div className="login-panel">
          <div className="login-card">
            <div className="login-header">
              <h2>Forgot Password?</h2>
              <p>Enter your phone number</p>
            </div>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={resetPhone}
              onChange={(e) => setResetPhone(e.target.value.replace(/\D/g, ''))}
            />

            <button
              className="primary-btn"
              onClick={handleSendOtp}
              disabled={isResetting}
            >
              {isResetting ? "Sending..." : "Send OTP"}
            </button>

            <button
              className="text-btn back-btn"
              onClick={() => setShowForgotPassword(false)}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Main Login Screen
  return (
    <main className="app-screen">
      <div className="welcome-panel">
        <div className="welcome-logo">🏢</div>
        <div className="welcome-content">
          <h1>Welcome Back!</h1>
          <p>To stay connected with us please login with your personal info</p>
        </div>
      </div>
      
      <div className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
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

            <div className="actions">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <button 
                type="button"
                className="text-btn"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "LOG IN"}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <span style={{color: '#fbbf24', cursor: 'pointer'}} onClick={() => router.push("/register")}>Sign up</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
