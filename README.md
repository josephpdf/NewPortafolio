# 🚀 Portafolio Profesional - Joseph Poveda Flores

Un portafolio web moderno, responsivo y profesional desarrollado con HTML5, CSS3 y JavaScript. Incluye funcionalidades avanzadas como modo oscuro, sistema de traducción y animaciones fluidas.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con colores sobrios
- 📱 **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorio
- 🌙 **Modo Oscuro/Claro**: Cambio dinámico de tema con persistencia
- 🌍 **Multilingüe**: Soporte para español e inglés con cambio dinámico
- ⚡ **Rendimiento Optimizado**: Sin dependencias externas, carga rápida
- ♿ **Accesible**: Cumple con estándares de accesibilidad web
- 🎯 **SEO Optimizado**: Meta tags y estructura semántica
- 📄 **Secciones Completas**: Home, Sobre mí, Formación, Proyectos y Contacto

## 📁 Estructura del Proyecto

```
NewPortafolio/
├── 📄 index.html              # Página principal
├── 📁 css/
│   └── 📄 styles.css          # Estilos principales
├── 📁 js/
│   ├── 📄 script.js           # Funcionalidades principales
│   ├── 📄 toggleDarkMode.js   # Sistema de modo oscuro
│   └── 📄 translate.js        # Sistema de traducción
├── 📁 assets/
│   ├── 📁 cv/                 # Archivos de CV
│   ├── 📁 icons/              # Iconos y favicon
│   └── 📁 images/             # Imágenes del portafolio
└── 📄 README.md               # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Ejecutar Localmente

1. **Clona o descarga el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd NewPortafolio
   ```

2. **Abre el archivo index.html**
   - Doble clic en `index.html`

3. **Accede al portafolio**
   - Abre tu navegador
   - Ve a `http://localhost:PORT`

### Opción 2: Despliegue en GitHub Pages

1. **Sube el proyecto a GitHub**
2. **Ve a Settings > Pages**
3. **Selecciona la rama main**
4. **Tu portafolio estará disponible en:**
   `https://[tu-usuario].github.io/[nombre-repositorio]`

## 🎨 Personalización

### 1. Enlaces de Redes Sociales

En la sección de contacto, actualiza los enlaces:

```html
<div class="social-grid">
    <a href="https://linkedin.com/in/tu-perfil" class="social-link" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://github.com/tu-usuario" class="social-link" aria-label="GitHub">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://t.me/tu-usuario" class="social-link" aria-label="Telegram">
        <i class="fab fa-telegram"></i>
    </a>
    <a href="https://onlydust.xyz/tu-perfil" class="social-link" aria-label="OnlyDust">
        <i class="fas fa-code"></i>
    </a>
</div>
```

### 2. Información de Contacto

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <div>
        <h3>Email</h3>
        <p>tu-email@ejemplo.com</p>
    </div>
</div>
```

### 3. Proyectos

Edita la sección de proyectos en `index.html`:

```html
<article class="project-card">
    <div class="project-image">
        <i class="fas fa-project-icon"></i>
    </div>
    <div class="project-content">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción del proyecto...</p>
        <div class="project-tech">
            <span class="tech-tag">Tecnología 1</span>
            <span class="tech-tag">Tecnología 2</span>
        </div>
        <div class="project-links">
            <a href="URL_DEMO" class="btn btn-sm btn-primary">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
            <a href="URL_CODIGO" class="btn btn-sm btn-secondary">
                <i class="fab fa-github"></i> Código
            </a>
        </div>
    </div>
</article>
```

### 4. Formación Académica

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3>Tu Título Académico</h3>
            <span class="timeline-date">2020 - 2024</span>
        </div>
        <p class="timeline-institution">Tu Universidad</p>
        <p class="timeline-description">
            Descripción de tu formación...
        </p>
    </div>
</div>
```

### 5. Colores y Tema

Edita las variables CSS en `css/styles.css`:

```css
:root {
    /* Colores principales */
    --primary-color: #1e3a8a;    /* Azul marino */
    --primary-dark: #1e40af;     /* Azul más oscuro */
    --secondary-color: #64748b;  /* Gris */
    --accent-color: #3b82f6;     /* Azul claro */
    
    /* Personaliza más colores aquí */
}
```

### 6. CV en PDF

1. **Coloca tu CV en formato PDF** en la carpeta `assets/cv/`
2. **Actualiza el enlace** en `index.html`:

```html
<a href="assets/cv/tu-cv.pdf" class="btn btn-primary" download>
    <i class="fas fa-download"></i>
    <span data-translate="contact.downloadCV">Descargar CV</span>
</a>
```

## 🌍 Sistema de Traducción

### Agregar Nuevas Traducciones

Edita el archivo `js/translate.js`:

```javascript
const translations = {
    es: {
        // Traducciones en español
        'nueva.clave': 'Texto en español'
    },
    en: {
        // Traducciones en inglés
        'nueva.clave': 'Text in English'
    }
};
```

### Usar Traducciones en HTML

```html
<p data-translate="nueva.clave">Texto por defecto</p>
```

## 🌙 Sistema de Modo Oscuro

### Personalizar Colores del Modo Oscuro

En `css/styles.css`:

```css
[data-theme="dark"] {
    --bg-primary: #0f172a;      /* Fondo principal oscuro */
    --bg-secondary: #1e293b;    /* Fondo secundario oscuro */
    --text-primary: #f8fafc;    /* Texto principal claro */
    /* Personaliza más colores */
}
```

### Atajos de Teclado

- **Alt + T**: Alternar modo oscuro/claro
- **Alt + L**: Cambiar idioma

## 📱 Responsive Design

El portafolio está optimizado para:

- 📱 **Móviles**: 320px - 768px
- 📱 **Tablets**: 768px - 1024px
- 💻 **Escritorio**: 1024px+

### Breakpoints Principales

```css
@media (max-width: 1024px) {
    /* Tablets y pantallas medianas */
}

@media (max-width: 768px) {
    /* Móviles */
}

@media (max-width: 480px) {
    /* Móviles pequeños */
}
```

## ⚡ Optimización de Rendimiento

### Características Implementadas

- ✅ **Lazy Loading**: Imágenes cargan bajo demanda
- ✅ **CSS Optimizado**: Variables CSS y selectores eficientes
- ✅ **JavaScript Modular**: Código organizado y reutilizable
- ✅ **Sin Dependencias**: Solo HTML, CSS y JavaScript vanilla
- ✅ **Compresión**: Archivos optimizados para producción

### Recomendaciones Adicionales

1. **Comprimir imágenes** antes de subirlas
2. **Usar WebP** para mejor compresión
3. **Minificar archivos** en producción
4. **Habilitar Gzip** en el servidor

## 🔧 Funcionalidades JavaScript

### APIs Disponibles

```javascript
// Gestión de temas
window.ThemeManager.getTheme()
window.ThemeManager.setTheme('dark')
window.ThemeManager.toggleTheme()

// Gestión de idiomas
window.LanguageManager.getLanguage()
window.LanguageManager.setLanguage('en')
window.LanguageManager.toggleLanguage()

// Funciones del portafolio
window.PortfolioApp.showNotification('Mensaje', 'success')
window.PortfolioApp.addAnimation(element)
```

### Eventos Personalizados

```javascript
// Escuchar cambios de tema
window.addEventListener('themeChanged', (e) => {
    console.log('Tema cambiado a:', e.detail.theme);
});

// Escuchar cambios de idioma
window.addEventListener('languageChanged', (e) => {
    console.log('Idioma cambiado a:', e.detail.language);
});
```

## 🎯 SEO y Meta Tags

### Estructura Semántica

- ✅ **Header** con navegación
- ✅ **Main** con secciones principales
- ✅ **Footer** con información de contacto
- ✅ **Article** para proyectos
- ✅ **Section** para cada sección

## ♿ Accesibilidad

### Características Implementadas

- ✅ **Navegación por teclado**: Tab, Enter, Escape
- ✅ **Atributos ARIA**: Roles y estados
- ✅ **Contraste adecuado**: Cumple WCAG 2.1
- ✅ **Skip links**: Para navegación rápida
- ✅ **Textos alternativos**: Para imágenes
- ✅ **Focus visible**: Indicadores de foco

### Atajos de Teclado

- **Tab**: Navegar entre elementos
- **Enter**: Activar enlaces y botones
- **Escape**: Cerrar menú móvil
- **Alt + T**: Cambiar tema
- **Alt + L**: Cambiar idioma

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Las traducciones no funcionan**
   - Verifica que el archivo `translate.js` esté cargado
   - Revisa la consola del navegador para errores

2. **El modo oscuro no persiste**
   - Verifica que localStorage esté habilitado
   - Limpia el caché del navegador

3. **El menú móvil no funciona**
   - Verifica que el archivo `script.js` esté cargado
   - Revisa que los IDs coincidan en HTML y JS

4. **Las animaciones no se ven**
   - Verifica que CSS esté cargado correctamente
   - Revisa que el navegador soporte las propiedades CSS

### Debug

Abre la consola del navegador (F12) y usa:

```javascript
// Información del tema
window.ThemeManager.debugThemeInfo()

// Información del idioma
window.LanguageManager.debugLanguageInfo()

// Validar traducciones
window.LanguageManager.validateTranslations()
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

- **Email**: josephpovedaflores@gmail.com.com
- **LinkedIn**: [Tu perfil de LinkedIn]
- **GitHub**: [Tu perfil de GitHub]
- **Telegram**: [Tu usuario de Telegram]

## 🙏 Agradecimientos

- **Font Awesome** por los iconos
- **Google Fonts** por las tipografías
- **Comunidad de desarrolladores** por las mejores prácticas

---

**¡Gracias por usar este portafolio!** 🚀

Si te gustó el proyecto, considera darle una ⭐ en GitHub.
