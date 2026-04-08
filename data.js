export const produits = [
    { id: 1, nom: "Phone Holder Sakti", categorie: "Other", prix: 2990, image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=500", rating: 9.0, },
    { id: 2, nom: "Headsound Elite", categorie: "Music", prix: 1200, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500", rating: 4.8 },
    {
        id: 3,
        nom: "Apex Gaming Mouse",
        categorie: "Gaming",
        prix: 32500 ,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500", rating: 9.7, description: "Ultra-lightweight with zero latency for competitive West African gamers."
    },
    {
        id: 4,
        nom: "Nomad Watch v2",
        categorie: "Lifestyle",
        prix: 183880,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
        rating: 9.6,
        description: "A timeless piece for the modern entrepreneur."
    },
    {
        id: 5,
        nom: "Studio Mic Z1",
        categorie: "Music",
        prix:12500,
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=500",
        rating: 4.9,
        description: "Crystal clear audio for your next big podcast or track."
    },
    {
        id: 6,
        nom: "Aura Smart Lamp",
        categorie: "Home",
        prix: 15500,
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=500",
        rating: 4.5,
        description: "Adjustable lighting to keep you focused during late-night coding sessions."
    },
    {
        id: 7,
        nom: "Apex Mechanical Keyboard",
        categorie: "Tech",
        prix: 45000,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500",
        rating: 4.9,
        description: "Tactile feedback and RGB lighting for maximum coding speed."
    },
    {
        id: 8,
        nom: "Zenith Wireless Mouse",
        categorie: "Tech",
        prix: 28000,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=500",
        rating: 4.7,
        description: "Ergonomic design with ultra-fast precision for long hours of work."
    },
    {
        id: 9,
        nom: "Titan Noise-Canceling Headphones",
        categorie: "Audio",
        prix: 65000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
        rating: 4.8,
        description: "Pure silence to stay in the zone. Studio-quality sound."
    },
    {
        id: 10,
        nom: "Minimalist Oak Desk",
        categorie: "Home",
        prix: 85000,
        image: "https://images.unsplash.com/photo-1518455027359-f3f816b1a238?q=80&w=500",
        rating: 4.6,
        description: "Premium wood finish for a clean and professional workspace."
    },
    {
        id: 11,
        nom: "Orbit 4K External Monitor",
        categorie: "Tech",
        prix: 125000,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500",
        rating: 4.9,
        description: "Crystal clear 4K resolution to see every line of code perfectly."
    },
    {
        id: 12,
        nom: "Carbon Smart Watch",
        categorie: "Lifestyle",
        prix: 35000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
        rating: 4.4,
        description: "Track your health and your notifications in style."
    }
];

export const categories = [...new Set(produits.map(p => p.categorie))];
