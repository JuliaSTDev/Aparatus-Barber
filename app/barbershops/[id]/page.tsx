import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/_components/Footer";
import CopyPhoneButton from "@/app/_components/CopyPhoneButton";
import ServiceItem from "@/app/_components/ServiceItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/separator";
import { ChevronLeft, Square } from "lucide-react";

interface BarbershopPageProps {
  params: Promise<{ id: string }>;
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const { id } = await params;
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });

  if (!barbershop) {
    return notFound();
  }

  const phones = barbershop.phones ?? [];
  const initial = barbershop.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-muted">
      {/* Banner: apenas imagem e botão Voltar (sem header) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
        <Link
          href="/"
          className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-sm hover:bg-card/90"
          aria-label="Voltar"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Card branco: 100% da largura, sem margin aos lados, sobrepõe o banner */}
      <div className="-mt-12 relative z-10 w-full">
        <div className="w-full rounded-t-2xl bg-card shadow-sm overflow-hidden">
          {/* Faixa superior: foto da barbearia do banco, nome, endereço */}
          <div className="px-5 py-4 flex items-center gap-3">
            <Avatar className="size-12 shrink-0 rounded-full bg-muted-foreground overflow-hidden">
              <AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
              <AvatarFallback className="bg-muted-foreground text-primary-foreground text-lg font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-foreground truncate">
                {barbershop.name}
              </h1>
              {barbershop.address && (
                <p className="text-muted-foreground text-sm truncate">
                  {barbershop.address}
                </p>
              )}
            </div>
          </div>

          {/* Linha de separação cinza entre perfil e Sobre nós (espaçamento Figma) */}
          <div className="px-5">
            <Separator className="my-5" />
          </div>

          {/* Conteúdo: Sobre nós, Serviços, Contato */}
          <div className="px-5 pb-6 space-y-6">
            {/* SOBRE NÓS - fonte do tema (Inter) como no Figma */}
            <section className="space-y-2 font-sans">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wide font-sans">
                Sobre nós
              </h2>
              <p className="text-foreground text-sm leading-relaxed font-sans">
                {barbershop.description ??
                  "Bem-vindo à nossa barbearia, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida."}
              </p>
            </section>

            {/* SERVIÇOS */}
            {barbershop.services.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Serviços
                </h2>
                <div className="flex flex-col gap-3">
                  {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
                </div>
              </section>
            )}

            {/* CONTATO */}
            {phones.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Contato
                </h2>
                <div className="flex flex-col gap-3">
                  {phones.map((phone) => (
                    <div
                      key={phone}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <Square className="size-4 shrink-0 text-muted-foreground stroke-[1.5]" />
                      <span className="text-foreground text-sm">{phone}</span>
                      <CopyPhoneButton phone={phone} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
