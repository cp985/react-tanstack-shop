//! pubblicità per ricevere newslwtter e contatti
import classContact from "./style/NewsletterContact.module.css";
import { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
export default function NewsLetterContact() {
  const [isText, setIsText] = useState({ message: "", isSend: false });

  function textOnChange(event) {
    setIsText(event.target.value);
  }

  function sendText() {
    console.log(isText);

    setIsText({ message: "", isSend: true });
 
  }

  return (
    <section className={classContact["newsletter-contact-page"]}>
      <h2>Contatti</h2>
      <article>
        <div className={classContact["newsletter-contact-container"]}>
          <h3>Vienici a trovare </h3>
          <p>Via del Monte Kilimangiaro, 1, 00100 Tanzania</p>
          <p>Tel. +39 06 12345678</p>
          <p>Fax. +39 06 12345679</p>
          <p>Casella postale: 00100, Monte Kilimangiaro</p>
          <p>E-mail: GoldenPixell@inc.com</p>
        </div>
        <div className={classContact["map"]}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d360605.06036164216!2d37.176059521963914!3d-3.051528548147926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1839fc5a396ea805%3A0x8e741c478eea6c01!2sKilimangiaro!5e0!3m2!1sit!2sit!4v1772132636800!5m2!1sit!2sit"
            width="500"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </article>
      <article className={classContact["newsletter-container"]}>
        <h2>Scrivici</h2>
        {!isText.isSend ? (
          <h3>Inviaci una richiesta o una domanda</h3>
        ) : (
          <h3 className={classContact["success"]}>Richiesta inviata con successo</h3>
        )}
        <div className={classContact["textarea-container"]}>
          <Input
            onChange={textOnChange}
            value={isText.message}
            type="textarea"
            rows={7}
            placeholder="Inserisci la tua richiesta"
          />
          <Button disabled={isText.isSend} type="button" onClick={sendText} text="Invia" />
        </div>
      </article>
    </section>
  );
}
