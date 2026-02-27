import { Link } from "react-router-dom";
import ItemImage from "./ItemImage";
import { imageSprite } from "../../util/imageSprite";

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
    <Link to={`item/${item.id}`}>
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
            spritePosX={imageSprite[item.id].x}
            spritePosY={imageSprite[item.id].y}
          />
        </div>

        <div className={classItem["item-info2"]}>
          {" "}
          <p>Tipo: {itemType}</p>
          <p>Rating: {item.rating}</p>
          <p className={classItem["price"]}>Prezzo: {item.prezzo}</p>
        </div>
      </li>
    </Link>
  );
}
