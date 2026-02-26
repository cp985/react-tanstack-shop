import { useItems } from "../context/FilteredItemsContext";

import Button from "../components/UI/Button";
export default function LogOut() {
const { logOut } = useItems();

  return (
    <>
      <h2>Log-Out</h2>
      <h3>Sei sicuro di voler uscire?</h3>
      <p>Dovrai reinserire le tue credenziali per accedere al mercato.</p>
      <Button onClick={logOut} text="Logout" />
    </>
  );
}
