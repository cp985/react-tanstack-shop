import classFormFilter from "./style/FormFilter.module.css";
import Input from "./Input";
import { useItems } from "../../context/FilteredItemsContext";

export default function FormFilter() {
  const { formData, setFormData } = useItems();

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
      <fieldset>
        <legend>Ordina per</legend>
        <select name="sortBy" onChange={handlerStatusChange}>
          <option value="prezzo">Prezzo</option>
          <option value="nome">Nome</option>
          <option value="rarita">Rarità</option>
        </select>

        <select name="sortOrder" onChange={handlerStatusChange}>
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
        <Input
          type="checkbox"
          id="onSale"
          name="onSale"
          value={"onSale"}
          label="On Sale"
          hidden
          onChange={handlerStatusChange}
        />
      </fieldset>

      <fieldset>
        <legend>Rarità</legend>
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
      </fieldset>

      <fieldset>
        <legend>Tipo</legend>
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
      </fieldset>

      <fieldset>
        <legend>Classe</legend>
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
      </fieldset>
      <fieldset className={classFormFilter["fieldset-prezzo"]}>
        <legend>Prezzo</legend>

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
      </fieldset>
    </form>
  );
}
