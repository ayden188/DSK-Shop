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
  <div class="group bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-200 
              transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full">

    <div class="relative bg-gray-100 rounded-xl sm:rounded-2xl aspect-square overflow-hidden mb-3 flex-shrink-0">
        <a href="product.html?id=${produit.id}" class="block h-full w-full">
            <img src="${produit.image}" 
                 alt="${produit.nom}" 
                 title="voir les details" 
                 class="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500">
        </a>

        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none"></div>

        <span class="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold shadow-sm">
            ⭐ ${produit.rating}
        </span>
    </div>

    <div class="flex flex-col flex-grow min-w-0"> <span class="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-tighter sm:tracking-widest block mb-1">
          ${produit.categorie}
        </span>

        <a href="product.html?id=${produit.id}" class="block ">
            <h3 class="font-bold text-xs sm:text-base leading-tight hover:text-[#caa52b] transition line-clamp-2 min-h-[2.5em]">
                ${produit.nom}
            </h3>
        </a>

        <div class="flex flex-wrap items-center gap-1 sm:gap-2 mt-auto">
            <span class="font-bold text-xs text-black whitespace-nowrap">
                ${produit.prix.toLocaleString('fr-FR')} FCFA
            </span>
            <span class="text-[9px] sm:text-xs line-through text-gray-400">
                ${(produit.prix * 1.3).toLocaleString('fr-FR')}
            </span>
        </div>

        <button onclick="handleAchat('${produit.id}')" 
          class="mt-3 w-full bg-black text-white py-2 sm:py-2.5 rounded-xl 
                 flex items-center justify-center gap-2 
                 hover:bg-[#caa52b] active:scale-95 transition-all">
          
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
          <span class="text-[11px] sm:text-sm font-semibold uppercase tracking-tight">Ajouter</span>
        </button>
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
             <img src="${produit.image}" title="voir les details" alt="${produit.nom}" class="group-hover:scale-110 transition-transform duration-500 object-cover h-full w-full"> 
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

export function showAutoHero() {
    const heroCointainer = document.getElementById('hero-section-container')
    if (!heroCointainer) return
    const bestProduct = [...produitsFiltres].sort((a, b) => b.rating - a.rating)[0]
    if (!bestProduct) {
        console.log('eli')
        return;
    }
    heroCointainer.innerHTML = `
        <section class="w-full bg-[#f8f8f8] py-20 px-4 md:px-8">
            <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
                
                <div class="w-full md:w-1/2 rounded-2xl overflow-hidden relative group bg-white p-4">
                    <img src="${bestProduct.image}" alt="${bestProduct.nom}"
                        class="w-full h-[400px] md:h-[550px] object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105">
                    
                    <div class="absolute bottom-10 right-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex flex-col items-end">
                        <span class="text-[10px] font-black uppercase text-gray-400 tracking-widest">${bestProduct.categorie}</span>
                        <span class="text-2xl font-extrabold text-slate-950">${bestProduct.prix.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                </div>

                <div class="w-full md:w-1/2 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <span class="text-xs font-bold tracking-[0.5em] uppercase text-indigo-600">Featured Masterpiece</span>

                    <h2 class="text-5xl md:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
                        ${bestProduct.nom.split(' ')[0]} <br>
                        <span class="text-gray-300">${bestProduct.nom.split(' ').slice(1).join(' ')}</span>
                    </h2>

                    <p class="max-w-md text-gray-600 leading-relaxed font-medium">
                       
                        ${bestProduct.description}
                        Un produit noté  ${bestProduct.rating}/10 par notre communauté à Lomé.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <button onclick="handleAchat('${bestProduct.id}')"
                            class="w-full sm:w-auto bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all hover:bg-indigo-600 flex items-center justify-center gap-2 group">
                            Acheter maintenant
                            <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                        </button>
                        <a href="shop.html?category=All"
class="w-full sm:w-auto text-slate-950 px-10 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-slate-100 flex items-center justify-center gap-2">
Voir toute la gamme Audio
</a>
                    </div>
                </div>
            </div>
        </section>
    `;

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








let CurrentIndex = 0;

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    if (dots.length === 0) return;

    dots.forEach((dot, index) => {
        if (index === CurrentIndex) {
            dot.className = "dot w-8 h-1.5 rounded-full bg-white shadow-sm transition-all duration-500 opacity-100";
        } else {
            dot.className = "dot w-1.5 h-1.5 rounded-full bg-white/70 transition-all duration-500 opacity-90 hover:opacity-100";
        }
    });
}

// 2. Initialisation du Carrousel
export function InitCarroussel() {
    const proCarrousser = produits.slice(0, 4);
    const container = document.getElementById('carousel-slide');
    if (!container) return;

    // Rendu des images
    container.innerHTML = proCarrousser.map(p => `
        <div class="relative min-w-full h-[400px] md:h-[500px] flex items-center group">
            <img src="${p.image}" class="absolute inset-0 w-full h-full object-cover" alt="${p.nom}">
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
            <div class="relative  z-10 px-12 md:px-20 space-y-6">
                <span class="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs">Featured Product</span>
                <h2 class="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">${p.nom}</h2>
                <p class="text-gray-300 text-xl font-medium">${p.prix.toLocaleString()} FCFA</p>
                <button onclick="handleAchat('${p.id}')" class="bg-white text-black px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#caa52b] hover:text-white transition-all shadow-xl active:scale-95">ACHETER MAINTENANT</button>
            </div>
        </div>`).join('');

    const oldNav = document.getElementById('dots-container');
    if (oldNav) oldNav.remove();

    const nav = document.createElement('div');
    nav.id = "dots-container";
    nav.className = "absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-48";

    nav.innerHTML = proCarrousser.map((_, i) => `
        <div onclick="goToSlide(${i})" class="dot cursor-pointer p-1"></div>
    `).join('');

    container.parentElement.appendChild(nav);

    updateDots(); // Allumage initial

    setInterval(() => moveCarousel(1), 55000);
}

export function moveCarousel(direction) {
    const container = document.getElementById('carousel-slide');
    const total = document.querySelectorAll('#carousel-slide > div').length;
    if (!container || total === 0) return;

    CurrentIndex += direction;
    if (CurrentIndex >= total) CurrentIndex = 0;
    if (CurrentIndex < 0) CurrentIndex = total - 1;

    container.style.transform = `translateX(-${CurrentIndex * 100}%)`;
    updateDots();
}

export function goToSlide(index) {
    const container = document.getElementById('carousel-slide');
    if (!container) return;

    CurrentIndex = index;
    container.style.transform = `translateX(-${CurrentIndex * 100}%)`;
    updateDots();
}

window.goToSlide = goToSlide;
window.moveCarousel = moveCarousel;




export function initCategoryMenu() {
    const btn = document.querySelector('#cat-but');
    const menu = document.querySelector('#category-menu');
    const chevron = document.querySelector('#cat-chevron');

    if (!btn || !menu) return;

    btn.onclick = (e) => {
        e.stopPropagation();

        const isOpen = !menu.classList.contains('opacity-0');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    function openMenu() {
        menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'translate-y-[-10px]');
        menu.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        if (chevron) chevron.classList.add('rotate-180');
    }

    function closeMenu() {
        menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'translate-y-[-10px]');
        menu.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        if (chevron) chevron.classList.remove('rotate-180');
    }
    document.addEventListener('click', () => closeMenu());
}

window.selectCat = (cat) => {
    console.log("Filtrage par :", cat);
    filtrerParCategorie(cat);
    const menu = document.querySelector('#category-menu');
    if (menu) {
        menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    }
};

window.initCategoryMenu = initCategoryMenu;