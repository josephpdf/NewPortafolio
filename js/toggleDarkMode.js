/**
 * Toggle Dark Mode - Funcionalidad de cambio de tema
 * Maneja el cambio entre modo claro y oscuro con persistencia
 */

// ===== VARIABLES GLOBALES =====
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// ===== CONFIGURACIÓN =====
const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_ATTRIBUTE = 'data-theme';

// ===== FUNCIONES PRINCIPALES =====

/**
 * Función para obtener el tema actual del localStorage
 * @returns {string} - 'dark' o 'light'
 */
function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    // Si hay un tema guardado, usarlo
    if (savedTheme) {
        return savedTheme;
    }
    
    // Si no hay tema guardado, detectar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    // Por defecto, modo claro
    return 'light';
}

/**
 * Función para aplicar el tema
 * @param {string} theme - 'dark' o 'light'
 */
function applyTheme(theme) {
    // Aplicar atributo al HTML
    htmlElement.setAttribute(THEME_ATTRIBUTE, theme);
    
    // Guardar en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Actualizar ícono del botón
    updateToggleIcon(theme);
    
    // Disparar evento personalizado para otros scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    
    // Agregar clase de transición temporal
    bodyElement.classList.add('theme-transitioning');
    setTimeout(() => {
        bodyElement.classList.remove('theme-transitioning');
    }, 300);
}

/**
 * Función para alternar entre temas
 */
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    
    // Mostrar notificación
    //const message = newTheme === 'dark' ? 'Modo oscuro activado' : 'Modo claro activado';
    //if (window.PortfolioApp && window.PortfolioApp.showNotification) {
        //window.PortfolioApp.showNotification(message, 'info');
    //}
}

/**
 * Función para actualizar el ícono del botón toggle
 * @param {string} theme - Tema actual
 */
function updateToggleIcon(theme) {
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    if (!icon) return;
    
    // Remover clases existentes
    icon.classList.remove('fa-moon', 'fa-sun');
    
    // Agregar clase correspondiente
    if (theme === 'dark') {
        icon.classList.add('fa-sun');
        darkModeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
        icon.classList.add('fa-moon');
        darkModeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
}

/**
 * Función para sincronizar con preferencias del sistema
 */
function syncWithSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
        // Solo cambiar si no hay tema guardado manualmente
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    };
    
    // Escuchar cambios en preferencias del sistema
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
    } else {
        // Fallback para navegadores antiguos
        mediaQuery.addListener(handleChange);
    }
}

/**
 * Función para inicializar el sistema de temas
 */
function initThemeSystem() {
    // Aplicar tema inicial
    const initialTheme = getCurrentTheme();
    applyTheme(initialTheme);
    
    // Configurar event listener para el botón
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
        
        // Agregar efecto de hover
        darkModeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.1)';
        });
        
        darkModeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
    
    // Sincronizar con preferencias del sistema
    syncWithSystemPreference();
    
    console.log('🌙 Sistema de temas inicializado');
}

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Función para obtener el tema actual
 * @returns {string} - Tema actual
 */
function getTheme() {
    return getCurrentTheme();
}

/**
 * Función para establecer un tema específico
 * @param {string} theme - Tema a establecer
 */
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
        applyTheme(theme);
    } else {
        console.warn('Tema inválido. Use "dark" o "light"');
    }
}

/**
 * Función para verificar si el modo oscuro está activo
 * @returns {boolean} - True si el modo oscuro está activo
 */
function isDarkMode() {
    return getCurrentTheme() === 'dark';
}

// ===== FUNCIONES DE ANIMACIÓN =====

/**
 * Función para animar el cambio de tema
 */
function animateThemeChange() {
    // Crear overlay de transición
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9999;
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
 * Función para manejar navegación por teclado para el toggle
 */
function handleKeyboardThemeToggle(e) {
    // Alt + T para alternar tema
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
}

// ===== FUNCIONES DE PERSISTENCIA =====

/**
 * Función para exportar configuración de tema
 * @returns {Object} - Configuración actual
 */
function exportThemeConfig() {
    return {
        theme: getCurrentTheme(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
}

/**
 * Función para importar configuración de tema
 * @param {Object} config - Configuración a importar
 */
function importThemeConfig(config) {
    if (config && config.theme) {
        setTheme(config.theme);
    }
}

// ===== FUNCIONES DE DEBUG =====

/**
 * Función para mostrar información de debug del tema
 */
function debugThemeInfo() {
    const info = {
        currentTheme: getCurrentTheme(),
        savedTheme: localStorage.getItem(THEME_STORAGE_KEY),
        systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
        htmlAttribute: htmlElement.getAttribute(THEME_ATTRIBUTE),
        timestamp: new Date().toISOString()
    };
    
    console.log('🎨 Información del tema:', info);
    return info;
}

// ===== EVENT LISTENERS =====

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initThemeSystem);

// Manejar navegación por teclado
document.addEventListener('keydown', handleKeyboardThemeToggle);

// Manejar cambios en el almacenamiento (para sincronización entre pestañas)
window.addEventListener('storage', function(e) {
    if (e.key === THEME_STORAGE_KEY) {
        const newTheme = e.newValue || 'light';
        applyTheme(newTheme);
    }
});

// ===== EXPORTAR FUNCIONES =====

// Hacer funciones disponibles globalmente
window.ThemeManager = {
    getTheme,
    setTheme,
    toggleTheme,
    isDarkMode,
    exportThemeConfig,
    importThemeConfig,
    debugThemeInfo
};

// ===== ESTILOS CSS DINÁMICOS =====

// Agregar estilos para transiciones de tema
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    .theme-transitioning * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
    
    .theme-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    #darkModeToggle {
        transition: transform 0.2s ease;
    }
    
    #darkModeToggle:hover {
        transform: rotate(15deg) scale(1.1);
    }
    
    #darkModeToggle:active {
        transform: scale(0.95);
    }
`;

document.head.appendChild(themeStyles);

// ===== FUNCIONES DE MIGRACIÓN =====

/**
 * Función para migrar configuraciones antiguas
 */
function migrateOldThemeSettings() {
    // Buscar configuraciones antiguas y migrarlas
    const oldKeys = ['darkMode', 'theme', 'colorScheme'];
    
    oldKeys.forEach(key => {
        const oldValue = localStorage.getItem(key);
        if (oldValue) {
            // Migrar valor antiguo a nuevo formato
            let newTheme = 'light';
            
            if (oldValue === 'true' || oldValue === 'dark') {
                newTheme = 'dark';
            }
            
            // Aplicar tema migrado
            applyTheme(newTheme);
            
            // Limpiar valor antiguo
            localStorage.removeItem(key);
            
            console.log(`Migrado tema desde clave "${key}": ${oldValue} -> ${newTheme}`);
        }
    });
}

// Ejecutar migración al cargar
document.addEventListener('DOMContentLoaded', migrateOldThemeSettings);

console.log('🌙 Módulo de tema cargado');
