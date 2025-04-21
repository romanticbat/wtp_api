const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/image/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id) || id < 1 || id > 890) {
    return res.status(400).send('Número inválido. Use um valor entre 1 e 890.');
  }

  const imagePath = path.join(__dirname, 'images', `${id}.png`);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Imagem não encontrada.');
  }

  res.sendFile(imagePath);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
