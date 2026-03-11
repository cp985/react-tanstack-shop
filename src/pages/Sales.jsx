import ItemContainer from "../components/UI/ItemContainer";
import { useItems } from "../context/FilteredItemsContext";
import classSales from "./style/Sales.module.css";
export default function Sales() {

  const {filtered}= useItems();
  let filteredOnSale = filtered.filter((item) => item.onSale === true);
console.log(data);

  return (
    <section className={classSales["sales-page"]}>
      <h2>Saldi Leggendari!!!</h2>

      <ItemContainer list={filteredOnSale} />
    </section>
  );
}
