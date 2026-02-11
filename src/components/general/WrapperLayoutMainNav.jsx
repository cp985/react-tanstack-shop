import { Outlet } from "react-router-dom";
import MainNav from "../UI/MainNav";
import Footer from "../UI/Footer";
import "./style/WrapperLayoutMainNav.module.css";
export default function WrapperLayoutMainNav() {
  return (
    <>
      <h1>WrapperLayoutMainNav</h1>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
}
