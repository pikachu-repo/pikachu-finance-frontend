import Footer from "components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Borrow from "pages/Borrow";
import Header from "components/Header";

function App() {
  return (
    <div className="bg-gray-1000">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
