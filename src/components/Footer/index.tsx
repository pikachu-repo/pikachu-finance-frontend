import { NavLink } from "react-router-dom";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import logo from "assets/Pikachu.fi.png";
const Header = () => {
  const pageLinks = [
    {
      text: "Borrow",
      link: "/borrow",
    },
    {
      text: "Lend",
      link: "/lend",
    },
    {
      text: "Collections",
      link: "/collections",
    },
    {
      text: "My loans",
      link: "/myloan",
    },
    {
      text: "Swap",
      link: "/swap",
    },
    {
      text: "Docs",
      link: "https://pikachu.gitbook.io",
      external: true,
    },
  ];
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
        <div className="flex items-center">
          {pageLinks.map((item, index) => (
            <NavLink
              key={index}
              to={{
                pathname: item.link,
              }}
              className="font-black"
            >
              {item.text}
            </NavLink>
          ))}
        </div>
        <div>
          <div className="bg-gray-500 rounded-full flex justify-center items-center py-2 px-4">
            <div>Connect Wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
