import styles from './header-authentication-manager.module.css';

type HeaderAuthenticationManagerProps = {
  authenticated: boolean;
  onClick?: () => void;
};

export default function HeaderAuthenticationManager({authenticated, onClick}: HeaderAuthenticationManagerProps) {
  return (
        authenticated ? 
        <div className={styles.authenticatedUserActions}>
            <button className={styles.viewComplaintButton} onClick={onClick}>Ver minhas solicitações</button> 
            <div className={styles.userIcon}>icon</div>
            </div> : 
        <div className={styles.headerActionsContainer}>
            <button className={styles.signInButton} onClick={onClick}>Cadastrar</button>
            <button className={styles.signUpButton} onClick={onClick}>Entrar</button>
            </div>
    
  );
}