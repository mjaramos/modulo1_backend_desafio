import PedidoService from '../services/pedido.service.js';

async function getPedidos(req, res) {
  try {
    res.send(await PedidoService.getPedidos());
  } catch (error) {}
}

async function getOrdenacao(req, res) {
  try {
    res.send(await PedidoService.getOrdenacao());
  } catch (error) {}
}

async function getPedidoById(req, res) {
  try {
    res.send(await PedidoService.getPedidoById(req.params.id));
  } catch (error) {}
}

async function createPedido(req, res) {
  try {
    let pedido = req.body;

    if (!pedido.cliente || !pedido.produto || !pedido.valor) {
      throw new Error('Cliente, Produto e valor são obrigatórios');
    }

    pedido = await PedidoService.createPedido(pedido);

    res.send(pedido);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getValorTotalByCliente(req, res) {
  try {
    const cliente = req.body;
    res.send(await PedidoService.getValorTotalByCliente(cliente));
  } catch (error) {}
}

async function getValorTotalByProduto(req, res) {
  try {
    const produto = req.body;
    res.send(await PedidoService.getValorTotalByProduto(produto));
  } catch (error) {}
}

async function updatePedido(req, res) {
  try {
    const pedido = req.body;

    if (!pedido.cliente || !pedido.produto || !pedido.valor) {
      throw new Error('Cliente, Produto e valor são obrigatórios');
    }

    res.send(await PedidoService.updatePedido(pedido));
  } catch (err) {}
}

async function updateEntrega(req, res) {
  try {
    const pedido = req.body;

    if (!pedido.id || !pedido.entrega == null) {
      throw new Error('Id e entrega são obrigatórios');
    }

    res.send(await PedidoService.updateEntrega(pedido));
  } catch (error) {}
}

async function deletePedido(req, res) {
  try {
    await PedidoService.deletePedido(req.params.id);

    res.end();
  } catch (error) {}

  res.send(pedido);
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
