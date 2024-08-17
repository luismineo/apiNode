const express = require('express');
const axios =  require('axios');

const app = express();
const port = 3001;

const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

app.get('/', (_, res) => {
    res.send('Hello world!');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep;

    let valid = cepRegex.test(cep);
    
    try {
        if(valid){
            const response =  await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data); 
        } else {
            res.status(400).send('CEP inválido');
        }
    } catch {
        console.error('Erro ao fazer requisição:', error);
        res.status(500).send('Erro ao consultar o CEP');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});
