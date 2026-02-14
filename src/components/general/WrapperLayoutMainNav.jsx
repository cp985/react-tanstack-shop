import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MainNav from "../UI/MainNav";
import Footer from "../UI/Footer";
import FormFilter from "../UI/FormFilter";
import Header from "../UI/Header";
import "./style/WrapperLayoutMainNav.module.css";
export default function WrapperLayoutMainNav() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null); // Riferimento alla sidebar

  useEffect(() => {
    // Funzione che gestisce il click
    const handleClickOutside = (event) => {
      // Se la sidebar è aperta E il click NON è dentro la sidebar...
      if (
        isFilterOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    // Aggiungiamo l'event listener al document
    document.addEventListener("click", handleClickOutside);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    // Ricordati di rimuoverlo nel return!

    // PULIZIA: Rimuoviamo l'evento quando il componente viene smontato
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterOpen]); // Si riattiva ogni volta che isOpen cambia

  function toggleFilter(e) {
    // IMPORTANTE: Fermiamo la propagazione così il click sul bottone
    // non arriva al document.addEventListener attivando handleClickOutside
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsFilterOpen((prev) => !prev);
  }

  const [marginTop, setMarginTop] = useState(130); // Il tuo margine iniziale (es. altezza navbar)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const altezzaNavbar = 130; // Sostituisci con l'altezza reale della tua barra gialla
      
      // Calcoliamo il nuovo margine: parte da 80 e scende fino a 0 man mano che scrolli
      const nuovoMargine = Math.max(50, altezzaNavbar - scrollY);
      
      setMarginTop(nuovoMargine);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <Header />
      <MainNav setIsFilterOpen={toggleFilter} isFilterOpen={isFilterOpen} />
      {isFilterOpen && (
        <aside style={{ marginTop: `${marginTop}px` }} ref={sidebarRef}>
          <FormFilter />
        </aside>
      )}

      <Outlet />
      <Footer />
    </>
  );
}
