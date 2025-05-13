import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CopoService from '../services/copoService';
import './CopoForm.css';

const CopoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cor: '',
    capacidadeMl: '',
    quantidadeEstoque: '',
    preco: ''
  });
  const [estoqueQuantidade, setEstoqueQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCopo = async () => {
        setLoading(true);
        try {
          const response = await CopoService.getById(id);
          setFormData(response.data);
        } catch (err) {
          setError('Erro ao carregar copo');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCopo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await CopoService.update(id, formData);
      } else {
        await CopoService.create(formData);
      }
      navigate('/');
    } catch (err) {
      setError('Erro ao salvar copo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarEstoque = async () => {
    try {
      if (!id) {
        setError('ID do copo não definido para ajuste de estoque.');
        return;
      }
      await CopoService.adicionarEstoque(id, estoqueQuantidade);
      const updated = await CopoService.getById(id);
      setFormData(updated.data);
    } catch (err) {
      setError('Erro ao adicionar estoque');
      console.error(err);
    }
  };

  const handleRemoverEstoque = async () => {
    try {
      if (!id) {
        setError('ID do copo não definido para ajuste de estoque.');
        return;
      }
      await CopoService.removerEstoque(id, estoqueQuantidade);
      const updated = await CopoService.getById(id);
      setFormData(updated.data);
    } catch (err) {
      setError('Erro ao remover estoque');
      console.error(err);
    }
  };

  if (loading && id) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Copo' : 'Novo Copo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cor:</label>
          <input
            type="text"
            name="cor"
            value={formData.cor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Capacidade (ml):</label>
          <input
            type="number"
            name="capacidadeMl"
            value={formData.capacidadeMl}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantidade em Estoque:</label>
          <input
            type="number"
            name="quantidadeEstoque"
            value={formData.quantidadeEstoque}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Preço (R$):</label>
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>

        {id && (
          <>
            <div className="form-group">
              <label>Quantidade para ajuste de estoque:</label>
              <input
                type="number"
                value={estoqueQuantidade}
                onChange={(e) => setEstoqueQuantidade(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className="estoque-actions">
              <button type="button" onClick={handleAdicionarEstoque}>
                Adicionar item
              </button>
              <button type="button" onClick={handleRemoverEstoque}>
                Remover do Estoque
              </button>
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : (id ? 'Atualizar' : 'Cadastrar')}
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CopoForm;
