import { produits } from './data.js';

window.addEventListener('DOMContentLoaded', () => {
    const urlParam = new URLSearchParams(window.location.search);
    const productId = urlParam.get('id');
    const pdc = produits.find(p => p.id === Number(productId));
    if (!productId) return
    if (pdc) {
        document.title = `${pdc.nom} | DSK Shop`;
        document.getElementById('product-name').textContent = pdc.nom;
        document.getElementById('product-price').textContent = `${pdc.prix.toFixed(2)} FCFA.`;
        document.getElementById('product-cat').textContent = pdc.categorie;
        document.getElementById('product-desc').textContent = pdc.description || "No description available for this premium item.";
        document.getElementById('product-img').src = pdc.image;

        const waBtn = document.getElementById('wa-btn');
        const phoneNumber = "22890000000";
        const message = `Hello DSK Shop! I'm interested in the "${pdc.nom}" (${pdc.prix} FCFA.). Is it still available for delivery?`;
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
export let produitsFiltres = [...produits]
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


export function ajouterAuPanier(produitId, delta = 1) {
    const existeDeja = panier.find(p => p.id == produitId);
    if (existeDeja) {
        existeDeja.quantite += delta

        if (existeDeja.quantite <= 0) {
            const index = panier.findIndex(item => item.id == produitId);
            if (index !== -1) {
                panier.splice(index, 1);
            }
        }
    }
    else if (delta > 0) {
        const productTrouve = produits.find(p => p.id == produitId)
        if (productTrouve) {
            panier.push({ ...productTrouve, quantite: 1 })
            showToast()
        }
    }
    actualiserVisuelPanier()
}

export function actualiserVisuelPanier() {
    const conteneur = document.querySelector('#cart-content');
    const subtotalEl = document.querySelector('#cart-subtotal');
    const shippingEl = document.querySelector('#cart-shipping');
    const totalEl = document.querySelector('#cart-total-final');
    const spanBadge = document.getElementById("span");

    if (!conteneur) return;

    const sousTotal = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
    const fraisLivraison = sousTotal > 0 ? 5000 : 0;
    const totalFinal = sousTotal + fraisLivraison;

    if (spanBadge) {
        spanBadge.textContent = panier.reduce((acc, item) => acc + item.quantite, 0);
    }

    if (subtotalEl) subtotalEl.textContent = `${sousTotal.toLocaleString()} FCFA`;
    if (shippingEl) shippingEl.textContent = fraisLivraison === 0 ? "Gratuit" : `${fraisLivraison.toLocaleString()} FCFA`;
    if (totalEl) totalEl.textContent = `${totalFinal.toLocaleString()} FCFA`;

    if (panier.length === 0) {
        conteneur.innerHTML = `
            <div class="flex flex-col items-center justify-center text-gray-400 py-10">
                <i data-lucide="shopping-cart" class="w-12 h-12 mb-2"></i>
                <p class="font-black text-sm">Votre panier est vide.</p>
            </div>`;
        return;
    }
    conteneur.innerHTML = panier.map(item => `
<div class="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
<img src="${item.image}" class="w-16 h-16 object-cover rounded-xl bg-white">
<div class="flex-1">
<h4 class="text-sm font-bold text-black truncate w-32">${item.nom}</h4>
<div class="flex items-center gap-2 mt-1">
<button onclick="ajouterAuPanier('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white active:scale-90 transition-all">-</button>
<span class="text-xs font-black w-4 text-center">${item.quantite}</span>
<button onclick="ajouterAuPanier('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-md hover:bg-white active:scale-90 transition-all">+</button>
</div>
</div>
<div class="text-right flex flex-col items-end gap-2">
<button onclick="supprimerDuPanier('${item.id}')" class="text-gray-300 hover:text-red-500 transition-colors">
<i data-lucide="trash-2" class="w-4 h-4"></i>
</button>
<p class="text-[12px] font-black text-black">${(item.prix * item.quantite).toLocaleString()} F</p>
</div>
</div>
`).join('');

    if (window.lucide) lucide.createIcons();
}