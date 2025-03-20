import { useState, useEffect } from 'react';

import {PizzariaCard} from '../components/PizzariaCard';
import { storageService } from '../services/storageService';

import styles from "../styles/Home.module.css";

export function Home() {
  const [pizzarias, setPizzarias] = useState([]);

  useEffect(() => {
    // Carrega as pizzarias do localStorage
    const loadedPizzarias = storageService.getPizzarias();
    setPizzarias(loadedPizzarias);
  }, []);

  return (
    <div>
      <header>
        <h1 className={styles.titulo}>Pizzarias</h1>
      </header>
      <div className={styles.pizzarias}>
        {pizzarias.map(pizzaria => (
          <PizzariaCard
            key={pizzaria.id}
            pizzaria={pizzaria} />
        ))}
      </div>
    </div>
  );
}
