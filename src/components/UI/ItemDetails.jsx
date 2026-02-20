import { useItems } from "../../context/FilteredItemsContext";
import { useParams} from "react-router-dom";
import classItemDetails from "./style/ItemDetails.module.css";
import Button from "./Button";
import ItemImage from "./ItemImage";
import { imageSprite } from "../../util/imageSprite";
export default function ItemDetails() {

  const { items,addCart, cart } = useItems();
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
    console.log("aggiunto",item);
    console.log('cart', cart);
    
  }

  return (
    <section className={classItemDetails["item-details"]}>
      <h2>{item.nome}</h2>

      <ItemImage
        spritePosX={imageSprite.id?.x}
        spritePosY={imageSprite.id?.y}
      />
      <p>{item.descrizione}</p>
      <article className={classItemDetails["details-container"]}>
        <p>Tipo:{item.categoria}</p>
        <p>Classe:{item.classe}</p>
        <p>Rarita:{item.rarita}</p>
        <p>Peso:{item.peso}</p>
      </article>
      <article className={classItemDetails["price-container"]}>
        <p>Rating:{item.rating}</p>
        <div>
     
          <p className={item.onSale ? classItemDetails["on-sale"] : classItemDetails["price"]}>
            Prezzo:{item.prezzo}
          </p>
          {item.onSale && (
            <p className={classItemDetails["special-price"]}>Special Price:{item.prezzo - item.prezzo * 0.3}</p>
          )}
        </div>
      </article>
      <div className={classItemDetails["button-container"]}>
        <Button text={"Torna allo shop"}  isLink path={"/app/shop"} />
        <Button text={"Aggiungi al carrello"} onClick={()=>handleAddToCart(item)} />
      </div>
    </section>
  );
}
