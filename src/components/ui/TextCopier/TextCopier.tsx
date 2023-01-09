import { SvgCopy } from "assets/images/svg";

const TextCopier = ({ text }: { text: string }) => {
  return (
    <SvgCopy
      className="cursor-pointer"
      onClick={() => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(text);
      }}
    />
  );
};

export default TextCopier;
