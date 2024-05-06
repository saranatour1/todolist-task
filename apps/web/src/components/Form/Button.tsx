interface Props{
  children:React.ReactNode;
  type?:"submit"|"button"| "reset";
  onClick?:() =>void;
  disabled?:boolean;
}
function Button({children,type,onClick, disabled}:Props) {
  return (
    <button disabled={disabled} onClick={onClick} type={type ?? "button"} className={`w-full px-6 bg-blue-0 flex justify-center items-center  py-4 text-white-0 leading-[1.75rem] font-semibold text-[1.25rem] rounded-[0.375rem] shadow-inner-shadow ${disabled && "bg-blue-0/10"}`}>
      {children}
    </button>
  );
}

export default Button;