import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import classOrdersHistory from "./style/OrdersHistory.module.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function OrdersHistory() {
  const [showProducts, setShowProducts] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_URL}/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      } catch (err) {
        throw new Error(err.message);
      }
    },
  });
  console.log(data);

  return (
    <>
      <h3>I tuoi Ordini</h3>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}

      {data && (
        <ul className={classOrdersHistory["orders"]}>
          {data.orders?.map((order) => (
            <li className={classOrdersHistory["order"]}
              key={order._id}
              onClick={() =>
                setShowProducts(showProducts === order._id ? null : order._id)
              }
            >
              <div className={classOrdersHistory["order-status"]}>
                <p>Ordine n: {order._id}</p>
                <p>Status: {order.stato}</p>
                <p>
                  Del: {new Date(order.createdAt).toLocaleDateString("it-IT")}
                </p>
                <p>Totale: {order.totale}</p>
              </div>

              {showProducts === order._id && (
                <article className={classOrdersHistory.products}>
                  {order.prodotti.map((product) => (
                    <ul className={classOrdersHistory.product} key={product._id}>
                     <li><p>Dettagli: {product.nome}</p></li> 
                     <li><p>Qta.: {product.quantita}</p></li> 
                     <li><p>Prezzo: {product.prezzo}</p></li> 
                    </ul>
                  ))}
                </article>
              )}
            </li>
          ))}
        </ul>
      )}
      <h3>Ordini effettuati : {data.orders?.length || 0}</h3>
    </>
  );
}
