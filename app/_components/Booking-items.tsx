import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Booking } from "@/generated/prisma/client";

interface BookingItemProps {
  booking: {
    id: string;
    date: Date;
    cancelled: boolean | null;
    service: {
      name: string;
      priceInCents: number;
    };
    barbershop: {
      id: string;
      name: string;
      imageUrl: string;
      address: string;
      phones: string[];
    };
  };
}

const BookingItem = ({booking}:BookingItemProps) => {
    return (
       <Card className="flex flex-row items-center justify-between  w-full min-w-full p-0">
            <div className="flex flex-col gap-4 flex-1 p-4">
                <Badge>
                    Confirmado
                </Badge>

                <div className="flex  flex-col gap-2">
                    <p className="font-bold">{booking.service.name}</p>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl}/>
                       </Avatar>
                       <p className="text-sm">{booking.barbershop.name}</p>
                    </div>
                </div>
            </div>

            {/* div direita */}
           <div className="flex flex-col items-center justify-center p-4 h-full border-l py-3">
                <p className="text-xs capitalize">
                    {/* data formatada para aparecer o mes com js */}
                    {booking.date.toLocaleDateString("pt-BR", { month: "long" })}
                </p>
                <p>
                    {booking.date.toLocaleDateString("pt-BR", { day: "2-digit" })}
                </p>
                {/* tempo formatado com js */}
                <p className="text-xs capitalize">
                    {booking.date.toLocaleTimeString("pt-br",{hour: "2-digit", minute:"2-digit"})}
                </p>
           </div>

       </Card>
    )
}

export default BookingItem;