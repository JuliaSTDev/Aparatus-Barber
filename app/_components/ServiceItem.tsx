"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import type { BarbershopService } from "../generated/prisma/client";

interface ServiceItemProps {
  service: BarbershopService;
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 w-full">
      <div className="relative size-14 shrink-0 rounded-lg overflow-hidden bg-muted aspect-square">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-foreground font-bold text-sm leading-tight">
          {service.name}
        </p>
        <p className="text-muted-foreground text-xs leading-snug">
          {service.description ?? "Estilo personalizado com as últimas tendências."}
        </p>
        <p className="text-foreground font-bold text-sm">
          R$ {(service.priceInCents / 100).toFixed(2)}
        </p>
      </div>
      <Button type="button" size="sm" className="shrink-0 rounded-full h-9 px-5 bg-primary text-primary-foreground hover:bg-primary/90">
        Reservar
      </Button>
    </div>
  );
}
