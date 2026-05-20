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
    const burger = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-list');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active'); // Pour animer l'icône
        });

        // AJOUT : Fermer le menu automatiquement au clic sur un lien (très important sur mobile)
        document.querySelectorAll('#nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // 4. ANIMATIONS AU SCROLL & BOUTON RETOUR EN HAUT
    const reveals = document.querySelectorAll('.reveal');
    const backBtn = document.getElementById('backToTop');
    const progressBar = document.getElementById('scroll-progress-bar');

    const handleScroll = () => {
        // AJOUT : Barre de progression en haut de la page
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + "%";
        }

        // Apparition des éléments (Reveal)
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });

        // AJOUT : Afficher/Cacher le bouton "Retour en haut"
        if (backBtn) {
            backBtn.style.display = window.scrollY > 500 ? "block" : "none";
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial pour les éléments déjà visibles

    // AJOUT : Action de remonter la page au clic sur le bouton
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. ACCORDÉON FAQ
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

    // 6. AJOUT : NOM DU FICHIER PDF (Formulaire Contact)
    // Permet d'afficher le nom du CV quand l'utilisateur le sélectionne
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || "Aucun fichier choisi";
            fileNameDisplay.innerText = name;
            fileNameDisplay.style.color = "#C5A059";
        });
    }
});
