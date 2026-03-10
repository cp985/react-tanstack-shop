import classOutOfStock from "./style/ItemOutOfStock.module.css";

export default function ItemOutOfStock() {
  return (
    <div className={classOutOfStock["out-of-stock-first"]}>
    <div className={classOutOfStock["out-of-stock-wrapper"]}>
      <div className={classOutOfStock["out-of-stock"]}></div>
      <div className={classOutOfStock["out-of-stock-title"]}>
        <h3>SOLD OUT</h3>
      </div>
    </div>
    </div>
  );
}
