'use client'
import { Avatar, Button, Popover, TextInput } from "@mantine/core";
import Image from "next/image";
import ArrowDown from "../../../public/arrowdown.svg"
import Logo from "../../../public/logo.svg"
import { signOut, useSession } from "next-auth/react";
function NavBar() {
  const { data: session, status } = useSession();
  return (
    <header className="w-full py-[1.375rem] px-[13.125rem] bg-white shadow-nav-shadow">
      <nav className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-x-4">
          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <button className="bg-transparent">
                <Image src={ArrowDown} alt="arrow down svg"/>
              </button>
            </Popover.Target>
            <Popover.Dropdown className="px-4 py-2 shadow-modal rounded-[0.375rem]">
              <button className="text-red-0 text-[0.875rem] font-medium" onClick={()=> signOut()}>
              تسجيل الخروج
              </button>
            </Popover.Dropdown>
          </Popover>
          <Avatar src={session?.user?.image} alt="it's me" />
        </div>
        <Image src={Logo} alt="logo" />
      </nav>
    </header>
  );
}

export default NavBar;
