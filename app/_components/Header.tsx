import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-6 bg-background">
      <Link href="/">
        <Image src="/LogoAparatus.svg" alt="logo da aparatus" width={100} height={26.09} />
      </Link>
      <Button variant="outline" size="icon">
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;