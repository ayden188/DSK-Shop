import { currentPage, produitsFiltres, setCurrentPage } from './carte.js';
import { produits } from './data.js';
import { ItemsPerPage } from './main.js';

export function numberLenghOfProducts(params) {
    const number = document.querySelector('#number')
    number.textContent = produits.length
}


let currentStep = 0

export function showsPrds() {
    const grille = document.querySelector('#Pro-sec1')
    const debut = (currentPage - 1) * ItemsPerPage
    const fin = debut + ItemsPerPage
    const produitDelaPAGE = produitsFiltres.slice(debut, fin)
    if (!grille) return;
    grille.innerHTML = produitDelaPAGE.map(produit => `
      <div class="bg-gray-100 p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 cursor-pointer transition-all group w-full flex flex-col justify-between">
    
    <div class="bg-gray-200 rounded-xl sm:rounded-2xl aspect-square flex items-center justify-center overflow-hidden mb-3 relative">
        <a href="product.html?id=${produit.id}" class="block h-full w-full">
            <img src="${produit.image}" class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500">
        </a>
        <span class="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold shadow-sm">
            ⭐ ${produit.rating} 
        </span>
    </div>

    <div class="space-y-1 ">
        <span class="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-tighter sm:tracking-widest block">${produit.categorie}</span>
        
        <a href="product.html?id=${produit.id}">
            <h3 class="font-title font-bold text-xs sm:text-base leading-tight hover:text-[#caa52b] line-clamp-2">
                ${produit.nom}
            </h3>
        </a>                    
 <div class="flex justify-between items-center mt-auto pt-4 gap-2">
    <div class="flex flex-col">
        <span class="font-bold text-[15px] sm:text-xl text-[#080808] whitespace-nowrap leading-none">
            ${produit.prix.toLocaleString('fr-FR')}  <span class="text-[10px] sm:text-xs ml-0.5">FCFA</span>
        </span>
    </div>
    
    <button onclick="handleAchat('${produit.id}')" 
            class="flex-shrink-0 bg-[#080808] text-white p-2.5 rounded-xl hover:bg-[#caa52b] active:scale-90 transition-all shadow-sm">
        <i data-lucide="shopping-cart" class="w-4 h-4 sm:w-5 sm:h-5"></i>
    </button>
</div>
    </div>
</div>
        `).join('');
    if (produitsFiltres.length === 0) {
        grille.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div class="bg-gray-100 p-6 rounded-full mb-4">
                        <i data-lucide="package-search" class="w-12 h-12 text-gray-400"></i>
                    </div>
                    <h3 class="text-xl font-bold text-[#080808]">Aucun produit trouvé</h3>
                    <p class="text-gray-500 mt-2">Désolé, nous n'avons pas d'articles dans cette catégorie pour le moment.</p>
                    <button onclick="filtrerParCategorie('All')" class="mt-6 text-[#caa52b] font-bold hover:underline">
                        Voir tout le catalogue
                    </button>
                </div>
            `;
        lucide.createIcons();
        return;
    }
    if (window.lucide) {
        lucide.createIcons();
    }
}

export function ShowsPagination() {
    const total = Math.ceil(produitsFiltres.length / ItemsPerPage)
    const paginationContainer = document.querySelector('#pagination')
    if (!paginationContainer)
        return

    let html = `
    <button onclick="changerPage(${currentPage - 1})" 
                class="flex items-center mt-12 gap-2 font-semibold ${currentPage === 1 ? 'invisible' : 'hover:text-[#caa52b] transition-colors'}">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Previous
        </button>

        <div class="flex gap-2">
        `
    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= currentPage - 1 && i <= currentPage + 2)
        ) {
            html += `
            <button onclick="changerPage(${i})" 
                class="w-10 h-10 rounded-xl font-bold transition-all mt-8
                ${i === currentPage ? 'bg-gray-100 text-[#080808]' : 'text-gray-400 hover:text-[#080808]'}">
                ${i}
            </button>
        `;
        }
        else if (i === 2 || i === total - 1) {
            html += ` <button class="mt-8"><span class="text-gray-400 px-1">...</span></button>`;
        }
    }

    html += `
        </div>
        <button onclick="changerPage(${currentPage + 1})"   mt-8
                class="flex items-center mt-10 gap-2 font-semibold ${currentPage === total ? 'invisible' : 'hover:text-[#caa52b] transition-colors'}">
            Next <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
    `;
    paginationContainer.innerHTML = html
    lucide.createIcons();
}

export function move(direction) {
    const carousel = document.querySelector('#carousel-viewPoint');
    const rail = document.querySelector('#carousel-rail');

    const stepWidth = carousel.offsetWidth / 2.5;
    if (!carousel || !rail) return
    currentStep += direction;
    const maxSteps = Math.round(rail.scrollWidth / stepWidth) - 2;
    if (currentStep < 0) currentStep = 0;
    if (currentStep > maxSteps) currentStep = maxSteps;

    const finalOffset = currentStep * stepWidth;
    rail.style.transform = `translateX(-${finalOffset}px)`;
}

export function showREcommande() {

    const rail = document.querySelector('#carousel-rail');
    if (!rail) return


    let topProducts = produitsFiltres.filter(p => p.rating > 6)
    rail.innerHTML = topProducts.map(produit => `
     <div class="bg-dsk-card p-4 rounded-3xl border  min-w-[380px] border-gray-100 cursor-pointer transition-all group" >
            <div class="bg-gray-100 rounded-2xl h-48 flex items-center justify-center overflow-hidden mb-4 relative">
                <img src="${produit.image}" title="voir les details" class="group-hover:scale-110 transition-transform duration-500 object-cover h-full w-full">
                <span class="absolute top-2 right-2 bg-dsk-card backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold">
                    ${produit.categorie} 
                </span>
            </div>
            
            <div class="space-y-1">
                <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest"> ⭐ ${produit.rating}</span>
                <h3 class="font-title font-bold text-[#080808] truncate">${produit.nom}</h3>
                
                <div class="flex justify-between items-center mt-2">
                    <span title="price" class="font-black text-lg text-[#080808]">${produit.prix.toFixed(2)} FCFA</span>
                    <button onclick="handleAchat('${produit.id}')"  class="bg-[#080808] text-dsk-card p-2 rounded-xl hover:bg-[#caa52b] transition-colors">
                        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}


export function darkMode() {
    const turnMode = document.querySelector("#Turn-mode")
    if (!turnMode) return
    turnMode.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        turnMode.innerHTML = isDark
            ? `<i data-lucide="moon"></i>`
            : `<i data-lucide="sun-dim"></i>`;
        lucide.createIcons();
    });
} export function changerPage(newNum) {
    const totalPage = Math.ceil(produitsFiltres.length / ItemsPerPage);
    if (newNum < 1 || newNum > totalPage) return;

    setCurrentPage(newNum);

    showsPrds();
    ShowsPagination();

    const grille = document.querySelector('#Pro-sec1');
    if (grille) {
        grille.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// logique du carrousel

let CurrentIndex = 0;

export function moveCarousel(direction) {
    const container = document.getElementById('carousel-slide'); // Corrigé : container
    const totalSlides = 4; 
    
    if (!container) return;

    CurrentIndex += direction;

    if (CurrentIndex >= totalSlides) {
        CurrentIndex = 0;
    } else if (CurrentIndex < 0) {
        CurrentIndex = totalSlides - 1;
    }

    container.style.transform = `translateX(-${CurrentIndex * 100}%)`;
}
window.moveCarousel = moveCarousel;
//carrouseele onkdfhbfwfl 
export function InitCarroussel() {
    const proCarrousser = produits.slice(0, 4);
    const containerCarrouse = document.getElementById('carousel-slide');
    if (!containerCarrouse) return;
    containerCarrouse.innerHTML = proCarrousser.map(p => `
        <div class="relative min-w-full h-[400px] md:h-[600px] flex items-center">
            <img src="${p.image}" class="absolute inset-0 w-full h-full object-cover" alt="${p.nom}">
            
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            
            <div class="relative z-10 px-12 md:px-20 space-y-4">
                <span class="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs">Featured Product</span>
                <h2 class="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                    ${p.nom}
                </h2>
                <p class="text-gray-300 text-lg font-medium">${p.prix.toLocaleString()} FCFA</p>
                
                <button onclick="handleAchat('${p.id}')" 
                    class="bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-xl">
                    ACHETER MAINTENANT
                </button>
            </div>
        </div>`).join(''); 
        setInterval(() => {
    moveCarousel(1);
}, 55000);
}