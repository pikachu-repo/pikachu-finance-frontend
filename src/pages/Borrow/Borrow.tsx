import style from "./Borrow.module.css";
import cn from "classnames";
import { SvgRefresh } from "assets/images/svg";
// import Example from "assets/"
const Borrow = () => {
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.mainBox)}>
        <div className={cn(style.borrowHead)}>
          <div className={cn(style.content)}>
            <div className={cn(style.title)}>Borrow</div>
            <div>
              Select the NFT you want to collaterize, loan to value is 40% in
              this pool.
            </div>
          </div>
          <div className={cn(style.refreshIcon)}>
            <SvgRefresh className="w-5 h-5" />
            <div>Refresh</div>
          </div>
        </div>
        <div className={cn(style.borrowBox)}>
          {/* <img src="" alt="" srcset="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Borrow;
