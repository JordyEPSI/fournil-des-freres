document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LE LOADER
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 600);
        }
    }, 1000);

    // 2. LOGIQUE D'OUVERTURE
    const updateStatus = () => {
        const badge = document.getElementById('status-badge');
        if (!badge) return;
        
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); 
        
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
            burger.classList.toggle('active'); 
        });

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
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + "%";
        }

        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });

        if (backBtn) {
            backBtn.style.display = window.scrollY > 500 ? "block" : "none";
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. ACCORDÉON FAQ (Réparé)
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Fermer toutes les autres réponses
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer) {
                    otherAnswer.style.display = 'none';
                }
            });

            // Basculer l'affichage de la réponse cliquée
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // 6. NOM DU FICHIER PDF
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
