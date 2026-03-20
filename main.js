// main.js   
import { produits } from './data.js';
import { showsPrds, ShowsPagination, showREcommande,darkMode ,move,changerPage, numberLenghOfProducts} from './ui.js';
import {  setCurrentPage, setProduitsFiltres ,panier,ajouterAuPanier, actualiserVisuelPanier,} from './carte.js';


window.supprimerDuPanier = (id) => {
    const index = panier.findIndex(item => item.id == id);
    if (index !== -1) {  panier.splice(index, 1);
    }
    actualiserVisuelPanier(); 
};

window.handleAchat = (id) => {
    ajouterAuPanier(id, produits);
    console.log("Contenu du panier :", panier);
    window.ouvrirPanier()
};

window.ouvrirPanier = () => {
    const sideCart = document.getElementById('side-cart');
    if (sideCart) {
        sideCart.classList.remove('translate-x-full');
    }
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
   mainContent.classList.add('blur-sm', 'pointer-events-none');
    }
};
window.fermerPanier = () => {
    const sideCart = document.getElementById('side-cart');
    if (sideCart) {
 sideCart.classList.add('translate-x-full');}
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('blur-sm', 'pointer-events-none');
    }
};

export const ItemsPerPage = 9;
window.move=move
window.changerPage = changerPage;
function filtrerParCategorie(nomCategorie) {
    setCurrentPage(1);
    if (nomCategorie === "All") {
        setProduitsFiltres([...produits]);
    } else {
        setProduitsFiltres(produits.filter(p => p.categorie === nomCategorie));
    }
    showsPrds();
    ShowsPagination();
}
window.filtrerParCategorie = filtrerParCategorie;

window.addEventListener('DOMContentLoaded', () => {
    showsPrds(); 
    ShowsPagination(); 
    showREcommande();
    numberLenghOfProducts()
    darkMode()
});
