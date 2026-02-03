"use client";


import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SidebarMenu from "./Sidebar-menu";

const Header = () => {
  const {data: session} = authClient.useSession()
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    })
    console.log("Login realizado com sucesso");
  }
  return (
    <header className="flex items-center justify-between px-5 py-6 bg-background">
      <Link href="/">
        <Image src="/LogoAparatus.svg" alt="logo da aparatus" width={100} height={26.09} />
      </Link>
      <div className="flex items-center gap-2">
      <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[370px] p-0">
            <SheetHeader className="border-b px-5 py-6 text-left">
              <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
            </SheetHeader>
            <SidebarMenu />
          </SheetContent>
        </Sheet>

      </div>
      
    </header>
  );
};

export default Header;