'use client'
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import FileInput from "@/components/Form/FileInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import signUpUndraw from "../../../public/signup.svg"

function SignUp() {
  const { data: session, status } = useSession()
  const router = useRouter();
  const [data, setData] = useState({
    email:"",
    password:"",
    username:"",
  })

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const userInfo = await response.json(); 
      console.log(userInfo);
        router.push('/login');
    } catch (e) {
      console.log("failed to sign up", e);
    }
  };

  return (
      <main className="flex justify-start w-full h-full max-w-full min-h-screen gap-x-[1px]">
        <section className="flex-[0.5] w-full h-auto py-[0.625rem] px-10 flex flex-col items-center justify-center bg-white flex-grow">
          <form className="py-[6.82rem] flex flex-col w-full items-center justify-center self-stretch h-full gap-y-10" onSubmit={registerUser}>
            <h1 className=" text-black-1 text-[2.25rem] font-semibold leading-9">انشاء حساب</h1>
            <div className="flex flex-col w-full items-center justify-center gap-y-9 h-full">
            <Input name="username" placeHolder="معاوية" label="اسم المستخدم" value={data.username} onChange={(e)=>setData({...data, username:e.currentTarget.value})}/>
            <Input name="email" placeHolder="example@gmail.com" label="البريد الالكتروني" type="email" value={data.email} onChange={(e)=>setData({...data, email:e.currentTarget.value})}/>
            <div className="relative w-full flex flex-col flex-end justify-end">
            <Input name="password" placeHolder="@#*%" label="كلمة المرور" type="password" value={data.password} onChange={(e)=>setData({...data, password:e.currentTarget.value})}/>
              <span className="text-right text-black-0/70 text-[0.875rem] mt-[0.62rem] font-normal tracking-[-0.00963rem] leading-5">يجب ان تتكون كلمة المرور على 8 رموز على الاقل</span>
              <span className="text-right text-black-0/70 text-[0.875rem] mt-[0.62rem] font-normal tracking-[-0.00963rem] leading-5">يجب ان تحتوي كلمة المرور على رموز وأرقام</span>
            </div>
            <FileInput />
            </div>
            <Button type="submit" disabled={!data || !data.email.length || !data.password.length || !data.username.length}>
            انشاء حساب
            </Button>
            <span className="flex justify-center items-center text-black-0 text-[1.25rem] font-normal leading-[0.6875rem] gap-x-1"> <Link className="text-blue-0" href={"/login"}>تسجيل الدخول </Link>هل لديك حساب بلفعل؟</span>
          </form>
        </section>
        <section className="flex-[0.5] w-full min-h- flex-grow p-[0.62rem] bg-blue-0 flex flex-col justify-center items-center">
          <div className="pt-[13.14rem] flex flex-col items-center justify-center gap-y-[5rem]">
            <Image src={signUpUndraw} alt="waving vector"/>
            <hgroup className="text-center text-white-0 flex flex-col justify-center items-center w-full max-w-[26.15919rem]">
            <h1 className="text-[2.5rem] font-semibold leading-[3.75rem] self-stretch">
            هيا لنبدء رحلتك سويا
            </h1>
            <p className="text-[1.25rem] leading-[1.875rem] font-normal text-center w-full">
            قم بانشاء حساب مجاني تماماً في موقع مهمتك, ودعنا نرتب مهامك سويا
            </p>
            </hgroup>
          </div>

        </section>
      </main>
  );
}

export default SignUp;