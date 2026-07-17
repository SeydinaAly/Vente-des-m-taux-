import React from 'react';
import './Accueil.css';

function Accueil() {
  return (
    <div className="accueil">
      <div className="hero">
        <h2>Bienvenue chez Vente Métaux</h2>
        <p>Votre fournisseur de confiance pour tous vos besoins en métaux et ferraille</p>
        <button className="btn-primary">Voir nos produits</button>
      </div>

      <div className="features">
        <div className="feature">
          <h3>✨ Qualité Premium</h3>
          <p>Métaux de haute qualité sélectionnés avec soin</p>
        </div>
        <div className="feature">
          <h3>💰 Prix Compétitifs</h3>
          <p>Les meilleurs prix du marché pour tous nos produits</p>
        </div>
        <div className="feature">
          <h3>🚚 Livraison Rapide</h3>
          <p>Livraison rapide et sécurisée partout dans le pays</p>
        </div>
        <div className="feature">
          <h3>📞 Support Client</h3>
          <p>Notre équipe disponible pour répondre à vos questions</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <h3>500+</h3>
          <p>Clients satisfaits</p>
        </div>
        <div className="stat">
          <h3>1000+</h3>
          <p>Commandes livrées</p>
        </div>
        <div className="stat">
          <h3>50+</h3>
          <p>Produits disponibles</p>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
