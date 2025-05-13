import React from 'react';
import PropTypes from 'prop-types';

const CopoItem = ({ copo, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{copo.nome}</td>
      <td>{copo.cor}</td>
      <td>{copo.capacidadeMl}</td>
      <td>{copo.quantidadeEstoque}</td>
      <td>R$ {copo.preco.toFixed(2)}</td>
      <td className="actions-column">
        <button 
          className="edit-btn" 
          onClick={() => onEdit(copo.id)}
        >
          Editar
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(copo.id)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

CopoItem.propTypes = {
  copo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
    capacidadeMl: PropTypes.number.isRequired,
    quantidadeEstoque: PropTypes.number.isRequired,
    preco: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CopoItem;