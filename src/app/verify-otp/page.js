"use client";

import { Suspense } from "react";
import "../login/login.css";
import { useVerifyOtpMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function VerifyOtpContent() {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ phone, otp, appType: "admin" }).unwrap();
      localStorage.setItem("token", res.token);
      dispatch(setCredentials({ token: res.token }));
      alert("Account verified successfully!");
      router.push("/");
    } catch (error) {
      const errorMessage = error?.data?.message || error?.message || "OTP verification failed";
      alert(errorMessage);
    }
  };

  return (
    <main className="app-screen">
      <div className="welcome-panel">
        <div className="welcome-logo">🔐</div>
        <div className="welcome-content">
          <h1>Verify OTP</h1>
          <p>Enter the 6-digit code sent to {phone}</p>
        </div>
      </div>
      
      <div className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <h2>Enter OTP</h2>
            <p>Verification code</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
            />

            <button
              type="submit"
              className="primary-btn"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>

          <div className="login-footer">
            <p>Didn't receive code? <span style={{color: '#fbbf24', cursor: 'pointer'}}>Resend OTP</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
