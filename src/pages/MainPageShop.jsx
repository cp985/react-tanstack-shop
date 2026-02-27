//! pagine home se con token . si vedrà lista oggetti e filtri
import { useLoaderData } from "react-router-dom";

import { useItems } from "../context/FilteredItemsContext";
import ItemContainer from "../components/UI/ItemContainer";

export default function MainPageShop() {
  const { filtered } = useItems();
  const items = useLoaderData();

  return (
    <section>
      {filtered && <h2>{filtered.length} oggetti trovati</h2>}
      <ItemContainer list={filtered ? filtered : items} />
    </section>
  );
}

export function loader() {}
