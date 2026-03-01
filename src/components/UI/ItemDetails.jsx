import { useItems } from "../../context/FilteredItemsContext";
import { useParams } from "react-router-dom";
import classItemDetails from "./style/ItemDetails.module.css";
import Button from "./Button";
import ItemImage from "./ItemImage";
import { imageSprite } from "../../util/imageSprite";
export default function ItemDetails() {
  const { items, addCart, cart } = useItems();
  const id = useParams();
  let item = {};

  if (!items) {
    return <div>Caricamento...</div>;
  }
  if (items) {
    item = items?.find((item) => item.id === id.id);
  }

  function handleAddToCart(item) {
    addCart(item);
  }

  return (
    <section className={classItemDetails["item-details"]}>
      <h2>{item.nome}</h2>
      <div className={classItemDetails["image-container"]}>
       
        <ItemImage
          spritePosX={imageSprite[item.id].x}
          spritePosY={imageSprite[item.id].y}
        />
      </div>

      <p className={classItemDetails["item-description"]}>{item.descrizione}</p>
      <article className={classItemDetails["details-container"]}>
        <p>Tipo: {item.categoria}</p>
        <p>Classe: {item.classe}</p>
        <p>Rarita: {item.rarita}</p>
        <p>Peso: {item.peso}</p>
      </article>
      <article className={classItemDetails["price-container"]}>
        <p>Rating:{item.rating}</p>
        <div>
          <p
            className={
              item.onSale
                ? classItemDetails["on-sale"]
                : classItemDetails["price"]
            }
          >
            Prezzo:{item.prezzo}
          </p>
          {item.onSale && (
            <p className={classItemDetails["special-price"]}>
              Special Price:{item.prezzo - item.prezzo * 0.3}
            </p>
          )}
        </div>
      </article>
      <div className={classItemDetails["button-container"]}>
        <Button text={"Torna allo shop"} end isLink path={"/app/shop"} />
        <Button
          text={"Aggiungi al carrello"}
          onClick={() => handleAddToCart(item)}
        />
      </div>
    </section>
  );
}
