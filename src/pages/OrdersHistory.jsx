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
      <h1>OrdersHistory</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}

      {data && (
        <ul className={classOrdersHistory.ul}>
          {data.orders?.map((order) => (
            <li
              key={order._id}
              onClick={() =>
                setShowProducts(showProducts === order._id ? null : order._id)
              }
            >
              <h3>{order._id}</h3>
              <p>{order.stato}</p>
              <p>{new Date(order.createdAt).toLocaleDateString("it-IT")}</p>
              <p>{order.totale}</p>
              {showProducts === order._id && (
                <div>
                  <p>
                    {order.prodotti.map(
                      (product) =>
                        product.nome +
                        " " +
                        product.quantita +
                        " " +
                        product.prezzo,
                    )}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <h2>Ordini effettuati : {data.orders?.length || 0}</h2>
    </>
  );
}
