import { useItems } from "../context/FilteredItemsContext";

import Button from "../components/UI/Button";
export default function LogOut() {
const { logOut } = useItems();

  return (
    <>
      <h1>LogOut</h1>
      <h1>Sei sicuro di voler uscire?</h1>
      <p>Dovrai reinserire le tue credenziali per accedere al mercato.</p>
      <Button onClick={logOut} text="Logout" />
    </>
  );
}
