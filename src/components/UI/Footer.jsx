

import classFooter from './style/Footer.module.css'
export default function Footer() {
  return (
    <footer className={classFooter.footer}>
      <section className={classFooter.social}>
        <p>Vieni a trovarci sulle nostre pagine social:</p>
    
          <ul>
            <li className={classFooter.social}>
              <a href="https://www.Facebook.com" target="_blank">E </a>
            </li>
            <li className={classFooter.social} >
              <a href="https://www.X.com" target="_blank">Ô</a>
            </li>
            <li className={classFooter.social}>
              <a href=" https://www.Instagram.com" target="_blank">c</a>
            </li>
          </ul>
      </section>
      <section className={classFooter.contact}>
        <address>
          <p>Indirizzo: Via Del Monte Kilimangiaro, 1 Mnt. Kilimangiaro, 00100 </p>
          <p>Telefono: 06 12345678</p>
          <p>Copyright &copy; 2026</p>
          <p>P.IVA: 123456789</p>
        </address>
      </section>
    </footer>
  );
}
