import Button from "./Button";

import classFooter from './style/Footer.module.css'
export default function Footer() {
  return (
    <footer className={classFooter.footer}>
      <section>
        <p>Vieni a trovarci</p>
    
          <ul>
            <li>
              <a href="https://www.Facebook.com" target="_blank">Facebook</a>
            </li>
            <li>
              <a href="https://www.X.com" target="_blank">X</a>
            </li>
            <li>
              <a href=" https://www.Instagram.com" target="_blank">Instagram</a>
            </li>
          </ul>
      </section>
      <section>
        <address>
          <p>Indirizzo: Via Roma, 1, 00100 Roma</p>
          <p>Telefono: 06 12345678</p>
          <p>Copyright &copy; 2026</p>
          <p>P.IVA: 123456789</p>
        </address>
      </section>
    </footer>
  );
}
