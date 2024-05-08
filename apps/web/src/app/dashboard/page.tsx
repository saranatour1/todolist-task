"use client"
import Dashboard from "@/components/pages/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function page() {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(()=>{
      if(status !=="authenticated"){
        router.push("/login")
      }
  },[session,status])
  return (
    <Dashboard />
  );
}

export default page;