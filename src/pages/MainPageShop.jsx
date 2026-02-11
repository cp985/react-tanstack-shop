//! pagine home se con token . si vedrà lista oggetti e filtri
import { useLoaderData, Outlet } from "react-router-dom";
import ItemContainer from "../components/UI/ItemContainer";
import { DUMMY_ITEMS } from "../util/dataDummy";
export default function MainPageShop() {
  const items = useLoaderData();
  console.log("items ", items);

  return (
    <>
      <>
        <h1>MainPageShop</h1> <ItemContainer list={items} />
       
      </>
    </>
  );
}

export function loader() {
  return DUMMY_ITEMS;
}
