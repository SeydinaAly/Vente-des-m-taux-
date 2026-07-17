import React, { useState } from 'react';
import './Admin.css';

function Admin() {
  const [produits, setProduits] = useState([
    { id: 1, nom: 'Fer Doux', prix: 50, quantite: 100 },
    { id: 2, nom: 'Acier Inoxydable', prix: 120, quantite: 50 },
  ]);

  const [form, setForm] = useState({ nom: '', prix: '', quantite: '' });

  const handleAjouter = (e) => {
    e.preventDefault();
    if (form.nom && form.prix && form.quantite) {
      const newProduit = {
        id: Date.now(),
        nom: form.nom,
        prix: parseFloat(form.prix),
        quantite: parseInt(form.quantite),
      };
      setProduits([...produits, newProduit]);
      setForm({ nom: '', prix: '', quantite: '' });
      alert('Produit ajouté avec succès!');
    }
  };

  const handleSupprimer = (id) => {
    setProduits(produits.filter(p => p.id !== id));
  };

  return (
    <div className="admin">
      <h2>Tableau de bord Admin</h2>
      
      <div className="admin-content">
        <div className="admin-section">
          <h3>Ajouter un nouveau produit</h3>
          <form className="admin-form" onSubmit={handleAjouter}>
            <input
              type="text"
              placeholder="Nom du produit"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Prix (€/kg)"
              value={form.prix}
              onChange={(e) => setForm({ ...form, prix: e.target.value })}
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder="Quantité (kg)"
              value={form.quantite}
              onChange={(e) => setForm({ ...form, quantite: e.target.value })}
              required
            />
            <button type="submit" className="btn-ajouter">Ajouter</button>
          </form>
        </div>

        <div className="admin-section">
          <h3>Gestion des produits</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {produits.map(produit => (
                <tr key={produit.id}>
                  <td>{produit.nom}</td>
                  <td>{produit.prix}€</td>
                  <td>{produit.quantite} kg</td>
                  <td>
                    <button 
                      className="btn-delete"
                      onClick={() => handleSupprimer(produit.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h4>Produits</h4>
            <p className="stat-number">{produits.length}</p>
          </div>
          <div className="stat-card">
            <h4>Stock total</h4>
            <p className="stat-number">{produits.reduce((acc, p) => acc + p.quantite, 0)} kg</p>
          </div>
          <div className="stat-card">
            <h4>Valeur totale</h4>
            <p className="stat-number">{(produits.reduce((acc, p) => acc + (p.prix * p.quantite), 0)).toFixed(0)}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
