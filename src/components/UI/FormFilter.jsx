import classFormFilter from "./style/FormFilter.module.css";
import Input from "./Input";
import { useItems } from "../../context/FilteredItemsContext";
import { useLocation } from "react-router-dom";
export default function FormFilter() {
  const { formData, setFormData } = useItems();
  let path = useLocation().pathname;

  function handlerStatusChange(e) {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      if (name === "onSale") {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((v) => v !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <form className={classFormFilter["form-filter"]}>
      <details>
        <summary>Ordina per</summary>

        <div className={classFormFilter["details-container"]}>
          <select name="sortBy" onChange={handlerStatusChange}>
            <option value="prezzo">Prezzo</option>
            <option value="nome">Nome</option>
            <option value="rarita">Rarità</option>
          </select>

          <select name="sortOrder" onChange={handlerStatusChange}>
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
          {path === "/app/shop" && (
            <Input
              type="checkbox"
              id="onSale"
              name="onSale"
              value={"onSale"}
              label="On Sale"
              checked={formData.onSale}
              hidden
              onChange={handlerStatusChange}
            />
          )}
        </div>
      </details>

      <details>
        <summary>Rarità</summary>

        <div className={classFormFilter["details-container"]}>
          <Input
            classOf="input-filter"
            type="checkbox"
            id="comune"
            name="rarita"
            label="Comune"
            value="Comune"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOf="input-filter"
            type="checkbox"
            id="rara"
            name="rarita"
            label="Rara"
            value="Rara"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOfInput="input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="leggendaria"
            name="rarita"
            label="Leggendaria"
            value="Leggendaria"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOfInput="input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="epica"
            name="rarita"
            label="Epica"
            value="Epica"
            onChange={handlerStatusChange}
            hidden
          />
        </div>
      </details>

      <details>
        <summary>Tipo</summary>
        <div className={classFormFilter["details-container"]}>
          <Input
            classOfInput="input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="arma"
            name="categoria"
            label="Arma"
            value="Arma"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOfInput="input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="armatura"
            name="categoria"
            label="Armatura"
            value="Armatura"
            onChange={handlerStatusChange}
            hidden
          />

          <Input
            classOfInput="input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="consumabile"
            name="categoria"
            label="Consumabile"
            value="Consumabile"
            onChange={handlerStatusChange}
            hidden
          />
        </div>
      </details>

      <details>
        <summary>Classe</summary>
        <div className={classFormFilter["details-container"]}>
          <Input
            classOfInput=" input-filter"
            classOfLabel={"label-filter"}
            type="checkbox"
            id="mago"
            name="classe"
            label="Mago"
            value="Mago"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOf=" input-filter"
            type="checkbox"
            id="guerriero"
            name="classe"
            label="Guerriero"
            value="Guerriero"
            onChange={handlerStatusChange}
            hidden
          />
          <Input
            classOf=" input-filter"
            type="checkbox"
            id="assassino"
            name="classe"
            label="Assassino"
            value="Assassino"
            onChange={handlerStatusChange}
            hidden
          />

          <Input
            classOf=" input-filter"
            type="checkbox"
            id="paladino"
            name="classe"
            label="Paladino"
            value="Paladino"
            onChange={handlerStatusChange}
            hidden
          />

          <Input
            classOf=" input-filter"
            type="checkbox"
            id="druido"
            name="classe"
            label="Druido"
            value="Druido"
            onChange={handlerStatusChange}
            hidden
          />

          <Input
            classOf=" input-filter"
            type="checkbox"
            id="cacciatore"
            name="classe"
            label="Cacciatore"
            value="Cacciatore"
            onChange={handlerStatusChange}
            hidden
          />
        </div>
      </details>
      <details className={classFormFilter["fieldset-prezzo"]}>
        <summary>Prezzo</summary>
        <div className={classFormFilter["details-container"]}>
          <Input
            type="range"
            id="prezzoMin"
            name="prezzoMin"
            min="0"
            max="10000"
            step="100"
            onChange={handlerStatusChange}
            value={formData.prezzoMin}
            label={`Prezzo Min: ${formData.prezzoMin} monete`}
          />

          <Input
            type="range"
            id="prezzoMax"
            name="prezzoMax"
            min="0"
            max="10000"
            step="100"
            onChange={handlerStatusChange}
            value={formData.prezzoMax}
            label={`Prezzo Max: ${formData.prezzoMax} monete`}
          />
        </div>
      </details>
    </form>
  );
}
