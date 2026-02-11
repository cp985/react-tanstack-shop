import CardLink from "../components/UI/CardLink";
import classFirstPage from "./style/FirstPage.module.css";

export default function FirstPage() {
  const user = localStorage.getItem("username");
  return (
    <>
      <h1>FirstPage</h1>
      <div className={classFirstPage.bottonContainer}>
        <CardLink
          text={"Shop"}
          path={"/app/shop"}
       
        />
                <CardLink
          text={"Profile"}
          path={`/app/accountUser/${user}/profile`}
       
        />
                <CardLink
          text={"Orders"}
          path={`/app/accountUser/${user}/orders`}
       
        />

      </div>
    </>
  );
}
