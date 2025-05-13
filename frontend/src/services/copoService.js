import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const CopoService = {
  getAll: () => api.get('/copos'),
  getById: (id) => api.get(`/copos/${id}`),
  create: (copo) => api.post('/copos', copo),
  update: (id, copo) => api.put(`/copos/${id}`, copo),
  delete: (id) => api.delete(`/copos/${id}`),
  adicionarEstoque: (id, quantidade) => api.patch(`/copos/${id}/adicionar-estoque`, null, { params: { quantidade } }),
  removerEstoque: (id, quantidade) => api.patch(`/copos/${id}/remover-estoque`, null, { params: { quantidade } }),
  buscarPorCor: (cor) => api.get('/copos/por-cor', { params: { cor } }),
  buscarComEstoqueBaixo: (limite = 10) => api.get('/copos/estoque-baixo', { params: { limite } })
};

export default CopoService;