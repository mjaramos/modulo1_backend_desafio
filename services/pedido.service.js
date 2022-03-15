import PedidoRepository from '../repositories/pedido.repository.js';

async function getPedidos() {
  return await PedidoRepository.getPedidos();
}

async function getPedidoById(id) {
  return await PedidoRepository.getPedidoById(id);
}

async function createPedido(pedido) {
  return await PedidoRepository.insertPedido(pedido);
}

async function updatePedido(pedido) {
  return await PedidoRepository.updatePedido(pedido);
}

async function updateEntrega(pedido) {
  const ped = await PedidoRepository.getPedidoById(pedido.id);
  ped.entregue = pedido.entregue;

  return await PedidoRepository.updatePedido(ped);
}

async function deletePedido(id) {
  await PedidoRepository.deletePedido(id);
}

async function getValorTotalByCliente(cliente) {
  return await PedidoRepository.getValorTotalByCliente(cliente);
}

async function getValorTotalByProduto(produto) {
  return await PedidoRepository.getValorTotalByProduto(produto);
}

async function getOrdenacao() {
  return await PedidoRepository.getOrdenacao();
}

export default {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  updateEntrega,
  deletePedido,
  getValorTotalByCliente,
  getValorTotalByProduto,
  getOrdenacao,
};
