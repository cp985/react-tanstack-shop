import Item from "./Item";
import classItemContainer from './style/ItemContainer.module.css'
export default function ItemContainer({ list }) {
  return (
    <div className={classItemContainer.container}>
      <ul className={classItemContainer.ul}>
        {list.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
}
