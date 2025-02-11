import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { storageService } from '../services/storageService';
import {RatingBar} from '../components/RatingBar';

import style from './PizzariaDetails.module.css';

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
      <div className={style.loadingContainer}>
        <div className={style.load}>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.container}>
        <div className={style.errorMessage}>
          <p className={style.errorText}>{error}</p>
          <button onClick={() => navigate('/')} className={style.backButton}>
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <button onClick={() => navigate(-1)} className={style.goBack}>
        ← Voltar
      </button>

      <div className={style.card}>
        <img src={pizzaria.imagem} alt={pizzaria.nome} className={style.image} />

        <div className={style.content}>
          <div className={style.header}>
            <h1 className={style.title}>{pizzaria.nome}</h1>
            <div className={style.rating}>
              <div className={style.ratingNumber}>{pizzaria.mediaGeral.toFixed(1)}</div>
              <div className={style.ratingText}>Média Geral</div>
            </div>
          </div>

          <p className={style.address}>{pizzaria.endereco}</p>

          <div className={style.grid}>
            <div>
              <h2 className={style.sectionTitle}>Avaliações</h2>
              <div className={style.spaceY}>
                <RatingBar label="Massa" value={pizzaria.avaliacao.massa} />
                <RatingBar label="Recheio" value={pizzaria.avaliacao.recheio} />
                <RatingBar label="Tempero" value={pizzaria.avaliacao.tempero} />
                <RatingBar label="Preço" value={pizzaria.avaliacao.preco} />
              </div>
            </div>

            <div>
              <h2 className={style.sectionTitle}>Informações</h2>
              <div className={style.spaceY}>
                <div>
                  <h3 className={style.subTitle}>Descrição</h3>
                  <p className={style.text}>{pizzaria.descricao}</p>
                </div>

                <div>
                  <h3 className={style.subTitle}>Horário de Funcionamento</h3>
                  <p className={style.text}>{pizzaria.horarioFuncionamento}</p>
                </div>

                <div>
                  <h3 className={style.subTitle}>Contato</h3>
                  <p className={style.text}>{pizzaria.contato}</p>
                </div>

                <div>
                  <h3 className={style.subTitle}>Pontos Fortes</h3>
                  <ul className={style.list}>
                    {pizzaria.pontosFortes.map((ponto, index) => (
                      <li key={index}>{ponto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
