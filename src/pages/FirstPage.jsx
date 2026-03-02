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
        image
          title={"Shop"}
          path={"/app/shop"}
          description={"Go to the main shop page and find your staff!!"}
        />
        <CardLink
        image
          title={"Profile"}
          path={`/app/accountUser/${user}/profile`}
          description={"Setting your profile options"}
        />
        <CardLink
        image
          title={"Orders"}
          path={`/app/accountUser/${user}/orders`}
          description={"Organize your orders status "}
        />
      </div>
      <CardLink classOf={"sales"}   title="Approfitta dei saldi leggendari!!"
  path={`/app/sales`}>
 
      </CardLink>
    </section>
  );
}
