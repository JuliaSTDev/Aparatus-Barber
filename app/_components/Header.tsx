"use client";


import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
        {session ?
        <div className="flex items-center gap-2">
          <p>{session.user?.name}</p>
          <Button variant="outline" size="icon" onClick={() => authClient.signOut()}>
            <LogOutIcon />
          </Button>
        </div>
        : <Button variant="outline" size="icon" onClick={handleLogin}>
        <LogInIcon />
      </Button>}
      <Button variant="outline" size="icon">
        <MenuIcon />
      </Button>
      </div>
      
    </header>
  );
};

export default Header;