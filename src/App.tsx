import { useEffect } from "react";
import Footer from "components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Header from "components/Header";
import Demo from "pages/Demo";
import Pool from "pages/Pool";
import Pools from "pages/Pools";
import Borrow from "pages/Borrow";
import { useAccount } from "wagmi";
import { useAccountStore } from "store";
import { toString } from "utils/helpers/string.helpers";

function App() {
  const account = useAccount();

  const { initializeAccount } = useAccountStore();

  useEffect(() => {
    initializeAccount(toString(account.address).toLowerCase());
  }, [account.address, initializeAccount]);
  return (
    <div className="bg-gray-1000">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/borrow" element={<Pools />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pool/:owner/:poolId" element={<Pool />} />
          <Route path="/pool/:owner/:poolId/borrow" element={<Borrow />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
