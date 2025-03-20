import { Link } from "react-router-dom";

import styles from "../styles/NavBar.module.css";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/ranking" className={styles.navLink}>Ranking</Link>
        </div>
        <Link to="/admin" className={styles.addButton}>
          Adicionar Pizzaria
        </Link>
      </div>
    </nav>
  );
}
