import { InputHTMLAttributes } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface ITextBox extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}
export default function TextBox(props: ITextBox) {
  const { label } = props;
  return (
    <div className=" flex flex-col">
     {label && <label className=" text-gray-600 text-base capitalize tracking-wider mb-2" htmlFor={label}>{label}</label>}
      <input
        id={label}
        {...props}
        className=" px-4 py-2 border border-gray-600 rounded-md"
      />
      {props.error && <ErrorMessage message={props.error} />}
    </div>
  );
}
