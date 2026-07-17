import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Accueil from './pages/Accueil';
import Produits from './pages/Produits';
import Panier from './pages/Panier';
import Admin from './pages/Admin';

function App() {
  const [page, setPage] = useState('accueil');
  const [panier, setPanier] = useState([]);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // Charger les produits au démarrage
    axios.get('/api/produits')
      .then(res => setProduits(res.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  const ajouterAuPanier = (produit, quantite) => {
    const existant = panier.find(p => p.id === produit.id);
    if (existant) {
      existant.quantite += quantite;
    } else {
      setPanier([...panier, { ...produit, quantite }]);
    }
  };

  const supprimerDuPanier = (id) => {
    setPanier(panier.filter(p => p.id !== id));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🏭 Vente Métaux</h1>
        <nav>
          <button onClick={() => setPage('accueil')} className={page === 'accueil' ? 'active' : ''}>
            Accueil
          </button>
          <button onClick={() => setPage('produits')} className={page === 'produits' ? 'active' : ''}>
            Produits
          </button>
          <button onClick={() => setPage('panier')} className={page === 'panier' ? 'active' : ''}>
            🛒 Panier ({panier.length})
          </button>
          <button onClick={() => setPage('admin')} className={page === 'admin' ? 'active' : ''}>
            Admin
          </button>
        </nav>
      </header>

      <main className="main">
        {page === 'accueil' && <Accueil />}
        {page === 'produits' && <Produits produits={produits} onAjouter={ajouterAuPanier} />}
        {page === 'panier' && <Panier items={panier} onSupprimer={supprimerDuPanier} />}
        {page === 'admin' && <Admin />}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Vente Métaux - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
