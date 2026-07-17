import React, { useState } from 'react';
import './Produits.css';

function Produits({ produits, onAjouter }) {
  const [quantites, setQuantites] = useState({});

  const handleAjouter = (produit) => {
    const quantite = parseInt(quantites[produit.id]) || 1;
    if (quantite > 0) {
      onAjouter(produit, quantite);
      setQuantites({ ...quantites, [produit.id]: '' });
      alert(`${produit.nom} ajouté au panier!`);
    }
  };

  return (
    <div className="produits">
      <h2>Nos Produits</h2>
      <div className="produits-grid">
        {produits.map(produit => (
          <div key={produit.id} className="produit-card">
            <div className="produit-header">
              <h3>{produit.nom}</h3>
              <span className="prix">{produit.prix}€/kg</span>
            </div>
            <p className="description">{produit.description}</p>
            <div className="stock">
              <small>Stock: {produit.quantite} kg</small>
            </div>
            <div className="produit-actions">
              <input
                type="number"
                min="1"
                placeholder="Quantité"
                value={quantites[produit.id] || ''}
                onChange={(e) => setQuantites({ ...quantites, [produit.id]: e.target.value })}
                className="input-quantite"
              />
              <button 
                className="btn-ajouter"
                onClick={() => handleAjouter(produit)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produits;
