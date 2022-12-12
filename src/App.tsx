import React from "react";
import Footer from "components/Footer";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "pages/Home";
import Borrow from "pages/Borrow";
function App() {
  return (
    <div className="bg-gray-1000">
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </div>
  );
}
export default App;
