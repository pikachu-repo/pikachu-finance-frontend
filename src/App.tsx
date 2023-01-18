import { useEffect } from "react";
import Footer from "components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Header from "components/Header";
import Demo from "pages/Demo";
import Pool from "pages/Pool";
import Pools from "pages/Pools";
import Borrow from "pages/Borrow";
import { useSigner, useAccount } from "wagmi";
import { useAccountStore, useSettingStore } from "store";
import { toFloat, toString } from "utils/helpers/string.helpers";
import { ethers } from "ethers";
import Setting from "pages/Setting";
import { useAdminSetting } from "utils/hooks/pikachu/useAdminSetting";
import { TxConfirmModal } from "components/Common";
import TxRejectModal from "components/Common/TxRejectModal";
import TxSubmitModal from "components/Common/TxSubmitModal";
import Lend from "pages/Lend";
import Loan from "pages/Loan";
import { useLoansByBorrower } from "utils/hooks/pikachu/usePools";

function App() {
  const account = useAccount();
  const signer = useSigner();

  const { initializeAccount } = useAccountStore();
  const { initializeSetting, refreshedAt } = useSettingStore();

  const adminSetting = useAdminSetting();
  const myLoans = useLoansByBorrower(account?.address || "");

  useEffect(() => {
    initializeSetting(adminSetting);
  }, [adminSetting, initializeSetting]);

  useEffect(() => {
    signer.data?.getBalance().then((balance) => {
      initializeAccount(
        toFloat(ethers.utils.formatEther(balance)),
        toString(account.address).toLowerCase(),
        myLoans
      );
    });
  }, [signer.data, account.address, initializeAccount, refreshedAt, myLoans]);
  return (
    <div className="bg-gray-1000">
      <>
        <TxConfirmModal />
        <TxRejectModal />
        <TxSubmitModal />
      </>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting/*" element={<Setting />} />
          <Route path="/borrow" element={<Pools />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/loan/*" element={<Loan />} />
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
