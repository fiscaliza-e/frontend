import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerAnchorContainer}>
        <a href="">Termos de Uso</a>
        <a href="">FAQ</a>
      </div>
      <p className={styles.footerRigthsText}>© 2025 FISCALIZA-e — Todos os direitos reservados.</p>
    </footer>
  );
}
