import Footer from "components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Borrow from "pages/Borrow";
import Header from "components/Header";
import Demo from "pages/Demo";
import Pool from "pages/Pool";

function App() {
  return (
    <div className="bg-gray-1000">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pool/:owner/:poolId" element={<Pool />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
