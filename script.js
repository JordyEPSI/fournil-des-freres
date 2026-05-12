document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LE LOADER (Écran de chargement)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 600);
        }
    }, 1000);

    // 2. LOGIQUE D'OUVERTURE (Status Badge)
    // Algorithme pour afficher si la boulangerie est ouverte ou fermée en temps réel
    const updateStatus = () => {
        const badge = document.getElementById('status-badge');
        if (!badge) return;
        
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Dimanche, 6 = Samedi
        
        // On définit l'heure d'ouverture selon le jour
        const openTime = (day === 0 || day === 6) ? 7 : 6; 
        
        if (hour >= openTime && hour < 20) {
            badge.innerText = "● OUVERT ACTUELLEMENT";
            badge.className = "status-badge open";
        } else {
            badge.innerText = `● FERMÉ - OUVRE À ${openTime}H`;
            badge.className = "status-badge closed";
        }
    };
    updateStatus();

    // 3. MENU BURGER MOBILE
    // On ajoute un écouteur de clic sur l'icône burger pour afficher le menu
    const burger = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-list');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active'); // Pour animer l'icône
        });
    }

    // 4. ANIMATIONS AU SCROLL
    // On utilise l'API Intersection Observer ou un calcul de scroll pour faire apparaître les sections
    const reveals = document.querySelectorAll('.reveal');
    const handleScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial pour les éléments déjà visibles

    // 5. ACCORDÉON FAQ
    // On gère l'ouverture/fermeture des questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('open');
            
            // On ferme les autres pour faire propre
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('open');
            });
        });
    });
});
