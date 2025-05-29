import {useState} from 'react';

import HeaderAuthenticationManager from "../header-authentication-manager";

import styles from './header.module.css';

export default function Header() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setAuthenticated(authenticated => !authenticated);
  }

  return <header className={styles.headerContainer}>
    <h1 className={styles.Logo}>FISCALIZA-e</h1>
    <HeaderAuthenticationManager authenticated={authenticated} onClick={handleAuthentication}/>
  </header>
}
