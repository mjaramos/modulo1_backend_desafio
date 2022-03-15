import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function getPedidos() {
  const data = JSON.parse(await readFile(global.fileName));
  return data.pedidos;
}

async function getPedidoById(id) {
  const pedidos = await getPedidos();
  const pedido = pedidos.find(pedido => pedido.id === parseInt(id));

  if (pedido) {
    return pedido;
  } else {
    throw new Error('Registro não encontrado.');
  }
}

async function getOrdenacao() {
  const pedidos = await getPedidos();

  try {
    let novosPedidos = pedidos
      .sort((a, b) => {
        if (a.produto > b.produto) {
          return 1;
        } else if (a.produto < b.produto) {
          return -1;
        } else {
          return 0;
        }
      })
      .filter(p => p.entregue);

    let qtd = 0;
    let produto = '';
    let resultado = '';
    let novoDado = [];
    let qtdLista = novosPedidos.length;
    let i = 0;

    for (let p of novosPedidos) {
      if (produto === '' || p.produto === produto) {
        qtd++;
        if (produto === '') {
          produto = p.produto;
        }
        if (qtdLista === i + 1) {
          resultado = {
            produto: produto,
            qtd: qtd,
          };
          novoDado.push(resultado);
        }
      } else {
        resultado = {
          produto: produto,
          qtd: qtd,
        };
        novoDado.push(resultado);
        produto = p.produto;
        qtd = 1;
        if (qtdLista === i + 1) {
          resultado = {
            produto: produto,
            qtd: qtd,
          };
          novoDado.push(resultado);
        }
      }
      i++;
    }

    novoDado.sort((a, b) => {
      if (a.qtd < b.qtd) {
        return 1;
      } else if (a.qtd > b.qtd) {
        return -1;
      } else {
        return 0;
      }
    });

    return novoDado;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getValorTotalByCliente(cliente) {
  const pedidos = await getPedidos();

  const pedidosByClienteEntregues = pedidos.filter(
    pedido => pedido.cliente === cliente.nome && pedido.entregue === true
  );

  let valor = 0;
  for (let ped of pedidosByClienteEntregues) {
    valor += ped.valor;
  }
  let retorno = {
    valor: valor,
  };

  return retorno;
}

async function getValorTotalByProduto(produto) {
  const pedidos = await getPedidos();

  const pedidosByProdutoEntregues = pedidos.filter(
    pedido => pedido.produto === produto.nome && pedido.entregue === true
  );

  let valor = 0;
  for (let ped of pedidosByProdutoEntregues) {
    valor += ped.valor;
  }

  let retorno = {
    valor: valor,
  };

  return retorno;
}

async function insertPedido(pedido) {
  const data = JSON.parse(await readFile(global.fileName));

  pedido = {
    id: data.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: new Date(),
  };
  data.pedidos.push(pedido);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return pedido;
}

async function updatePedido(pedido) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.pedidos.findIndex(a => a.id === pedido.id);

  if (index === -1) {
    throw new Error('Registro não encontrado');
  }

  data.pedidos[index].cliente = pedido.cliente;
  data.pedidos[index].produto = pedido.produto;
  data.pedidos[index].valor = pedido.valor;
  data.pedidos[index].entregue = pedido.entregue;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data.pedidos[index];
}

async function deletePedido(id) {
  const data = JSON.parse(await readFile(global.fileName));

  data.pedidos = data.pedidos.filter(pedido => pedido.id !== parseInt(id));

  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

export default {
  insertPedido,
  updatePedido,
  getPedidos,
  getPedidoById,
  deletePedido,
  getValorTotalByCliente,
  getValorTotalByProduto,
  getOrdenacao,
};
