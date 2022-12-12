import { NavLink } from "react-router-dom";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import logo from "assets/images/svg-logo-text.svg";
import { SvgNotification } from "assets/images/svg";
import ConnectButton from "./ConnectButton";

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
      link: "/demo",
      external: true,
    },
  ];
  return (
    <div className="flex items-center pl-[60px] pr-8 border-b border-b-[#F5F5F580]">
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
        <img src={logo} alt="logo" className="py-6" />
      </LinkWithSearchParams>
      <div className="flex items-center ml-auto">
        {pageLinks.map((item, index) => (
          <NavLink
            key={index}
            to={{
              pathname: item.link,
            }}
            className="font-bold text-xl flex-1 px-4 py-8 hover:bg-tangerine-yellow/50 min-w-fit"
          >
            {item.text}
          </NavLink>
        ))}
      </div>
      <SvgNotification className="mx-5" />
      <ConnectButton />
    </div>
  );
};

export default Header;
