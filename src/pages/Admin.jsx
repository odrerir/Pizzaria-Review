import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PizzariaService } from '../services/PizzariaService';
import styles from '../styles/Admin.module.css';

export function Admin() {
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    imagem: null,
    descricao: '',
    horarioDeFuncionamento: '',
    contato: '',
    pontosFortes: '',
    avaliacao: { massa: '', recheio: '', tempero: '', preco: '' },
    aplicativo: { ifood: false, rappi: false, uberEats: false, aiqFome: false, outro: false, nenhum: false }
  });

  // Estado para armazenar mensagens de erro
  const [errors, setErrors] = useState({});

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file' && files.length > 0) {
      // Atualiza a imagem no formData
      setFormData(prev => ({
        ...prev,
        imagem: files[0]
      }));
    } else if (type === 'checkbox') {
      // Atualiza os aplicativos de entrega
      const [parent, field] = name.split('.');
      if (parent === 'aplicativo') {
        setFormData(prev => ({
          ...prev,
          aplicativo: { ...prev.aplicativo, [field]: checked }
        }));
      }
      setFormData(prev => ({
        ...prev,
        aplicativo: { ...prev.aplicativo, [field]: checked }
      }));
    } else if (name.startsWith('avaliacao.')) {
      // Atualiza as notas de avaliação
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        avaliacao: { ...prev.avaliacao, [field]: value }
      }));
    } else {
      // Atualiza os campos gerais
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Validação do formulário antes do envio
  const validateForm = () => {
    let formErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Valida os campos aninhados (avaliacao e aplicativo)
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (key === 'avaliacao' && (subValue === '' || subValue < 0 || subValue > 5)) {
            formErrors[`${key}.${subKey}`] = 'A nota deve ser entre 0 e 5';
          }
        });
      } else if (key !== 'imagem' && !value) {
        formErrors[key] = 'Campo obrigatório';
      }
    });

    if (!formData.imagem) {
      formErrors.imagem = 'Imagem é obrigatória';
    }

    return formErrors;
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    // Se houver erros, exibe-os e impede o envio
    if (Object.keys(formErrors).length) return setErrors(formErrors);

    // Criação do objeto FormData para envio dos dados
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value) && key !== 'imagem') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          data.append(`${key}.${subKey}`, subValue);
        });
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await PizzariaService.adicionarPizzaria(data);
      alert(response.success ? 'Pizzaria adicionada com sucesso!' : `Erro: ${response.error}`);

      // Se a pizzaria foi adicionada com sucesso, redireciona para a página inicial
      if (response.success) navigate('/');
    } catch (error) {
      alert(`Erro ao enviar os dados: ${error.message}`);
    }
  };

  return (
      <div className={styles.form}>
        <h1 className={styles.formHeader}>Adicionar Pizzaria</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer} encType="multipart/form-data">

          {/* Campo de Imagem */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Imagem</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleChange}
              className={styles.inputFile}
            />
            {errors.imagem && <span className={styles.error}>{errors.imagem}</span>}
          </div>

          {/* Campos de Texto */}
          <div className={styles.formGroup}>
            {Object.keys(formData)
              .filter(key => key !== 'imagem' && typeof formData[key] !== 'object')
              .map(key => (
                <div key={key} className={styles.formGroup}>
                  <label className={styles.label}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors[key] && <span className={styles.error}>{errors[key]}</span>}
                </div>
              ))
            }
          </div>

          {/* Campo de Aplicativos */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Aplicativos</label>
            <div className={styles.aplicativoGroup}>
              {Object.keys(formData.aplicativo).map(field => (
                <div key={field} className={styles.formGroup}>
                  <label className={styles.label}>
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type="checkbox"
                    name={`aplicativo.${field}`}
                    checked={formData.aplicativo[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Campos de Avaliação */}
          <div className={styles.FormData}>
            {Object.keys(formData.avaliacao).map(field => (
              <div key={field} className={styles.formGroup}>
                <label className={styles.label}>Nota do {field} (0-5)</label>
                <input
                  type="number"
                  name={`avaliacao.${field}`}
                  value={formData.avaliacao[field]}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className={styles.input}
                />
                {errors[`avaliacao.${field}`] && <span className={styles.error}>{errors[`avaliacao.${field}`]}</span>}
              </div>
            ))}
          </div>

          {/* Botão de Envio */}
          <button type="submit" className={styles.submitBtn}>Adicionar Pizzaria</button>
        </form>
      </div>
  );
}
