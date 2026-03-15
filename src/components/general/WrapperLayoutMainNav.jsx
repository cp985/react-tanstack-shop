import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import MainNav from "../UI/MainNav";
import Footer from "../UI/Footer";
import FormFilter from "../UI/FormFilter";
import Header from "../UI/Header";
import ModalCheckout from "../UI/ModalCheckout";
import ModalDeleteAccount from "../UI/ModalDeleteAccount";
import { ItemsProvider } from "../../context/FilteredItemsContext";
const API_URL = import.meta.env.VITE_API_URL;
import classWrapperLayoutMainNav from "./style/WrapperLayoutMainNav.module.css";
export default function WrapperLayoutMainNav() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);
  let path = useLocation().pathname;
  

  const { data: items } = useSuspenseQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      return res.json();
    },
  });

 

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

  // In MainNav.jsx o WrapperLayoutMainNav.jsx
  const navRef = useRef(null);



  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight;
        document.documentElement.style.setProperty("--nav-height", `${h}px`);
      }
    };

      const timeout = setTimeout(updateNavHeight, 50);

    window.addEventListener("resize", updateNavHeight);

    window.visualViewport?.addEventListener("resize", updateNavHeight);

    return () => {
        clearTimeout(timeout);
      window.removeEventListener("resize", updateNavHeight);
      window.visualViewport?.removeEventListener("resize", updateNavHeight);
    };
  }, [isFilterOpen]);

  if (!items) {
    return <div>Caricamento...</div>;
  }

  //modal checkout
  function openModal() {
    modalRef.current.showModal();
  }

  function closeModal() {
    modalRef.current.close();
  }

  const modalRef = useRef();

  //modal delete account
  const modalDeleteAccountRef = useRef();
  function openModalDeleteAccount() {
    modalDeleteAccountRef.current.showModal();
  }
  function closeModalDeleteAccount() {
    modalDeleteAccountRef.current.close();
  }

  return (
    <>
      <Header />
      <ItemsProvider
        items={items.products}
        openModal={openModal}
        openModalDeleteAccount={openModalDeleteAccount}
        closeModalDeleteAccount={closeModalDeleteAccount}
      >
        <ModalCheckout
          ref={modalRef}
          closeModal={closeModal}
          openModal={openModal}
        />
        <ModalDeleteAccount
          ref={modalDeleteAccountRef}
          closeModalDeleteAccount={closeModalDeleteAccount}
          openModalDeleteAccount={openModalDeleteAccount}
        />
        <div className={classWrapperLayoutMainNav.navDiv} ref={navRef}>
          <MainNav setIsFilterOpen={toggleFilter} isFilterOpen={isFilterOpen} />
        </div>
        <main className={classWrapperLayoutMainNav.main}>
          <aside
            className={`${classWrapperLayoutMainNav.aside} ${isFilterOpen && (path === "/app/shop"|| path === "/app/shop/sales")  ? classWrapperLayoutMainNav.asideOpen : classWrapperLayoutMainNav.asideClosed} `}
            ref={sidebarRef}
          >
            <FormFilter />
          </aside>

          <Outlet />
        </main>
      </ItemsProvider>
      <Footer />
    </>
  );
}
