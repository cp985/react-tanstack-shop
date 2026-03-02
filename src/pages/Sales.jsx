import { httpLoaderItems } from "../util/httpRequest";
import ItemContainer from "../components/UI/ItemContainer";
import { useQuery } from "@tanstack/react-query";
import classSales from "./style/Sales.module.css";
export default function Sales() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: () => httpLoaderItems(),
    
  });
  let filtered = data.products.filter((item) => item.onSale === true);
console.log(data);

  return (
    <section className={classSales["sales-page"]}>
      <h2>Saldi Leggendari!!!</h2>
      {error && <h3>{error.message}</h3>}
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3>{isError.message}</h3>}
      <ItemContainer list={filtered} />
    </section>
  );
}
