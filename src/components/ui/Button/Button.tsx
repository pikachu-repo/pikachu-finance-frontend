import cn from "classnames";
import s from "./Button.module.css";

type ButtonVariant = "yellow" | "gray";
interface MyButtonProps {
  variant?: ButtonVariant;
  sx?: string;
}

const extractGradientFromVariant = (variant: ButtonVariant) => {
  return {
    yellow: "bg-tangerine-yellow text-[#0D0D0D]",
    gray: "bg-granite-gray",
  }[variant];
};

const Button: React.FC<
  MyButtonProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = (props) => {
  return (
    <button
      className={cn(
        props.sx || "",
        s.button,
        extractGradientFromVariant(props.variant || "gray")
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
