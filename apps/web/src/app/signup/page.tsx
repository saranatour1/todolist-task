'use client'

import { FormEvent, useEffect, useState } from "react";


function page() {
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
  
      const userInfo = await response.json(); // Await the response.json()
      console.log(userInfo);
    } catch (e) {
      console.log("failed to sign up", e);
    }
  };
  


  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div>
      <form action="post" onSubmit={registerUser}>
        <label>
          <span>username</span>
          <input type="text" name="username" id="username" value={data.username} onChange={(e)=>setData({...data, username:e.currentTarget.value})}/>
        </label>
        
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