import { Link } from "react-router-dom";

import styles from "../styles/PizzariaCard.module.css";

export function PizzariaCard({ pizzaria }) {
  return (
    <div className={styles.pizzariaCard}>
      <Link to={`/pizzaria/${pizzaria.id}`}>
        <img
          src={pizzaria.imagem}
          alt={pizzaria.nome}
          className={styles.img}
        />
      </Link>

      <h2 className={styles.nome}>{pizzaria.nome}</h2>
      <div className={styles.rating}>
        <span className={styles.score}>{pizzaria.mediaGeral.toFixed(1)}</span>
        <span className={styles.scale}>/ 5.0</span>
      </div>
    </div>
  );
}
