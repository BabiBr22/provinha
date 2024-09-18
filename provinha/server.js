import express from 'express';

const app = express();

// Dados das cervejas
const cervejas = [
  { id: 1, nome: 'Heineken', abv: 4.5, tipo: 'Lager', nacionalidade: 'Holanda' },
  { id: 2, nome: 'Corona', abv: 5.2, tipo: 'Pielsen', nacionalidade: 'México' },
  { id: 3, nome: 'Patagônia', abv: 4.2, tipo: 'Amber Ale', nacionalidade: 'Argentina' },
  { id: 4, nome: 'Saint’Beer', abv: 3.5, tipo: 'IPA', nacionalidade: 'Brasil' },
  { id: 5, nome: 'Duff Beer', abv: 3.5, tipo: 'Pielsen', nacionalidade: 'EUA' },
  { id: 6, nome: 'Coruja', abv: 3.5, tipo: 'Lager', nacionalidade: 'Brasil' },
  { id: 7, nome: 'Brugse Zot', abv: 6.2, tipo: 'IPA', nacionalidade: 'Bélgica' }
];

// Middleware para permitir JSON no express
app.use(express.json());

// A. Buscar cerveja pelo nome
app.get('/cervejas/nome/:nome', (req, res) => {
  const { nome } = req.params;
  const cerveja = cervejas.find(c => c.nome.toLowerCase() === nome.toLowerCase());
  if (cerveja) {
    res.status(200).json(cerveja);
  } else {
    res.status(404).json({ mensagem: 'Cerveja não encontrada' });
  }
});

// B. Buscar cervejas pela nacionalidade
app.get('/cervejas/nacionalidade/:nacionalidade', (req, res) => {
  const { nacionalidade } = req.params;
  const cervejasPorNacionalidade = cervejas.filter(c => c.nacionalidade.toLowerCase() === nacionalidade.toLowerCase());
  res.status(200).json(cervejasPorNacionalidade);
});

// C. Ordenar cervejas pelo maior ABV (teor alcoólico)
app.get('/cervejas/ordenar/abv', (req, res) => {
  const cervejasOrdenadas = [...cervejas].sort((a, b) => b.abv - a.abv);
  res.status(200).json(cervejasOrdenadas);
});

// D. Buscar cervejas pelo tipo
app.get('/cervejas/tipo/:tipo', (req, res) => {
  const { tipo } = req.params;
  const cervejasPorTipo = cervejas.filter(c => c.tipo.toLowerCase() === tipo.toLowerCase());
  res.status(200).json(cervejasPorTipo);
});

// E. Buscar cervejas pelo nome parcial (ex: "Co" retorna Corona e Coruja)
app.get('/cervejas/pesquisar/:nomeParcial', (req, res) => {
  const { nomeParcial } = req.params;
  const cervejasPorNomeParcial = cervejas.filter(c => c.nome.toLowerCase().includes(nomeParcial.toLowerCase()));
  res.status(200).json(cervejasPorNomeParcial);
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
