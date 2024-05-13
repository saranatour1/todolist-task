import Image from "next/image";
import confirmPinIcon from "../../../public/confirm-pin.svg"
import retryIcon from "../../../public/retry.svg"
import InputMask from "@/components/Form/InputMask";
import Button from "../Form/Button";
import Link from "next/link";

function ConfirmPin() {
  return (
    <main className="grid grid-cols-2 grid-rows-1 w-full h-full max-w-full min-h-screen items-center justify-start gap-x-4">
        <div className="flex flex-col gap-y-10 col-span-1 px-10 w-full ">
          <h1 className="text-black-1 text-[2.25rem] font-semibold leading-9 text-center">التحقق من الرمز
          </h1>
          <form className="">
          <InputMask email="w"/>

            <span className="flex items-center justify-center my-10 text-blue-0">
            اعادة الارسال
            <Image src={retryIcon} alt="retry icon" className="mr-0.5 self-center"/>
            </span> 

            <Button>
            متابعة
            </Button>
          </form>

          <span className=" text-black-0 text-[1.25rem] font-normal leading-[0.6875rem] text-center">
            هل تذكرت كلمة المرور؟ 
            <Link href={"/login"} className="text-blue-0 mr-1">
            تسجيل الدخول
            </Link>
          </span>
        </div>

        <div className="col-span-1 bg-blue-0 max-h-full h-full flex flex-col items-center justify-center gap-y-[5rem]">
          <Image src={confirmPinIcon} alt="confirm pin icon" />
          <hgroup className="text-center text-white-0 flex flex-col justify-center items-center w-full max-w-[26.15919rem] gap-y-6">
          <h1 className="text-[2.5rem] font-semibold leading-[3.75rem] self-stretch">
          التحقق من الرمز!
          </h1>
          <p className="text-[1.25rem] leading-[1.875rem] font-normal text-center w-full">
          لقد تم ارسال رمز على بريدك الالكتروني الرجاء كتابته في الحقول المخصصة لبدء استرجاع كلمة المرور 
          </p>
          </hgroup>
        </div>
    </main>
  );
}

export default ConfirmPin;