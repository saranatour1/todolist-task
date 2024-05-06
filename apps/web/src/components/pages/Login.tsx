import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import somePattern from "../../../public/login.svg"
import Input from "../Form/Input";
import Button from "../Form/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";


function Login() {
  const router = useRouter()
  const [data, setData] =useState({email:"", password:""})
  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials",{
      redirect:false,
      ...data
    })
    if(response?.ok){
      router.push("/dashboard")
    }
  };

  return (
    <main className="flex justify-start w-full h-full max-w-full min-h-screen gap-x-[1px]">
      <section className="flex-[0.5] w-full min-h- flex-grow p-[0.62rem] bg-blue-0 flex flex-col justify-center items-center gap-y-[5rem]">
        <Image src={somePattern} alt="some pattern" />
          <hgroup className="text-center text-white-0 flex flex-col justify-center items-center w-full max-w-[26.15919rem]">
            <h1 className="text-[2.5rem] font-semibold leading-[3.75rem] self-stretch">مرحبا بك في موقع مهمتك</h1>
            <p className="text-[1.25rem] leading-[1.875rem] font-normal text-center w-full">مهمتك هو عبارة عن موقع الكتروني يساعدك في انجاز مهامك بسهولة</p>
          </hgroup>
      </section>
      <section className="flex-[0.5] w-full h-auto py-[0.625rem] px-10 flex flex-col items-center justify-center bg-white flex-grow">
      <form className="py-[6.82rem] flex flex-col w-full items-center justify-center gap-y-10" onSubmit={registerUser}>
            <h1 className=" text-black-1 text-[2.25rem] font-semibold leading-9 ">تسجيل الدخول</h1>
            <div className="flex flex-col w-full items-center justify-center gap-y-9 h-full">
            <Input name="email" placeHolder="example@gmail.com" label="البريد الالكتروني" type="email" value={data.email} onChange={(e)=>setData({...data, email:e.currentTarget.value})}/>
            <div className="w-full relative flex flex-col items-start justify-start gap-y-[1.5rem]">
            <Input name="password" placeHolder="@#*%" label="كلمة المرور" type="password" value={data.password} onChange={(e)=>setData({...data, password:e.currentTarget.value})}/>
            <Link href={"/forgot-password"} className="text-blue-0 text-[1rem] font-medium leading-[1.5rem]">نسيت كلمة المرور؟</Link>
            </div>
            </div>
            <Button type="submit" disabled={!data || !data.email.length || !data.password.length}>
            تسجيل الدخول
            </Button>

            <span className="flex justify-center items-center text-black-0 text-[1.25rem] font-normal leading-[0.6875rem] gap-x-1"> 
            <Link className="text-blue-0" href={"/signup"}> انشاء حساب</Link>ليس لديك حساب؟
            </span>
          </form>
      </section>
    </main>
  );
}

export default Login;