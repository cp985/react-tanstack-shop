import { useEffect } from "react";
import CardLink from "../components/UI/CardLink";
import classFirstPage from "./style/FirstPage.module.css";
import { useItems } from "../context/FilteredItemsContext";
export default function FirstPage() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const { setUser, user } = useItems();
  useEffect(() => {
    setUser({ username, email, isLogIn: true });
  }, []);

  return (
    <section className={classFirstPage.firstPage}>
      <h2>Bentornato {user.username}</h2>
      <div className={classFirstPage.bottonContainer}>
        <CardLink
          title={"Shop"}
          path={"/app/shop"}
          description={"Go to the main shop page and find your staff!!"}
        />
        <CardLink
          title={"Profile"}
          path={`/app/accountUser/${user}/profile`}
          description={"Setting your profile options"}
        />
        <CardLink
          title={"Orders"}
          path={`/app/accountUser/${user}/orders`}
          description={"Organize your orders status "}
        />
      </div>
      <CardLink classOf={"sales"}  path={`/app/sales`}>
        <div className="sales-content">
          <h2>OFFERTE LIMITATE</h2>
          <p>Clicca per gli sconti di gilda!</p>
        </div>
      </CardLink>
    </section>
  );
}
