import classProfileUser from "./style/ProfileUser.module.css";

import FormProfile from "../components/UI/FormProfile";
import Button from "../components/UI/Button";
import { useItems } from "../context/FilteredItemsContext";
export default function ProfileUser() {
  const { openModalDeleteAccount } = useItems();

  return (
    <section className={classProfileUser["section-profilo"]}>
      <h3> I tuoi dati personali</h3>
      <FormProfile />
      <div className={classProfileUser["delete-container"]}>
        <h2>Vuoi cancellare il tuo account?</h2>
        <Button onClick={openModalDeleteAccount} text="Delete Account" />
      </div>
    </section>
  );
}
