/**
 * Sistema de Traducción - Funcionalidad de cambio de idioma
 * Maneja la traducción dinámica entre español e inglés sin recarga de página
 */

// ===== VARIABLES GLOBALES =====
const languageToggle = document.getElementById('languageToggle');
const htmlElement = document.documentElement;

// ===== CONFIGURACIÓN =====
const LANGUAGE_STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE = 'es';
const SUPPORTED_LANGUAGES = ['es', 'en'];

// ===== TRADUCCIONES =====
const translations = {
    es: {
        // Navegación
        'nav.home': 'Inicio',
        'nav.about': 'Sobre mí',
        'nav.skills': 'Habilidades',
        'nav.education': 'Formación',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',
        
        // Hero Section
        'hero.greeting': 'Hola, soy',
        'hero.subtitle': 'Desarrollador Full Stack',
        'hero.description': 'Apasionado por crear soluciones web innovadoras y experiencias de usuario excepcionales. Especializado en JavaScript, React, Node.js y tecnologías modernas del desarrollo web.',
        'hero.viewProjects': 'Ver Proyectos',
        'hero.contactMe': 'Contactar',
        'hero.location': 'San José, Costa Rica',
        
        // About Section
        'about.title': 'Sobre Mí',
        'about.subtitle': 'Conoce más sobre mi experiencia y habilidades',
        'about.description': 'Soy un desarrollador Full Stack con más de 5 años de experiencia en el desarrollo de aplicaciones web. Me apasiona crear soluciones tecnológicas que resuelvan problemas reales y mejoren la vida de las personas.',
        'about.passion': 'Mi enfoque se centra en escribir código limpio, mantenible y escalable, utilizando las mejores prácticas y tecnologías modernas. Disfruto trabajando en equipo y aprendiendo nuevas tecnologías constantemente.',
        'about.skills': 'Habilidades Técnicas',
        
        // Skills Section
        'skills.title': 'Habilidades Técnicas',
        'skills.subtitle': 'Tecnologías y herramientas que domino',
        
        // Education Section
        'education.title': 'Formación y Certificaciones',
        'education.subtitle': 'Mi trayectoria educativa y certificaciones más recientes',
        'education.educationTitle': 'Educación',
        'education.certificationsTitle': 'Certificaciones Destacadas (2023 - 2024)',
        
        // Projects Section
        'projects.title': 'Proyectos',
        'projects.subtitle': 'Algunos de mis trabajos más destacados',
        
        // Contact Section
        'contact.title': 'Contacto',
        'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
        'contact.availability': 'Disponible para proyectos freelance',
        'contact.followMe': 'Sígueme en redes sociales',
        'contact.downloadCV': 'Descargar CV',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.madeWith': 'Hecho con ❤️ usando HTML, CSS y JavaScript'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.education': 'Education',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.greeting': 'Hello, I\'m',
        'hero.subtitle': 'Full Stack Developer',
        'hero.description': 'Passionate about creating innovative web solutions and exceptional user experiences. Specialized in JavaScript, React, Node.js and modern web development technologies.',
        'hero.viewProjects': 'View Projects',
        'hero.contactMe': 'Contact Me',
        'hero.location': 'San José, Costa Rica',
        
        // About Section
        'about.title': 'About Me',
        'about.subtitle': 'Learn more about my experience and skills',
        'about.description': 'I am a Full Stack developer with over 5 years of experience in web application development. I am passionate about creating technological solutions that solve real problems and improve people\'s lives.',
        'about.passion': 'My approach focuses on writing clean, maintainable and scalable code, using best practices and modern technologies. I enjoy working in teams and constantly learning new technologies.',
        'about.skills': 'Technical Skills',
        
        // Skills Section
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies and tools I master',
        
        // Education Section
        'education.title': 'Education and Certifications',
        'education.subtitle': 'My educational background and most recent certifications',
        'education.educationTitle': 'Education',
        'education.certificationsTitle': 'Featured Certifications (2023 - 2024)',
        
        // Projects Section
        'projects.title': 'Projects',
        'projects.subtitle': 'Some of my most outstanding works',
        
        // Contact Section
        'contact.title': 'Contact',
        'contact.subtitle': 'Have a project in mind? Let\'s talk!',
        'contact.availability': 'Available for freelance projects',
        'contact.followMe': 'Follow me on social media',
        'contact.downloadCV': 'Download CV',
        
        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.madeWith': 'Made with ❤️ using HTML, CSS and JavaScript'
    }
};

// ===== FUNCIONES PRINCIPALES =====

/**
 * Función para obtener el idioma actual del localStorage
 * @returns {string} - Código del idioma actual
 */
function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
    }
    
    // Detectar idioma del navegador
    const browserLanguage = navigator.language || navigator.userLanguage;
    const shortLanguage = browserLanguage.split('-')[0];
    
    if (SUPPORTED_LANGUAGES.includes(shortLanguage)) {
        return shortLanguage;
    }
    
    return DEFAULT_LANGUAGE;
}

/**
 * Función para aplicar el idioma
 * @param {string} language - Código del idioma
 */
function applyLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
        console.warn(`Idioma no soportado: ${language}`);
        return;
    }
    
    // Aplicar atributo al HTML
    htmlElement.setAttribute('lang', language);
    
    // Guardar en localStorage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    
    // Actualizar ícono del botón
    updateLanguageIcon(language);
    
    // Traducir todos los elementos
    translateAllElements(language);
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
    
    // Agregar clase de transición
    document.body.classList.add('language-transitioning');
    setTimeout(() => {
        document.body.classList.remove('language-transitioning');
    }, 300);
}

/**
 * Función para alternar entre idiomas
 */
function toggleLanguage() {
    const currentLanguage = getCurrentLanguage();
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    applyLanguage(newLanguage);
    
    // Mostrar notificación
    //const message = newLanguage === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    //if (window.PortfolioApp && window.PortfolioApp.showNotification) {
    //    window.PortfolioApp.showNotification(message, 'info');
    //}
}

/**
 * Función para actualizar el ícono del botón de idioma
 * @param {string} language - Idioma actual
 */
function updateLanguageIcon(language) {
    if (!languageToggle) return;
    
    const icon = languageToggle.querySelector('i');
    if (!icon) return;
    
    // Cambiar el ícono según el idioma
    if (language === 'es') {
        icon.classList.remove('fa-globe');
        icon.classList.add('fa-flag');
        languageToggle.setAttribute('aria-label', 'Change to English');
    } else {
        icon.classList.remove('fa-flag');
        icon.classList.add('fa-globe');
        languageToggle.setAttribute('aria-label', 'Cambiar a Español');
    }
}

/**
 * Función para traducir todos los elementos con data-translate
 * @param {string} language - Idioma a aplicar
 */
function translateAllElements(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    
    elementsToTranslate.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        const translation = getTranslation(translationKey, language);
        
        if (translation) {
            // Preservar HTML si existe
            if (element.innerHTML.includes('<')) {
                // Si el elemento tiene HTML, solo actualizar el texto
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = element.innerHTML;
                
                // Buscar elementos de texto y traducirlos
                const textNodes = [];
                const walker = document.createTreeWalker(
                    tempDiv,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );
                
                let node;
                while (node = walker.nextNode()) {
                    textNodes.push(node);
                }
                
                textNodes.forEach(textNode => {
                    if (textNode.textContent.trim()) {
                        textNode.textContent = translation;
                    }
                });
                
                element.innerHTML = tempDiv.innerHTML;
            } else {
                // Si es texto simple, actualizar directamente
                element.textContent = translation;
            }
        }
    });
}

/**
 * Función para obtener una traducción específica
 * @param {string} key - Clave de traducción
 * @param {string} language - Idioma
 * @returns {string} - Texto traducido
 */
function getTranslation(key, language) {
    const languageTranslations = translations[language];
    
    if (!languageTranslations) {
        console.warn(`Traducciones no encontradas para el idioma: ${language}`);
        return key;
    }
    
    const translation = languageTranslations[key];
    
    if (!translation) {
        console.warn(`Traducción no encontrada para la clave: ${key} en idioma: ${language}`);
        return key;
    }
    
    return translation;
}

/**
 * Función para inicializar el sistema de traducción
 */
function initTranslationSystem() {
    // Aplicar idioma inicial
    const initialLanguage = getCurrentLanguage();
    applyLanguage(initialLanguage);
    
    // Configurar event listener para el botón
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
        
        // Agregar efecto de hover
        languageToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        languageToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    console.log('🌍 Sistema de traducción inicializado');
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Función para obtener el idioma actual
 * @returns {string} - Idioma actual
 */
function getLanguage() {
    return getCurrentLanguage();
}

/**
 * Función para establecer un idioma específico
 * @param {string} language - Idioma a establecer
 */
function setLanguage(language) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
        applyLanguage(language);
    } else {
        console.warn(`Idioma no soportado: ${language}. Idiomas soportados: ${SUPPORTED_LANGUAGES.join(', ')}`);
    }
}

/**
 * Función para verificar si el idioma es español
 * @returns {boolean} - True si es español
 */
function isSpanish() {
    return getCurrentLanguage() === 'es';
}

/**
 * Función para verificar si el idioma es inglés
 * @returns {boolean} - True si es inglés
 */
function isEnglish() {
    return getCurrentLanguage() === 'en';
}

// ===== FUNCIONES DE ANIMACIÓN =====

/**
 * Función para animar el cambio de idioma
 */
function animateLanguageChange() {
    // Crear overlay de transición
    const overlay = document.createElement('div');
    overlay.className = 'language-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Animar entrada
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        
        // Animar salida después de un breve delay
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 300);
        }, 150);
    });
}

// ===== FUNCIONES DE ACCESIBILIDAD =====

/**
 * Función para manejar navegación por teclado para el cambio de idioma
 */
function handleKeyboardLanguageToggle(e) {
    // Alt + L para alternar idioma
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
    }
}

// ===== FUNCIONES DE PERSISTENCIA =====

/**
 * Función para exportar configuración de idioma
 * @returns {Object} - Configuración actual
 */
function exportLanguageConfig() {
    return {
        language: getCurrentLanguage(),
        supportedLanguages: SUPPORTED_LANGUAGES,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
}

/**
 * Función para importar configuración de idioma
 * @param {Object} config - Configuración a importar
 */
function importLanguageConfig(config) {
    if (config && config.language) {
        setLanguage(config.language);
    }
}

// ===== FUNCIONES DE DEBUG =====

/**
 * Función para mostrar información de debug del idioma
 */
function debugLanguageInfo() {
    const info = {
        currentLanguage: getCurrentLanguage(),
        savedLanguage: localStorage.getItem(LANGUAGE_STORAGE_KEY),
        browserLanguage: navigator.language,
        htmlAttribute: htmlElement.getAttribute('lang'),
        supportedLanguages: SUPPORTED_LANGUAGES,
        timestamp: new Date().toISOString()
    };
    
    console.log('🌍 Información del idioma:', info);
    return info;
}

/**
 * Función para listar todas las claves de traducción
 * @returns {Object} - Objeto con todas las claves
 */
function listTranslationKeys() {
    const keys = {};
    
    SUPPORTED_LANGUAGES.forEach(lang => {
        keys[lang] = Object.keys(translations[lang]);
    });
    
    console.log('🔑 Claves de traducción disponibles:', keys);
    return keys;
}

// ===== FUNCIONES DE VALIDACIÓN =====

/**
 * Función para validar que todas las traducciones estén completas
 * @returns {Object} - Resultado de la validación
 */
function validateTranslations() {
    const results = {
        valid: true,
        missing: {},
        extra: {}
    };
    
    const baseLanguage = 'es';
    const baseKeys = Object.keys(translations[baseLanguage]);
    
    SUPPORTED_LANGUAGES.forEach(lang => {
        if (lang === baseLanguage) return;
        
        const langKeys = Object.keys(translations[lang]);
        const missingKeys = baseKeys.filter(key => !langKeys.includes(key));
        const extraKeys = langKeys.filter(key => !baseKeys.includes(key));
        
        if (missingKeys.length > 0) {
            results.valid = false;
            results.missing[lang] = missingKeys;
        }
        
        if (extraKeys.length > 0) {
            results.extra[lang] = extraKeys;
        }
    });
    
    console.log('✅ Validación de traducciones:', results);
    return results;
}

// ===== EVENT LISTENERS =====

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTranslationSystem);

// Manejar navegación por teclado
document.addEventListener('keydown', handleKeyboardLanguageToggle);

// Manejar cambios en el almacenamiento (para sincronización entre pestañas)
window.addEventListener('storage', function(e) {
    if (e.key === LANGUAGE_STORAGE_KEY) {
        const newLanguage = e.newValue || DEFAULT_LANGUAGE;
        applyLanguage(newLanguage);
    }
});

// ===== EXPORTAR FUNCIONES =====

// Hacer funciones disponibles globalmente
window.LanguageManager = {
    getLanguage,
    setLanguage,
    toggleLanguage,
    isSpanish,
    isEnglish,
    getTranslation,
    exportLanguageConfig,
    importLanguageConfig,
    debugLanguageInfo,
    listTranslationKeys,
    validateTranslations
};

// ===== ESTILOS CSS DINÁMICOS =====

// Agregar estilos para transiciones de idioma
const languageStyles = document.createElement('style');
languageStyles.textContent = `
    .language-transitioning * {
        transition: all 0.3s ease !important;
    }
    
    .language-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    #languageToggle {
        transition: transform 0.2s ease;
    }
    
    #languageToggle:hover {
        transform: scale(1.1);
    }
    
    #languageToggle:active {
        transform: scale(0.95);
    }
`;

document.head.appendChild(languageStyles);

// ===== FUNCIONES DE MIGRACIÓN =====

/**
 * Función para migrar configuraciones antiguas de idioma
 */
function migrateOldLanguageSettings() {
    // Buscar configuraciones antiguas y migrarlas
    const oldKeys = ['language', 'locale', 'lang'];
    
    oldKeys.forEach(key => {
        const oldValue = localStorage.getItem(key);
        if (oldValue) {
            // Migrar valor antiguo a nuevo formato
            let newLanguage = DEFAULT_LANGUAGE;
            
            if (oldValue === 'en' || oldValue === 'english') {
                newLanguage = 'en';
            } else if (oldValue === 'es' || oldValue === 'spanish' || oldValue === 'español') {
                newLanguage = 'es';
            }
            
            // Aplicar idioma migrado
            applyLanguage(newLanguage);
            
            // Limpiar valor antiguo
            localStorage.removeItem(key);
            
            console.log(`Migrado idioma desde clave "${key}": ${oldValue} -> ${newLanguage}`);
        }
    });
}

// Ejecutar migración al cargar
document.addEventListener('DOMContentLoaded', migrateOldLanguageSettings);

// Ejecutar validación en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(validateTranslations, 1000);
    });
}

console.log('🌍 Módulo de traducción cargado');
