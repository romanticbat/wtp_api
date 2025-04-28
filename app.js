const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para pegar a imagem
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Começa o sistema de auto-ping quando o servidor iniciar
  const url = 'https://wtp-api.onrender.com'; // Sua URL
  const interval = 5 * 60 * 1000; // 5 minutos

  function ping() {
    https.get(url, (res) => {
      const now = new Date().toLocaleString('pt-BR');
      console.log(`[${now}] Ping enviado! Status code: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error('Erro ao enviar ping:', err.message);
    });
  }

  ping(); // Faz o primeiro ping na hora
  setInterval(ping, interval); // Depois pinga a cada 5 minutos
});
