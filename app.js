const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Rota para servir a imagem
app.get('/image/:id', (req, res) => {
  const id = req.params.id;

  // Checar se o número está entre 1 e 890
  if (isNaN(id) || id < 1 || id > 890) {
    return res.status(400).send('Número inválido. Use um valor entre 1 e 890.');
  }

  const imagePath = path.join(__dirname, 'images', `${id}.png`);

  // Verifica se o arquivo existe
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Imagem não encontrada.');
  }

  // Envia a imagem
  res.sendFile(imagePath);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
