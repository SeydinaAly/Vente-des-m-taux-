import React, { useState } from 'react';
import axios from 'axios';
import './Panier.css';

function Panier({ items, onSupprimer }) {
  const [client, setClient] = useState({ nom: '', email: '', phone: '' });
  const [commande, setCommande] = useState(null);

  const total = items.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

  const handleCommande = async (e) => {
    e.preventDefault();
    if (!client.nom || !client.email || !client.phone) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post('/api/commandes', { produits: items, client });
      setCommande(response.data.commande);
      alert('Commande créée avec succès!');
    } catch (error) {
      alert('Erreur lors de la création de la commande');
    }
  };

  if (items.length === 0) {
    return (
      <div className="panier">
        <h2>Votre Panier</h2>
        <p className="panier-vide">Votre panier est vide 🛒</p>
      </div>
    );
  }

  return (
    <div className="panier">
      <h2>Votre Panier</h2>
      
      <div className="panier-content">
        <div className="panier-items">
          <table className="panier-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix/kg</th>
                <th>Quantité</th>
                <th>Sous-total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>{item.prix}€</td>
                  <td>{item.quantite} kg</td>
                  <td>{(item.prix * item.quantite).toFixed(2)}€</td>
                  <td>
                    <button 
                      className="btn-supprimer"
                      onClick={() => onSupprimer(item.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panier-sidebar">
          <div className="resume">
            <h3>Résumé de la commande</h3>
            <div className="resume-line">
              <span>Sous-total:</span>
              <span>{total.toFixed(2)}€</span>
            </div>
            <div className="resume-line">
              <span>Frais de livraison:</span>
              <span>50€</span>
            </div>
            <div className="resume-line total">
              <span>Total:</span>
              <span>{(total + 50).toFixed(2)}€</span>
            </div>
          </div>

          <form className="form-client" onSubmit={handleCommande}>
            <h3>Informations de livraison</h3>
            <input
              type="text"
              placeholder="Votre nom"
              value={client.nom}
              onChange={(e) => setClient({ ...client, nom: e.target.value })}
            />
            <input
              type="email"
              placeholder="Votre email"
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Votre téléphone"
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
            />
            <button type="submit" className="btn-commander">
              Passer la commande
            </button>
          </form>
        </div>
      </div>

      {commande && (
        <div className="commande-success">
          <h3>✅ Commande créée!</h3>
          <p>N° de commande: {commande.id}</p>
          <p>Total: {commande.total}€</p>
        </div>
      )}
    </div>
  );
}

export default Panier;
