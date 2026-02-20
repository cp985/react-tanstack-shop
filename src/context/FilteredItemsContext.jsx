import { createContext, useContext, useState,useMemo } from "react";

const ItemsContext = createContext();

export function ItemsProvider({ children, items }) {
  //items e bfiltered items
  const [formData, setFormData] = useState({
    rarita: [],
    classe: [],
    categoria: [],
    prezzoMin: 0,
    prezzoMax: 10000,
    sortBy: "prezzo",
    sortOrder: "asc",
  });

  if (!items) {
    return <div>Caricamento...</div>; // o un loader/spinner
  }

  const RARITA_ORDER = {
    Comune: 1,
    "Non comune": 2,
    Rara: 3,
    Epica: 4,
    Leggendaria: 5,
  };

  const filtered = useMemo(() =>  items
    .filter((item) => {
      const matchRarita =
        formData.rarita.length === 0 || formData.rarita.includes(item.rarita);
      const matchClasse =
        formData.classe.length === 0 ||
        item.classe.some((c) => formData.classe.includes(c));
      const matchCategoria =
        formData.categoria.length === 0 ||
        formData.categoria.includes(item.categoria);
      const matchPrezzo =
        item.prezzo >= formData.prezzoMin && item.prezzo <= formData.prezzoMax;
      return matchRarita && matchClasse && matchCategoria && matchPrezzo;
    })
    .sort((a, b) => {
      const order = formData.sortOrder === "asc" ? 1 : -1;
      if (formData.sortBy === "prezzo") {
        return (a.prezzo - b.prezzo) * order;
      }
      if (formData.sortBy === "nome") {
        return a.nome.localeCompare(b.nome) * order;
      }
      if (formData.sortBy === "rarita") {
        const rarityA = RARITA_ORDER[a.rarita] || 0;
        const rarityB = RARITA_ORDER[b.rarita] || 0;
        return (rarityA - rarityB) * order;
      }
    },
    [items, formData])
  )
  //cart and logic

  const [cart, setCart] = useState([]);
  function addCart(item) {
    setCart((prevS) => {
      const itemExist = prevS.find((i) => i.id === item.id);

      if (itemExist) {
        return prevS.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prevS, { ...item, quantity: 1 }];
    });
  }

  function removeCart(id) {
    setCart((prevS) => {
      const itemExist = prevS.find((i) => i.id === id);

      if (!itemExist) return prevS;

      if (itemExist.quantity === 1) {
        return prevS.filter((i) => i.id !== id);
      } else {
        return prevS.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
    });
  }

function clearCart() {
  setCart([]);
}

function quantityCart(){
  return cart.reduce((tot,next)=>tot + next.quantity,0)
}

function totalPrice(){
 return  cart.reduce((tot,next)=> tot + next.quantity*next.prezzo,0)
}

  return (
    <ItemsContext.Provider value={{ items, filtered, formData, setFormData,cart,addCart,removeCart,clearCart,quantityCart ,totalPrice}}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}


