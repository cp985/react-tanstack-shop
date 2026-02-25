//! pagina con sottopagine profile e storico ordini
import { Outlet } from "react-router-dom";
import SecondNav from "../components/UI/SecondNav";
import classAccountUser from "./style/AccountUser..module.css";

export default function AccountUser() {
  return (
    <section className={classAccountUser["account-page"]}>
      <SecondNav />
      <div className={classAccountUser["account-container"]}>
       
    <h2>Il tuo Profilo</h2>
        <Outlet />
      </div>
    </section>
  );
}
