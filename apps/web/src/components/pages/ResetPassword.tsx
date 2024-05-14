
'use client'
import Image from 'next/image';
import resetPasswordIcon from '../../../public/reset-password.svg'
import Input from '../Form/Input';
import Button from '../Form/Button';
import Link from 'next/link';
import { useState } from 'react';
function ResetPassword() {
  const [data, setData] =useState({password:""})
  return (
    <main className="grid grid-cols-2 grid-rows-1 w-full h-full max-w-full min-h-screen items-center justify-start gap-x-4">
        <div className="col-span-1 bg-blue-0 max-h-full h-full flex flex-col items-center justify-center gap-y-[5rem]">
        <Image src={resetPasswordIcon} alt="some pattern" />
        <hgroup className="text-center text-white-0 flex flex-col justify-center items-center w-full max-w-[26.15919rem]">
          <h1 className="text-[2.5rem] font-semibold leading-[3.75rem] self-stretch">
          انت تبلي حسناً
          </h1>
          <p className="text-[1.25rem] leading-[1.875rem] font-normal text-center w-full">
          يمكنك الان اعادة تعيين كلمة المرور واداخال كلمة مرور جديدة والبدء في انجاز مهماتك...
          </p>
        </hgroup>       
        </div>
        
        <div className="flex flex-col gap-y-10 col-span-1 px-10 w-full ">
        <h1 className="text-black-1 text-[2.25rem] font-semibold leading-9 text-center">التحقق من الرمز
          </h1>
          <form className="grid grid-flow-row gap-y-10">
          <div className="relative w-full flex flex-col flex-end justify-end">
              <Input
                name="password"
                placeHolder="@#*%"
                label="كلمة المرور"
                type="password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.currentTarget.value })
                }
              />
              <span className="text-right text-black-0/70 text-[0.875rem] mt-[0.62rem] font-normal tracking-[-0.00963rem] leading-5">
                يجب ان تتكون كلمة المرور على 8 رموز على الاقل
              </span>
              <span className="text-right text-black-0/70 text-[0.875rem] mt-[0.62rem] font-normal tracking-[-0.00963rem] leading-5">
                يجب ان تحتوي كلمة المرور على رموز وأرقام
              </span>
            </div>
            <Button>
            اعادة تعيين كلمة المرور
            </Button>
          </form>

          <span className=" text-black-0 text-[1.25rem] font-normal leading-[0.6875rem] text-center">
            هل تذكرت كلمة المرور؟ 
            <Link href={"/login"} className="text-blue-0 mr-1">
            تسجيل الدخول
            </Link>
          </span>
        </div>

    </main>
  );
}

export default ResetPassword;