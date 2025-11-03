// src/Layouts/SiteLayout.jsx
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import GiftBoxDrawer from "../Components/GiftBoxDrawer";
import { BoxProvider } from "../Context/BoxContext";

export default function SiteLayout() {
  const { pathname } = useLocation();

  // Optional: scroll to top on route change (nice for multi-page feel)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <BoxProvider>
      <div className="min-h-screen flex flex-col">
        {/* Global navbar */}
        <Navbar />

        {/* Routed page content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Global footer */}
        <Footer />

        {/* ⬅️ Cart drawer stays globally available */}
        <GiftBoxDrawer />
      </div>
    </BoxProvider>
  );
}
