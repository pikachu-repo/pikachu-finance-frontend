import borrow_avatar from "assets/borrow_avatar.png";
import ether from "assets/ether.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
const Borrow = () => {
  return (
    <div className="py-20 px-28">
      <div className="bg-[#0D0D0D] rounded-xl p-4 flex flex-col gap-4 ">
        <div className="text-white">Borrow</div>
        <div className="text-white">
          Select the NFT you want to collaterize, loan to value is 40% in this
          pool
        </div>
        <div className="flex gap-8">
          <img src={borrow_avatar} alt="borrow_avatar" />
          <div>
            <div className="rounded-xl bg-[#554609] border-[#FFCC01] border p-2">
              <div className="flex gap-4 items-center">
                <img
                  src={borrow_avatar}
                  alt="borrow_avatar"
                  className="w-12 h-12"
                />
                <div>
                  <div className="text-white">RTFKT Clone #1285</div>
                  <div className="text-yellow-300">RTFKT</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-[#FFCC01] bg-opacity-30 rounded-full py-1 px-2">
                    <div className="text-[#FFCC01]">60.5</div>
                    <img src={ether} alt="ether" />
                  </div>
                </div>
                <div className="bg-[#887D52] rounded-full w-10 h-10 flex items-center justify-center text-white">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white">
                Floor Price: <span>60.5</span>
              </div>
              <img src={ether} alt="ether" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                Borrow Amount (Max 200 ETH): <span>24.5</span>
              </div>
              <img src={ether} alt="ether" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                Select your loan duration (Max 14 days):
              </div>
              <div className="flex gap-4">
                <div className="bg-[#FFFFFF4D] text-white w-8 h-8 items-center flex justify-center rounded-full">
                  <FiMinus />
                </div>
                <div className="bg-[#FFFFFF1D] text-white px-4 py-1 rounded-full">
                  7 days
                </div>
                <div className="bg-[#FFFFFF4D] text-white w-8 h-8 items-center flex justify-center rounded-full">
                  <FiPlus />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                Estimated interest: <span>4.5</span>
              </div>
              <img src={ether} alt="ether" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Borrow;
