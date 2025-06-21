/**
 * Portafolio Profesional - JavaScript Principal
 * Funcionalidades: Navegación, scroll suave, menú móvil, animaciones
 */

// ===== VARIABLES GLOBALES =====
const header = document.querySelector('.header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// ===== FUNCIONES UTILITARIAS =====

/**
 * Función para agregar clase de animación
 * @param {Element} element - Elemento a animar
 * @param {string} animationClass - Clase de animación
 */
function addAnimation(element, animationClass = 'fade-in-up') {
    element.classList.add(animationClass);
}

/**
 * Función para remover clase de animación
 * @param {Element} element - Elemento
 * @param {string} animationClass - Clase de animación
 */
function removeAnimation(element, animationClass = 'fade-in-up') {
    element.classList.remove(animationClass);
}

/**
 * Función para verificar si un elemento está en el viewport
 * @param {Element} element - Elemento a verificar
 * @returns {boolean} - True si está en el viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Función para verificar si un elemento está parcialmente visible
 * @param {Element} element - Elemento a verificar
 * @returns {boolean} - True si está parcialmente visible
 */
function isPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top < windowHeight &&
        rect.bottom > 0
    );
}

// ===== NAVEGACIÓN Y SCROLL =====

/**
 * Función para manejar el scroll del header
 */
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/**
 * Función para manejar la navegación activa
 */
function handleActiveNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remover clase activa de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Agregar clase activa al enlace correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/**
 * Función para scroll suave a secciones
 * @param {Event} e - Evento del click
 */
function smoothScrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// ===== MENÚ MÓVIL =====

/**
 * Función para alternar el menú móvil
 */
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    
    // Cambiar ícono del botón
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

/**
 * Función para cerrar el menú móvil al hacer click fuera
 * @param {Event} e - Evento del click
 */
function closeMobileMenuOnClickOutside(e) {
    if (!header.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// ===== ANIMACIONES DE SCROLL =====

/**
 * Función para manejar animaciones al hacer scroll
 */
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item');
    
    animatedElements.forEach(element => {
        if (isPartiallyVisible(element) && !element.classList.contains('animated')) {
            addAnimation(element);
            element.classList.add('animated');
        }
    });
}

/**
 * Función para animar elementos al cargar la página
 */
function animateOnLoad() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-actions, .profile-card');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            addAnimation(element);
        }, index * 200);
    });
}

// ===== INTERSECCIÓN OBSERVER =====

/**
 * Función para configurar el Intersection Observer
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const elementsToObserve = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item');
    elementsToObserve.forEach(element => observer.observe(element));
}

// ===== FUNCIONALIDADES DE PROYECTOS =====

/**
 * Función para manejar hover en tarjetas de proyectos
 */
function handleProjectCardHover() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FUNCIONALIDADES DE CONTACTO =====

/**
 * Función para manejar enlaces de redes sociales
 */
function handleSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Agregar efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Función para manejar la descarga del CV
 */
function handleCVDownload() {
    const cvDownloadBtn = document.querySelector('.cv-download .btn');
    
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            // Verificar si el archivo existe
            const cvPath = this.getAttribute('href');
            
            // Agregar efecto de loading
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
            
            // Simular descarga (en un caso real, el archivo se descargaría automáticamente)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = '<i class="fas fa-download"></i> <span data-translate="contact.downloadCV">Descargar CV</span>';
                
                // Mostrar notificación de éxito
                showNotification('CV descargado exitosamente', 'success');
            }, 2000);
        });
    }
}

// ===== NOTIFICACIONES =====

/**
 * Función para mostrar notificaciones
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        max-width: 300px;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Manejar cierre
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== FUNCIONALIDADES DE ACCESIBILIDAD =====

/**
 * Función para manejar navegación por teclado
 */
function handleKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Enter para activar enlaces con focus
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('nav-link') || 
                focusedElement.classList.contains('social-link')) {
                focusedElement.click();
            }
        }
    });
}

/**
 * Función para mejorar la accesibilidad
 */
function enhanceAccessibility() {
    // Agregar atributos ARIA
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Manejar cambios en aria-expanded
    navToggle.addEventListener('click', function() {
        const isExpanded = navMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded.toString());
    });
    
    // Agregar skip link para accesibilidad
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Agregar id al main
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

// ===== FUNCIONALIDADES DE PERFORMANCE =====

/**
 * Función para optimizar el scroll con throttling
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Delay en milisegundos
 * @returns {Function} - Función optimizada
 */
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// ===== INICIALIZACIÓN =====

/**
 * Función principal de inicialización
 */
function init() {
    // Configurar event listeners
    window.addEventListener('scroll', throttle(handleHeaderScroll, 10));
    window.addEventListener('scroll', throttle(handleActiveNavigation, 100));
    window.addEventListener('scroll', throttle(handleScrollAnimations, 100));
    
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    // Menú móvil
    navToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenuOnClickOutside);
    
    // Proyectos y contacto
    handleProjectCardHover();
    handleSocialLinks();
    handleCVDownload();
    
    // Accesibilidad
    handleKeyboardNavigation();
    enhanceAccessibility();
    
    // Intersection Observer
    setupIntersectionObserver();
    
    // Animaciones iniciales
    animateOnLoad();
    
    // Agregar clase al body para indicar que JS está cargado
    document.body.classList.add('js-loaded');
    
    console.log('🚀 Portafolio inicializado correctamente');
}

// ===== EVENT LISTENERS =====

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);

// Manejar carga de recursos
window.addEventListener('load', function() {
    // Remover clase de loading si existe
    document.body.classList.remove('loading');
    
    // Animar elementos que no se animaron antes
    const unanimatedElements = document.querySelectorAll('.project-card:not(.animated), .skill-category:not(.animated)');
    unanimatedElements.forEach(element => {
        if (isPartiallyVisible(element)) {
            addAnimation(element);
            element.classList.add('animated');
        }
    });
});

// Manejar resize de ventana
window.addEventListener('resize', throttle(function() {
    // Cerrar menú móvil en resize si está abierto
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}, 250));

// ===== EXPORTAR FUNCIONES PARA USO EXTERNO =====
window.PortfolioApp = {
    showNotification,
    addAnimation,
    removeAnimation,
    isInViewport,
    isPartiallyVisible
};
