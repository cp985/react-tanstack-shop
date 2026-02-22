import classProfileUser from "./style/ProfileUser.module.css";

import FormProfile from "../components/UI/FormProfile";
import Button from "../components/UI/Button";
import { useItems } from "../context/FilteredItemsContext";
export default function ProfileUser() {

  const { openModal } = useItems();
  return (
    <section className={classProfileUser["section-profilo"]}>
      <h1> ProfileUser</h1>
      <FormProfile />
      <div>
        <h2>Vuoi cancellare il tuo account?</h2>
        <Button onClick={openModal} text="Delete Account" />
      </div>
    </section>
  );
}
