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
      const res = await login(data).unwrap();
      localStorage.setItem("token", res.token);
      dispatch(setCredentials({ token: res.token }));
      router.push("/");
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "Login failed. Please try again.";
      alert(errorMessage);
    }
  };

  const handleSendOtp = async () => {
    if (!resetPhone || resetPhone.length < 10) {
      alert("Please enter a valid phone number (min 10 digits)");
      return;
    }
    
    setIsResetting(true);
    try {
      const response = await fetch('https://backend-ticket-assigning-tool.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: resetPhone })
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
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    
    setIsResetting(true);
    try {
      const response = await fetch('https://backend-ticket-assigning-tool.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: resetPhone, 
          otp: otp, 
          newPassword: newPassword 
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
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && <span className="error">{errors.phone.message}</span>}

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
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
            <p>Don't have an account? <span style={{color: '#fbbf24', cursor: 'pointer'}}>Sign up</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}
