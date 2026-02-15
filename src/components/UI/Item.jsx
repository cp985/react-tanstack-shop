import classItem from "./style/Item.module.css";
export default function Item({ item }) {
  let backgroundStyle = "transparent";
  const itemRarity = item["rarità"];
  switch (itemRarity) {
    case "Comune":
      backgroundStyle = "grey";
      break;

    case "Non-Comune":
      backgroundStyle = "blue";
      break;

    case "Raro":
      backgroundStyle = "yellow";
      break;

    case "Leggendaria":
      backgroundStyle = "orange";
      break;

    default:
      "transparent";
      break;
  }
  return (
    <li
      key={item.id}
      className={classItem.item}
      style={{ background: backgroundStyle }}
    >
      <h3 className={classItem.h3}>{item.nome}</h3>
      <h4>{item.classe}</h4>
      <div className={classItem["image-container"]}>
        <img className={classItem.image} src="#" alt={item.name} />
      </div>
      <p>
        Tipo: {item.categoria} - Rarity: {item["rarità"]}
      </p>
      <p>
        Rating: {item.rating} - Disponibili: {item.stock}
      </p>
      <p>Prezzo: {item.prezzo}</p>
    </li>
  );
}
