"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Service Management App</h1>
      <p>Frontend is working 🎉</p>
    </main>
  );
}
  