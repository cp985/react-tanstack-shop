import { Form } from "react-router-dom";
import classFormFilter from "./style/FormFilter.module.css";
import Input from "./Input";
import Button from "./Button";

export default function FormFilter() {





  return (
    <Form className={classFormFilter["form-filter"]} method="get" action="/">
        <fieldset>
          <legend>Rarità</legend>
          <Input
            classOf="input-filter"
            type="checkbox"
            id="comune"
            name="rarità"
            label="Comune"
            value="comuune"
            hidden
          />
          <Input
            classOf="input-filter"
            type="checkbox"
            id="rara"
            name="rarità"
            label="Raro"
            value="raro"
            hidden
          />
          <Input
            classOfInput="input-filter"
            classOfLabel={'label-filter'}
            type="checkbox"
            id="epica"
            name="rarità"
            label="Epico"
            value="epica"
            hidden
          />
        </fieldset>
   
      <fieldset>
        <legend>Classe</legend>
        <Input
          classOfInput=" input-filter"
          classOfLabel={'label-filter'}
          type="checkbox"
          id="mago"
          name="classe"
          label="Mago"
          hidden
        />
        <Input
          classOf=" input-filter"
          type="checkbox"
          id="guerriero"
          name="classe"
          label="Guerriero"
          hidden
        />
        <Input
          classOf=" input-filter"
          type="checkbox"
          id="assassino"
          name="classe"
          label="Assassino"
          hidden
        />
      </fieldset>
      <fieldset>
     <legend>Prezzo</legend>
        <Input
          classOf=" input-filter"
          type="number"
          id="prezzo-min"
          name="prezzo-min"
          label="Prezzo Min."
    
        />
        <Input
          classOf=" input-filter"
          type="number"
          id="prezzo-max"
          name="prezzo-max"
          label="Prezzo Max."
        
        />
      </fieldset>
    </Form>
  );
}
