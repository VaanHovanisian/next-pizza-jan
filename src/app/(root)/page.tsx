import { GetSearchParams } from "@/@types/filter";
import { Catalog, Container, Filter } from "@/components";
import { TopBar } from "@/components/top-bar";
import { filterProduct } from "@/lib/filter-product";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await filterProduct(searchParams);
  return (
    <>
      <TopBar
        categories={categories
          .filter((el) => el.products.length > 0)
          .map((el) => ({ name: el.name, id: el.id }))}
      />
      <Container className="flex gap-10 mt-10">
        <Filter className="max-w-[200px] w-full" />
        <div className="flex  flex-col">
          {categories.map(
            (el) =>
              el.products.length > 0 && (
                <Catalog
                  key={el.id}
                  items={el.products}
                  title={el.name}
                  id={el.id}
                  className="flex flex-col gap-10"
                />
              )
          )}
        </div>
      </Container>
    </>
  );
}
