'use client'
import { useState } from "react";
import forgotPasswordIcon from "../../../public/forgot-password.svg";
import Input from "@/components/Form/Input";
import Button from "../Form/Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [data, setData] = useState({email:""})
  
  const onSubmit =()=>{
    
  }
  return (
    <main className="grid grid-cols-2 grid-rows-1 w-full h-full max-w-full min-h-screen items-center justify-start gap-x-4">
        <div className="flex flex-col gap-y-10 col-span-1 mx-10">
          <h1 className="text-black-1 text-[2.25rem] font-semibold leading-9 text-center">
            اعادة تعيين كلمة المرور</h1>
          <form className="flex flex-col gap-y-10">
          <Input
              name="email"
              placeHolder="example@gmail.com"
              label="البريد الالكتروني"
              type="email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.currentTarget.value })
              }
            />
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
          <Image src={forgotPasswordIcon} alt="forgot password icon" className="w-full h-full max-h-[20.74131rem]  max-w-[37.5rem]"/>
          <hgroup className="text-center text-white-0 flex flex-col justify-center items-center w-full max-w-[27rem] gap-y-6">
          <h2 className="text-[2.5rem] font-semibold leading-[3.75rem] self-stretch">
          هل نسيت كلمة المرور؟
          </h2>
          <p className="text-[1.25rem] leading-[1.875rem] font-normal text-center w-full">
          لاتقلق هذا يحدث احيانا, الرجاء ادخال بريدك الالكتروني في الحقل المخصص وعند تاكيده سيتم ارسال رمز اعادة تعيين كلمة المرور على بريدك الاكتروني
          </p>
          </hgroup>
        </div>
    </main>
  );
}

export default ForgotPassword;