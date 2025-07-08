/**
 * Toggle Dark Mode - Funcionalidad de cambio de tema
 * Maneja el cambio entre modo claro, oscuro y sistema con persistencia
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
 * @returns {string} - 'dark', 'light' o 'system'
 */
function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    // Si hay un tema guardado, usarlo
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'system')) {
        return savedTheme;
    }
    
    // Por defecto, usar sistema
    return 'system';
}

/**
 * Función para obtener el tema efectivo (resuelve 'system')
 * @returns {string} - 'dark' o 'light'
 */
function getEffectiveTheme() {
    const theme = getCurrentTheme();
    
    if (theme === 'system') {
        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    return theme;
}

/**
 * Función para aplicar el tema
 * @param {string} theme - 'dark', 'light' o 'system'
 */
function applyTheme(theme) {
    const effectiveTheme = theme === 'system' ? getEffectiveTheme() : theme;
    
    // Aplicar atributo al HTML
    htmlElement.setAttribute(THEME_ATTRIBUTE, effectiveTheme);
    
    // Guardar en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // Actualizar ícono del botón
    updateToggleIcon(theme);
    
    // Disparar evento personalizado para otros scripts
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme, effectiveTheme } }));
    
    // Agregar clase de transición temporal
    bodyElement.classList.add('theme-transitioning');
    setTimeout(() => {
        bodyElement.classList.remove('theme-transitioning');
    }, 300);
}

/**
 * Función para alternar entre temas (claro -> oscuro -> sistema -> claro)
 */
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    let newTheme;
    
    // Ciclo: claro -> oscuro -> sistema -> claro
    switch (currentTheme) {
        case 'light':
            newTheme = 'dark';
            break;
        case 'dark':
            newTheme = 'system';
            break;
        case 'system':
        default:
            newTheme = 'light';
            break;
    }
    
    applyTheme(newTheme);
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
    icon.classList.remove('fa-moon', 'fa-sun', 'fa-desktop');
    
    // Agregar clase correspondiente
    switch (theme) {
        case 'dark':
            icon.classList.add('fa-sun');
            darkModeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
            break;
        case 'light':
            icon.classList.add('fa-moon');
            darkModeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
            break;
        case 'system':
            icon.classList.add('fa-desktop');
            darkModeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
            break;
    }
}

/**
 * Función para sincronizar con preferencias del sistema
 */
function syncWithSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
        // Solo cambiar si el tema actual es 'system'
        if (getCurrentTheme() === 'system') {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute(THEME_ATTRIBUTE, newTheme);
            
            // Disparar evento
            window.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: 'system', effectiveTheme: newTheme } 
            }));
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
    
    console.log('🌙 Sistema de temas inicializado con tres opciones');
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
 * Función para obtener el tema efectivo
 * @returns {string} - Tema efectivo (dark/light)
 */
function getEffectiveTheme() {
    const theme = getCurrentTheme();
    
    if (theme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    return theme;
}

/**
 * Función para establecer un tema específico
 * @param {string} theme - Tema a establecer
 */
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light' || theme === 'system') {
        applyTheme(theme);
    } else {
        console.warn('Tema inválido. Use "dark", "light" o "system"');
    }
}

/**
 * Función para verificar si el modo oscuro está activo
 * @returns {boolean} - True si el modo oscuro está activo
 */
function isDarkMode() {
    return getEffectiveTheme() === 'dark';
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
    
    // Animar overlay
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }, 150);
}

// ===== FUNCIONES DE ACCESIBILIDAD =====

/**
 * Función para manejar atajos de teclado
 * @param {KeyboardEvent} e - Evento de teclado
 */
function handleKeyboardThemeToggle(e) {
    // Alt + T para alternar tema
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
}

// ===== FUNCIONES DE DEBUG =====

/**
 * Función para mostrar información de debug del tema
 */
function debugThemeInfo() {
    console.log('=== Información del Tema ===');
    console.log('Tema guardado:', getCurrentTheme());
    console.log('Tema efectivo:', getEffectiveTheme());
    console.log('Preferencia del sistema:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    console.log('Atributo HTML:', htmlElement.getAttribute(THEME_ATTRIBUTE));
    console.log('LocalStorage:', localStorage.getItem(THEME_STORAGE_KEY));
}

// ===== INICIALIZACIÓN =====

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
} else {
    initThemeSystem();
}

// Agregar event listener para atajos de teclado
document.addEventListener('keydown', handleKeyboardThemeToggle);

// Exportar funciones para uso global
window.ThemeManager = {
    getTheme,
    getEffectiveTheme,
    setTheme,
    toggleTheme,
    isDarkMode,
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
            let newTheme = 'system'; // Default to system
            
            if (oldValue === 'true' || oldValue === 'dark') {
                newTheme = 'dark';
            } else if (oldValue === 'false' || oldValue === 'light') {
                newTheme = 'light';
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
