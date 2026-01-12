import Image from "next/image";
import Header from "./_components/Header";
import SearchInput from "./_components/Search-input";
import banner from "../public/banner.png";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="px-5 space-y-4">
        <SearchInput />
        <Image 
          src={banner} 
          alt="Agende agora" 
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
   </div>
  );
}

export default Home;