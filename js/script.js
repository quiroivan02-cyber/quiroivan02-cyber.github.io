/* =========================================
   SCRIPT.JS - JavaScript Principal
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // === INICIALIZAR FUNCIONALIDADES ===
    initMobileMenu();
    initHeroSlideshow();
    initDiplomaModal();
    initScrollEffects();
    initAnimations();
    initSmoothScroll();
    
    // Mensaje de bienvenida en consola
    console.log('%c👋 Hola! Gracias por revisar mi portafolio', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%c📧 Contacto: isquiroga@utp.edu.co', 'color: #6b7280; font-size: 14px;');
});

/* =========================================
   MENU MOBILE
   ========================================= */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return; // Salir si no existen
    
    // Toggle menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animar hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Cerrar menu al hacer clic en un link
    const navLinks = document.querySelectorAll('.nav-menu a, .nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

/* =========================================
   SLIDESHOW AUTOMÁTICO DEL HERO
   ========================================= */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return; // Si no hay slides, salir
    
    let currentSlide = 0;
    
    function showNextSlide() {
        // Quitar clase active de la imagen actual
        slides[currentSlide].classList.remove('active');
        
        // Ir a la siguiente imagen (o volver al inicio)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Agregar clase active a la nueva imagen
        slides[currentSlide].classList.add('active');
    }
    
    // Cambiar imagen cada 3 segundos
    setInterval(showNextSlide, 2500);
}

/* =========================================
   MODAL DE DIPLOMAS
   ========================================= */
function initDiplomaModal() {
    const modal = document.getElementById('diplomaModal');
    const modalImg = document.getElementById('diplomaImage');
    const closeBtn = document.getElementById('diplomaClose');
    const buttons = document.querySelectorAll('.credential-logo-btn');

    if (!modal || !modalImg) return; // Salir si no existe el modal

    // Abrir modal al hacer clic en logos
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const diplomaSrc = btn.getAttribute('data-diploma');
            if (diplomaSrc) {
                modalImg.src = `assets/${diplomaSrc}`;
                modal.style.display = 'flex';
            }
        });
    });

    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modalImg.src = '';
        });
    }

    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    });
}

/* =========================================
   EFECTOS DE SCROLL EN HEADER
   ========================================= */
function initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

/* =========================================
   SMOOTH SCROLL PARA ANCHOR LINKS
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar # vacío o solo #
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =========================================
   ANIMACIONES AL HACER SCROLL
   ========================================= */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observar cards con delay escalonado
    const cards = document.querySelectorAll('.credential-card, .project-card, .skill-category, .contact-card, .strength-card, .interest-block');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}
