import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import MainNav from "../UI/MainNav";
import Footer from "../UI/Footer";
import FormFilter from "../UI/FormFilter";
import Header from "../UI/Header";
import { ItemsProvider } from "../../context/FilteredItemsContext";
const API_URL = import.meta.env.VITE_API_URL;
import classWrapperLayoutMainNav from "./style/WrapperLayoutMainNav.module.css";
export default function WrapperLayoutMainNav() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null); // Riferimento alla sidebar
  const [marginTop, setMarginTop] = useState(190); // Il tuo margine iniziale (es. altezza navbar)

  const { data: items } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      return res.json();
    },
  });

  console.log("items:", items);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsFilterOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen]); 

  function toggleFilter(e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsFilterOpen((prev) => !prev);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const altezzaNavbar = 190; 
      const nuovoMargine = Math.max(90, altezzaNavbar - scrollY);

      setMarginTop(nuovoMargine);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  if (!items) {
    return <div>Caricamento...</div>;
  }
  return (
    <>
      <Header />
      <ItemsProvider items={items.products}>
        <MainNav setIsFilterOpen={toggleFilter} isFilterOpen={isFilterOpen} />
        <main className={classWrapperLayoutMainNav.main}>
          {isFilterOpen && (
            <aside
              className={classWrapperLayoutMainNav.aside}
              style={{ marginTop: `${marginTop}px` }}
              ref={sidebarRef}
            >
              <FormFilter />
            </aside>
          )}
          <Outlet />
        </main>
      </ItemsProvider>

      <Footer />
    </>
  );
}
