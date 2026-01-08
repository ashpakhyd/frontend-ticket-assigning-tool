"use client";

import "./login.css";
import { useLoginMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await login({ phone, password }).unwrap();
      localStorage.setItem("token", res.token);
      dispatch(setCredentials({ token: res.token }));
      router.push("/dashboard");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <main className="app-screen">
      <section className="login-card">
        <div className="profile-icon" />

        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue</p>

        <input
          type="tel"
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="actions">
          <label>
            <input type="checkbox" />
            Remember
          </label>
          <button className="text-btn">Forgot?</button>
        </div>

        <button
          className="primary-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Please wait…" : "Login"}
        </button>
      </section>
    </main>
  );
}
