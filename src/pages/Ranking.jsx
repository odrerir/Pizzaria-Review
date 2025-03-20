import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { storageService } from '../services/storageService';
import {RatingBar} from '../components/RatingBar.jsx';

import styles from "../styles/Ranking.module.css";

export function Ranking() {
  const [pizzarias, setPizzarias] = useState([]);

  useEffect(() => {
    const loadedPizzarias = storageService.getPizzarias();
    // Ordena as pizzarias pela média geral em ordem decrescente
    const pizzariasOrdenadas = [...loadedPizzarias].sort((a, b) => b.mediaGeral - a.mediaGeral);
    setPizzarias(pizzariasOrdenadas);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ranking de Pizzarias</h1>
      <div className={styles.pizzariaList}>
        {pizzarias.map((pizzaria, index) => (
          <div key={pizzaria.id} className={styles.pizzariaCard}>
            <div className="flex items-center gap-4">
              <span className={styles.pizzariaIndex}>{index + 1}º</span>
              <img
                src={pizzaria.imagem}
                alt={pizzaria.nome}
                className={styles.pizzariaImage}
              />
              <div className={styles.pizzariaDetails}>
                <Link
                  to={`/pizzaria/${pizzaria.id}`}
                  className={styles.pizzariaLink}
                >
                  {pizzaria.nome}
                </Link>
                <div className={styles.pizzariaRatings}>
                  <RatingBar label="Massa" value={pizzaria.avaliacao.massa} />
                  <RatingBar label="Recheio" value={pizzaria.avaliacao.recheio} />
                  <RatingBar label="Tempero" value={pizzaria.avaliacao.tempero} />
                  <RatingBar label="Preço" value={pizzaria.avaliacao.preco} />
                </div>
              </div>
              <div className={styles.generalRating}>
                <div className={styles.ratingValue}>
                  {pizzaria.mediaGeral.toFixed(1)}
                </div>
                <div className={styles.ratingLabel}>Média Geral</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
