import { CustomJumbotron } from "../../components/CustomJumbotron";
import { CustomPagination } from "../../../components/custom/CustomPagination";
import { ProductsGrid } from "../../components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { data } = useProducts();

  return (
    <>
      <CustomJumbotron title="Todos los productos" />

      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
