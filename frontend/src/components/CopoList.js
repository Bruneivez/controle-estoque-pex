import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CopoService from '../services/copoService';
import CopoItem from './CopoItem';
import './CopoList.css';

const CopoList = () => {
  const [copos, setCopos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCopos = async () => {
    setLoading(true);
    try {
      const response = await CopoService.getAll();
      setCopos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar copos. Tente recarregar a página.');
      console.error('Erro ao buscar copos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCopos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await CopoService.delete(id);
      setCopos(copos.filter(copo => copo.id !== id));
    } catch (err) {
      console.error('Erro ao deletar copo:', err);
      setError('Erro ao excluir copo');
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleStockUpdate = () => {
    fetchCopos();
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="copo-list-container">
      <div className="header">
        <h2>Lista de itens</h2>
        <button onClick={() => navigate('/novo')} className="add-button">
          Adicionar item
        </button>
      </div>

      {copos.length === 0 ? (
        <p className="no-items">Nenhum copo cadastrado</p>
      ) : (
        <table className="copo-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cor</th>
              <th>Capacidade (ml)</th>
              <th>Estoque</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {copos.map(copo => (
              <CopoItem 
                key={copo.id} 
                copo={copo} 
                onDelete={handleDelete}
                onEdit={handleEdit}
                onStockUpdate={handleStockUpdate}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CopoList;
