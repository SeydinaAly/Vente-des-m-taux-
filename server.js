const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du client
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes API
app.get('/api/produits', (req, res) => {
  const produits = [
    { id: 1, nom: 'Fer Doux', prix: 50, quantite: 100, description: 'Fer de qualité supérieure' },
    { id: 2, nom: 'Acier Inoxydable', prix: 120, quantite: 50, description: 'Acier résistant à la corrosion' },
    { id: 3, nom: 'Cuivre', prix: 200, quantite: 30, description: 'Cuivre pur 99%' },
    { id: 4, nom: 'Aluminium', prix: 80, quantite: 75, description: 'Aluminium recyclé' },
    { id: 5, nom: 'Laiton', prix: 150, quantite: 40, description: 'Alliage cuivre-zinc' },
  ];
  res.json(produits);
});

// Route pour les commandes (placeholder)
app.post('/api/commandes', (req, res) => {
  const { produits, client } = req.body;
  const commande = {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date(),
    produits,
    client,
    total: produits.reduce((acc, p) => acc + (p.prix * p.quantite), 0),
    statut: 'en attente'
  };
  res.json({ success: true, commande });
});

// Servir le client React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
