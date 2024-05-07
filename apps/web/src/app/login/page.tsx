'use client'
import SignIn from "@/components/pages/Login";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function page() {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(()=>{
      if(status ==="authenticated"){
        router.push("/dashboard")
      }
  },[session,status])
return (
    <SignIn />
  );
}

export default page;