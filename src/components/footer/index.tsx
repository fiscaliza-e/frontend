import { Flex } from "antd";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <Flex className={styles.footerContainer}>
      <Flex className={styles.footerAnchorContainer}>
        <a className={styles.navigationLink}>Termos de Uso</a>
        <a className={styles.navigationLink}>FAQ</a>
      </Flex>
      <p className={styles.footerRigthsText}>© 2025 FISCALIZA-e — Todos os direitos reservados.</p>
    </Flex>
  );
}
