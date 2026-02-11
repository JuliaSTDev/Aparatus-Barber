
import { prisma } from "@/lib/prisma";
import BarbershopItem from "../_components/Barbershop-items";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import QuickSearchButtons from "../_components/quick-search-button";
import SearchInput from "../_components/Search-input";
import { PageContainer } from "../_components/ui/page";

const BarbershopsPage = async ({ searchParams }: PageProps<"/barbershops">) => {
  const { search } = await searchParams;
  const barbershops = search
    ? await prisma.barbershop.findMany({
        where: {
          services: {
            some: {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      })
    : [];

  return (
    <main>
      <Header />
      <PageContainer>
        <SearchInput />

        <QuickSearchButtons />

        {search && (
          <div className="mt-6">
            <h2 className="text-muted-foreground mb-4 text-sm font-semibold uppercase">
              Resultados para &quot;{search}&quot;
            </h2>

            {barbershops.length > 0 ? (
              <div className="flex flex-col gap-4">
                {barbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                Nenhuma barbearia encontrada.
              </p>
            )}
          </div>
        )}
      </PageContainer>
      <Footer />
    </main>
  );
};

export default BarbershopsPage;