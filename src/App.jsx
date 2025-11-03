import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./Layouts/SiteLayout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import Contact from "./Pages/Contact";
import Loader from "./Components/Loader";

/**
 * Shows the Loader once per session (first visit),
 * then renders the routed app.
 */
export default function App() {
  const [showIntro, setShowIntro] = React.useState(() => {
    const seen = sessionStorage.getItem("axceria:introSeen");
    return !seen;
  });

  const handleIntroDone = React.useCallback(() => {
    sessionStorage.setItem("axceria:introSeen", "1");
    setShowIntro(false);
  }, []);

  if (showIntro) return <Loader onDone={handleIntroDone} />;

  return (
    <Routes>
      {/* 👇 Give the parent an explicit path */}
      <Route path="/" element={<SiteLayout />}>
        {/* index = "/" */}
        <Route index element={<Home />} />
        {/* children are RELATIVE (no leading slash) */}
        <Route path="products" element={<Products />} />
        {/* nested blog */}
        <Route path="blog">
          <Route index element={<Blog />} />
          <Route path=":slug" element={<BlogPost />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        {/* optional catch-all */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
