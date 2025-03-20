import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { storageService } from '../services/storageService';
import { RatingBar } from '../components/RatingBar';

import styles from "../styles/PizzariaDetails.module.css";

export function PizzariaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizzaria, setPizzaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const found = storageService.getPizzariaById(Number(id));
      if (found) {
        setPizzaria(found);
      } else {
        setError('Pizzaria não encontrada');
      }
    } catch (err) {
      setError('Erro ao carregar os dados da pizzaria');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.load}>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={() => navigate('/')} className={styles.backButton}>
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.goBack}>
        ← Voltar
      </button>

      <div className={styles.card}>
        <img src={pizzaria.imagem} alt={pizzaria.nome} className={styles.image} />

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{pizzaria.nome}</h1>
            <div className={styles.rating}>
              <div className={styles.ratingNumber}>{pizzaria.mediaGeral.toFixed(1)}</div>
              <div className={styles.ratingText}>Média Geral</div>
            </div>
          </div>

          <p className={styles.address}>{pizzaria.endereco}</p>

          <div className={styles.grid}>
            <div>
              <h2 className={styles.sectionTitle}>Avaliações</h2>
              <div className={styles.spaceY}>
                <RatingBar label="Massa" value={pizzaria.avaliacao.massa} />
                <RatingBar label="Recheio" value={pizzaria.avaliacao.recheio} />
                <RatingBar label="Tempero" value={pizzaria.avaliacao.tempero} />
                <RatingBar label="Preço" value={pizzaria.avaliacao.preco} />
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Informações</h2>
              <div className={styles.spaceY}>
                <div>
                  <h3 className={styles.subTitle}>Descrição</h3>
                  <p className={styles.text}>{pizzaria.descricao}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Horário de Funcionamento</h3>
                  <p className={styles.text}>{pizzaria.horarioFuncionamento}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Contato</h3>
                  <p className={styles.text}>{pizzaria.contato}</p>
                </div>

                <div>
                  <h3 className={styles.subTitle}>Pontos Fortes</h3>
                  <ul className={styles.list}>
                    {pizzaria.pontosFortes.map((ponto, index) => (
                      <li key={index}>{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Nova seção de aplicativos de delivery */}
          {pizzaria.aplicativo && (
            <div className={styles.aplicativoGroup}>
              <h2 className={styles.sectionTitle}>Disponível em</h2>
              <ul>
                {pizzaria.aplicativo.ifood && <li>iFood</li>}
                {pizzaria.aplicativo.rappi && <li>Rappi</li>}
                {pizzaria.aplicativo.uberEats && <li>Uber Eats</li>}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
