import { produits } from './data.js'; 
import { ItemsPerPage } from './main.js';

window.addEventListener('DOMContentLoaded', () => {
    const urlParam = new URLSearchParams(window.location.search);
    const productId = urlParam.get('id');
    const pdc = produits.find(p => p.id === Number(productId));
    if (!productId) return
    if (pdc) {
        document.title = `${pdc.nom} | DSK Shop`;
        document.getElementById('product-name').textContent = pdc.nom;
        document.getElementById('product-price').textContent = `${pdc.prix.toFixed(2)} €`;
        document.getElementById('product-cat').textContent = pdc.categorie;
        document.getElementById('product-desc').textContent = pdc.description || "No description available for this premium item.";
        document.getElementById('product-img').src = pdc.image;

        const waBtn = document.getElementById('wa-btn');
        const phoneNumber = "22890000000"; 
        const message = `Hello DSK Shop! I'm interested in the "${pdc.nom}" (${pdc.prix} €). Is it still available for delivery?`;
        waBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    } 
    else {
          console.log("Produit non trouvé avec l'ID:", productId);

    }
});
export let currentPage = 1;
export function setCurrentPage(valeur) {
    currentPage = valeur;
}
export let produitsFiltres=[...produits]
export function setProduitsFiltres(nouveauTableau) {
    produitsFiltres = nouveauTableau;
}


export function showToast() {
    const toast = document.querySelector('#toast');
    toast.classList.remove('translate-x-[150%]'); 
    
    setTimeout(() => {
        toast.classList.add('translate-x-[150%]');
    }, 3000);
}
export let panier = [];

export function ajouterAuPanier(produitId, listeComplete) {
    const produitTrouve = listeComplete.find(p => p.id == produitId);
    const existeDeja = panier.find(item => item.id == produitId);

    if (existeDeja) {
        existeDeja.quantite += 1;
    } else {
        panier.push({ ...produitTrouve, quantite: 1 });
    }
    actualiserVisuelPanier();
    showToast();
}



// carte.js
export function actualiserVisuelPanier() {
    const conteneur = document.querySelector('#cart-content');
    const totalElt = document.querySelector('#cart-total');
    if (!conteneur) return;
    let span=document.getElementById("span")
   span.textContent=panier.reduce((acc,item)=>acc+item.quantite,0)
    if (panier.length === 0) {
        conteneur.innerHTML = ``;
        if (totalElt) totalElt.textContent = "0.00 €";
        return;
    }
    let totalPrix = 0;
    conteneur.innerHTML = panier.map(item => {
        totalPrix += item.prix * item.quantite;
        return `
            <div class="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-xl bg-white">
                <div class="flex-1">
                    <h4 class="text-sm font-bold text-black truncate w-32">${item.nom}</h4>
                    <p class="text-[10px] text-gray-500">${item.quantite} x ${item.prix.toFixed(2)} fcf</p>
                </div>
                <button onclick="supprimerDuPanier('${item.id}')" class="text-gray-300 hover:text-red-500 transition-colors">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
    }).join('');

    if (totalElt) totalElt.textContent = `${totalPrix.toFixed(2)} €`;
        if (window.lucide) lucide.createIcons();
}