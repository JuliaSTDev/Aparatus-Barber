import Image from "next/image";
import Header from "./_components/Header";
import SearchInput from "./_components/Search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/Booking-items";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/Barbershop-items";
import Footer from "./_components/Footer";
import { PageContainer, PageSection, PageSectionScroller, PageSectionTitle } from "./_components/ui/page";

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
      <PageContainer>
        <SearchInput />
        <Image 
          src={banner} 
          alt="Agende agora" 
          sizes="100vw"
          className="h-auto w-full"
        />
    
        <PageSection>
        <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recomendedBarbershop.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
          </PageSectionScroller>
        </PageSection>
        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
         <PageSectionScroller>
          {popularBarberShop.map((barbershop) => (
          <BarbershopItem
            key={barbershop.id}
            barbershop={barbershop}
          />
          ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
   </main>
  );
}

export default Home;