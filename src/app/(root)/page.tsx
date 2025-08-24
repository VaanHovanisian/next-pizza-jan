import { Catalog, Container, Filter } from "@/components";
import { Header } from "@/components/header";
import { TopBar } from "@/components/top-bar";
import { prisma } from "@/prisma/prizma-client";


export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variants: true
        }
      }
    }
  })
  return (

    <>

      <TopBar categories={categories.filter(el => el.products.length > 0).map((el) => ({ name: el.name, id: el.id }))} />
      <Container className="flex gap-10 mt-10">
        <Filter className="max-w-[245px]" />
        <div className="flex  flex-col">
          {categories.map(el => el.products.length > 0 && (
            <Catalog
              key={el.id}
              items={el.products}
              title={el.name}
              id={el.id}
              className="flex flex-col gap-10" />
          ))}

        </div>

      </Container>
    </>
  );
}
