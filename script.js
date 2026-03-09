const produits = [
    { id: 1, nom: "Phone Holder Sakti",categorie: "Other", prix: 29.90,image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500",rating: 9.0 , },
    {id: 2, nom: "Headsound Elite",categorie: "Music",prix: 12.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",rating: 4.8},
    { id: 1, nom: "Phone Holder Sakti",categorie: "Other", prix: 29.90,image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500",rating: 5.0 },
    { id: 1, nom: "Phone Holder Sakti",categorie: "Other", prix: 29.90,image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500",rating: 9.0 },
    { id: 1, nom: "Phone Holder Sakti",categorie: "Other", prix: 29.90,image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500",rating: 7.0 },
    { id: 1, nom: "Phone Holder Sakti",categorie: "Other", prix: 29.90,image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500",rating: 5.0 },
    {id: 2, nom: "Headsound Elite",categorie: "Music",prix: 12.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",rating: 4.8},
    {id: 2, nom: "Headsound Elite",categorie: "Music",prix: 12.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",rating: 9.8},
    {id: 2, nom: "Headsound Elite",categorie: "Music",prix: 12.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",rating: 4.8},
    {id: 2, nom: "Headsound Elite",categorie: "Music",prix: 12.00, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",rating: 9.8},
];

const ItemsPerPage=9
currentPage=1
let produitsFiltres=[...produits]

 const grille=document.querySelector('#Pro-sec1')
function showsPrds() {
const debut=(currentPage-1)*ItemsPerPage
const fin =debut+ItemsPerPage
const produitDelaPAGE=produitsFiltres.slice(debut,fin)
    if (!grille) return; 
    grille.innerHTML =produitDelaPAGE.map(produit => `
        <div class="bg-dsk-card p-4 rounded-3xl border border-gray-100 cursor-pointer hover:shadow-xl transition-all group" >
            <div class="bg-gray-100 rounded-2xl h-48 flex items-center justify-center overflow-hidden mb-4 relative">
                <img src="${produit.image}" title="voir les details" class="group-hover:scale-110 transition-transform duration-500 object-cover h-full w-full">
                <span class="absolute top-2 right-2 bg-dsk-card backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold">
                    ⭐ ${produit.rating} 
                </span>
            </div>
            <div class="space-y-1">
                <span class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">${produit.categorie}</span>
                <h3 class="font-title font-bold text-[#080808] truncate">${produit.nom}</h3>
                
                <div class="flex justify-between items-center mt-2">
                    <span title="price" class="font-bold text-lg text-[#080808]">${produit.prix.toFixed(2)} €</span>
                    <button  title="Buy"class="bg-[#080808] text-dsk-card p-2 rounded-xl hover:bg-[#caa52b] transition-colors">
                        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
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

function ShowsPagination() {
    const total=Math.ceil(produitsFiltres.length/ItemsPerPage)
    console.log(total);  
    const paginationContainer=document.querySelector('#pagination')
    if (!paginationContainer)
        return

    let html=`
    <button onclick="changerPage(${currentPage - 1})" 
                class="flex items-center mt-12 gap-2 font-semibold ${currentPage === 1 ? 'invisible' : 'hover:text-[#caa52b] transition-colors'}">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Previous
        </button>

        <div class="flex gap-2">
        `
for (let i = 1; i <= total; i++) {
    if (
        i === 1 ||                          // Toujours la première page
        i === total ||                      // Toujours la dernière page
        (i >= currentPage - 1 && i <= currentPage + 2) // Un bouton avant et un après l'actuel
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
    paginationContainer.innerHTML=html
    lucide.createIcons();
}

function changerPage(newNum) {
    const totalPage=Math.ceil(produitsFiltres.length/ItemsPerPage)
    if (newNum<1 || newNum >totalPage) return 
    currentPage=newNum
    showsPrds()
    ShowsPagination()


    grille.scrollIntoView({
        behavior:'smooth',
        block: 'start'
    })
}

// toute les produits 
const number= document.querySelector('#number')
number.textContent=produits.length
// filtre
function filtrerParCategorie(nomCategorie){
currentPage=1
if (nomCategorie==="All") {
    produitsFiltres=produits
}
else{
    produitsFiltres=produits.filter(p=>p.categorie===nomCategorie)
}
showsPrds()
ShowsPagination()
}
ShowsPagination()
showsPrds() ;

const turnMode=document.querySelector("#Turn-mode")



turnMode.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');

    turnMode.innerHTML = isDark 
        ? `<i data-lucide="moon"></i>` 
        : `<i data-lucide="sun-dim"></i>`;
    lucide.createIcons();
});



const carousel = document.querySelector('#carousel-viewPoint');
const rail = document.querySelector('#carousel-rail');
let currentStep = 0;
function move(direction) {
    const stepWidth = carousel.offsetWidth / 2.5;
    
    currentStep += direction;
    const maxSteps = Math.round(rail.scrollWidth / stepWidth) - 2;
    if (currentStep < 0) currentStep = 0;
    if (currentStep > maxSteps) currentStep = maxSteps;

    const finalOffset = currentStep * stepWidth; 
        rail.style.transform = `translateX(-${finalOffset}px)`;
}

// les recommandation
function showREcommande() {
topProducts=produitsFiltres.filter(p=>p.rating>6)
rail.innerHTML=topProducts.map(produit=> `
     <div class="bg-dsk-card p-4 rounded-3xl border  min-w-[380px] border-gray-100 cursor-pointer hover:shadow-xl transition-all group" >
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
                    <span title="price" class="font-bold text-lg text-[#080808]">${produit.prix.toFixed(2)} €</span>
                    <button  title="Buy"class="bg-[#080808] text-dsk-card p-2 rounded-xl hover:bg-[#caa52b] transition-colors">
                        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join(''); 
    if (window.lucide) lucide.createIcons();
}
 showREcommande()
