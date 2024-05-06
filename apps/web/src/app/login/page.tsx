'use client'
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

function page() {
  const [data, setData] =useState({email:"", password:""})
  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials",{
      redirect:false,
      ...data
    })
  };
  
  return (
    <div>
            <form action="post" onSubmit={registerUser}>        
        <label>
          <span>email</span>
          <input type="text" name="email" id="email" value={data.email} onChange={(e)=>setData({...data, email:e.currentTarget.value})}/>
        </label>
        <label>
          <span>password</span>
          <input type="text" name="password" id="password" value={data.password} onChange={(e)=>setData({...data, password:e.currentTarget.value})} />
        </label>
        <button>submit</button>
      </form>
    </div>
  );
}

export default page;