import Eye from "@/components/Icons/Eye";
import { useEffect, useState } from "react";

interface Props{
  name:string;
  label:string;
  type?: "password" | "text" | "number"|"email";
  placeHolder:string;
  value:string;
  onChange:(i:React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({label, type, placeHolder, onChange, value, name}:Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] =useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const regex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
    if (!value.length) {
      setError(true);
    } else if (name === "password" && value.length <= 8) {
      setError(true);
    } else if (name === "email" && !value.match(regex)) {
      setError(true);
    } else {
      setError(false); 
    }
  }, [value, name, setError]);
  
  return (
    <label className="flex flex-col justify-end items-end w-full gap-y-[0.88rem]">
      <span className={`text-black-0 text-[1rem] font-medium leading-5 tracking-[-0.00963rem] ${error && "text-red-0"}`}>{label}</span>
      <div className="w-full relative ">
      {type === "password" && <button type="button" className="absolute top-0 start-0 ps-[1.75rem] py-[0.44rem]" onClick={togglePasswordVisibility}><Eye /></button>} 
      <input type={showPassword ? "text" : type ?? "text"} placeholder={placeHolder} onChange={onChange} value={value} name={name} className={`w-full max-h-[3.375rem] py-[0.625rem] px-[0.75rem] flex gap-[0.625rem] self-stretch justify-end items-center text-right border border-blue-1 rounded-[0.375rem] shadow-sm placeholder:text-black-0/70 ${error && "border-red-0"}`}/>
      </div>
    </label>
  );
}

export default Input;