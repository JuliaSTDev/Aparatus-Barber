import Image from "next/image";
import Header from "./_components/Header";
import SearchInput from "./_components/Search-input";
import banner from "../public/banner.png";
import BookingItem from "./_components/Booking-items";

const Home = () => {
  return (
    <main>
      <Header />
      <div className="px-5 space-y-4">
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
      </div>
   </main>
  );
}

export default Home;