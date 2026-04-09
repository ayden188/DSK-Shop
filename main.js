// main.js   
import { produits } from './data.js';
import { showsPrds, ShowsPagination, showREcommande,darkMode ,move,changerPage, numberLenghOfProducts,InitCarroussel,initCategoryMenu,showAutoHero} from './ui.js';
import {  setCurrentPage, setProduitsFiltres ,panier,ajouterAuPanier, actualiserVisuelPanier,} from './carte.js';

window.addEventListener('DOMContentLoaded', () => {
    setProduitsFiltres([...produits]);
    loadFiltersFromURL();
    InitCarroussel()
    showsPrds(); 
    ShowsPagination(); 
    showREcommande();
    numberLenghOfProducts()
    initCategoryMenu()
    showAutoHero()
});



window.supprimerDuPanier = (id) => {
    const index = panier.findIndex(item => item.id == id);
    if (index !== -1) {  panier.splice(index, 1);
    }
    actualiserVisuelPanier(); 
};
window.ajouterAuPanier=ajouterAuPanier

window.handleAchat = (id) => {
    ajouterAuPanier(id);
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
window.filtrerParCategorie = function(nomCategorie) {
    applyFilters(nomCategorie, '');
};
window.filtrerParCategorie = filtrerParCategorie;

function applyFilters(categorie = 'All', query = '') {
    setCurrentPage(1);
    let filtered = [...produits];
    if (categorie !== 'All') {
        filtered = filtered.filter(p => p.categorie === categorie);
    }
    if (query) {
        filtered = filtered.filter(p => p.nom.toLowerCase().includes(query.toLowerCase()) || p.categorie.toLowerCase().includes(query.toLowerCase()));
    }
    setProduitsFiltres(filtered);
    showsPrds();
    ShowsPagination();
    showREcommande();



    const url = new URL(window.location);
    if (categorie !== 'All') url.searchParams.set('category', categorie);
    else url.searchParams.delete('category');
    if (query) url.searchParams.set('search', query);
    else url.searchParams.delete('search');
    window.history.pushState({}, '', url);
}

function loadFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const categorie = urlParams.get('category') || 'All';
    const query = urlParams.get('search') || '';
    applyFilters(categorie, query);
}

window.searchProducts = () => {
    const query = document.querySelector('input[placeholder*="Search"]').value.toLowerCase();
    const currentCategory = new URLSearchParams(window.location.search).get('category') || 'All';
    applyFilters(currentCategory, query);
};


window.addEventListener('popstate', () => {
    loadFiltersFromURL();
});
