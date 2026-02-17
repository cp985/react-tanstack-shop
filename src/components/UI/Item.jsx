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
    <li
      key={item.id}
      className={`${classItem['item-card']} ${classItem[backgroundStyle]}`}>

    
      <h3 className={classItem.h3}>{item.nome}</h3>
     <ul className={classItem["ul-classi"]}>Classi:{item.classe.map((classe) => <li key={classe}>{classe}</li>)}</ul>
      <div className={classItem["image-container"]}>
        <img className={classItem.image} src="#" alt={item.name} />
      </div>
      <p>
        Tipo: {itemType} - Rarity: {item.rarita}
      </p>
      <p>
        Rating: {item.rating} - Disponibili: {item.stock}
      </p>
      <p>Prezzo: {item.prezzo}</p>
    </li>
  );
}
