"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { setCredentials } from "../store/slices/authSlice";
import AppLayout from "@/components/AppLayout";

export default function Providers({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(setCredentials({ token }));
    }
  }, []);

  return (
    <Provider store={store}>
      <AppLayout>
        {children}
      </AppLayout>
    </Provider>
  );
}
