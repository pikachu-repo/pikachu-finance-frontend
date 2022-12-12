import LinkWithSearchParams from "components/LinkWithSearchParams";
import logo from "assets/Pikachu.fi.png";
const Footer = () => {
  return (
    <div className="font-Chakra text-white flex justify-between items-center px-20 border-b border-[#8C8C8C]">
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
        <img src={logo} alt="logo" />
      </LinkWithSearchParams>
      <div className="flex items-center gap-8">
        <div>
          <div className="bg-gray-500 rounded-full flex justify-center items-center py-2 px-4">
            <div>Connect Wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
