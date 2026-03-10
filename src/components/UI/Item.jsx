import { Link } from "react-router-dom";
import ItemImage from "./ItemImage";
import { imageSprite } from "../../util/imageSprite";
import Money from "./Money";
import OnSaleItem from './OnSaleItem';
import ItemOutOfStock from './ItemOutOfStock';

import classItem from "./style/Item.module.css";
export default function Item({ item }) {
  let itemType = item.categoria;
  switch (itemType) {
    case "Armi":
      itemType = "Arma";
      break;
    case "Armature":
      itemType = "Armatura";
      break;
    case "Consumabili":
      itemType = "Consumabile";
      break;
    case "Oggetto":
      itemType = "Oggetto";
      break;
    default:
      itemType = item.categoria;
      break;
  }

  let backgroundStyle = "transparent";
  const itemRarity = item.rarita;
  switch (itemRarity) {
    case "Comune":
      backgroundStyle = "rarity-common";
      break;
    case "Non comune":
      backgroundStyle = "rarity-uncommon";
      break;
    case "Rara":
      backgroundStyle = "rarity-rare";
      break;
    case "Epica":
      backgroundStyle = "rarity-epic";
      break;
    case "Leggendaria":
      backgroundStyle = "rarity-legendary";
      break;
    default:
      backgroundStyle = "rarity-default";
      break;
  }
  return (
    <Link to={`/app/shop/item/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <li
        key={item.id}
        className={`${classItem["item-card"]} ${classItem[backgroundStyle]}`}
      >
        <div className={classItem["item-info1"]}>
          <h4>{item.rarita}</h4>
          <h3>{item.nome}</h3>
          <ul className={classItem["ul-class"]}>
            Classi:
            {item.classe.map((classe) => (
              <li key={classe}>{classe},</li>
            ))}
          </ul>
        </div>
        <div className={classItem["image-container"]}>
        
          <ItemImage
          id={item.id}
            spritePosX={imageSprite[item.id].x}
            spritePosY={imageSprite[item.id].y}
          />
          {item.onSale && item.stock > 0 && <OnSaleItem />}
          {item.stock === 0 && <ItemOutOfStock />}
        </div>

        <div className={classItem["item-info2"]}>
         
          <p>Tipo: {itemType}</p>
          <p>Rating: {item.rating}</p>
          
          <p className={classItem["price"]}>Prezzo: {item.prezzo}<Money/></p>
        </div>
      </li>
    </Link>
  );
}
