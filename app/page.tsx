import Image from "next/image";
import Header from "./_components/Header";
import SearchInput from "./_components/Search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/Booking-items";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/Barbershop-items";
import Footer from "./_components/Footer";

const Home = async() => {
  const recomendedBarbershop = await prisma.barbershop.findMany({
    orderBy:{
      name:"asc",
    }
  });
  const popularBarberShop = await prisma.barbershop.findMany({
    orderBy:{
      name:"desc",
    }
  });
  return (
    <main>
      <Header />
      <div className="px-5 space-y-4 p-5">
        <SearchInput />
        <Image 
          src={banner} 
          alt="Agende agora" 
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-xs text-foreground font-semibold uppercase">Agendamentos</h2>
        <BookingItem 
          serviceName="Corte de cabelo"
          barbershopName="Barbearia do joão"
          barbershopImageUrl="https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png"
          date={new Date()}
        />  

        <h2 className="text-xs text-foreground font-semibold uppercase">Recomendados</h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recomendedBarbershop.map((barbershop) => (
          <BarbershopItem
            key={barbershop.id}
            barbershop={barbershop}
          />
        ))}
        </div>

          <h2 className="text-xs text-foreground font-semibold uppercase">Populares</h2>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShop.map((barbershop) => (
          <BarbershopItem
            key={barbershop.id}
            barbershop={barbershop}
          />
        ))}
        </div>
      </div>
      <Footer />
   </main>
  );
}

export default Home;