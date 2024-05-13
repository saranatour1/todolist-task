'use client'
import { useEffect, useState } from 'react';
import { PinInput } from 'react-input-pin-code'
interface Props{
  email?:string;
  value?:string;
  label?:string;
  callBack?:(i:string) => void;
}

function InputMask({email,value,label , callBack}:Props) {
  const [values, setValues] = useState<string[]>(Array.from({length:6}).fill("") as string[]);
  return (
    <label className='grid grid-flow-row w-full gap-y-[0.88rem]'>
      <span className=' text-right flex flex-row-reverse text-gray-3 tracking-[-0.00963rem] leading-6'>
        قم بادخال الرمز المرسلة الى بريدك الالكتروني 
        <span className='font-bold mr-1 text-black-0'>{email}</span>
         </span>
      <PinInput
      values={values}
      onChange={(value, index, values) => setValues(values)}
      placeholder=''
      inputClassName='py-[0.625rem] px-[0.75rem] h-[3.375rem] w-[3.375rem]'
      containerClassName='grid grid-flow-col justify-center w-full gap-x-[0.62rem]'
      size='lg'
    />
    </label>
  );
}

export default InputMask;