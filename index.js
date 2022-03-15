import express from 'express';
import { promises as fs } from 'fs';

import PedidoRouter from './routes/pedidos.routes.js';

const { readFile, writeFile } = fs;

global.fileName = 'pedidos.json';

const app = express();
app.use(express.json());
app.use('/pedido', PedidoRouter);

app.listen(3002, async () => {
  try {
    await readFile('pedidos.json');
    console.log('API Started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      pedidos: [],
    };
    writeFile('pedidos.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API Started and File Created.');
      })
      .catch(err => {
        console.log(err);
      });
  }
});
