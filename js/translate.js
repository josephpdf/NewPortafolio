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
        'hero.subtitle': 'Informático',
        'hero.description': 'Soy formado en el área de informática, poseo amplia experiencia en el área de soporte técnico, además que estudié desarrollo y participé del programa de Oracle Next Education donde incrementé mi conocimiento en desarrollo. Además que me estoy iniciando en el mundo de Blockchain y Web3.',
        'hero.viewProjects': 'Ver Proyectos',
        'hero.contactMe': 'Contactar',
        'hero.location': 'Costa Rica',
        
        // About Section
        'about.title': 'Sobre Mí',
        'about.subtitle': 'Conoce más sobre mi experiencia y habilidades',
        'about.description': 'Técnico en soporte con más de 6 años de experiencia en infraestructura tecnológica, atención a usuarios y gestión de sistemas empresariales. Actualmente en transición hacia el desarrollo de software, con experiencia en proyectos open source, hackathones y tecnologías blockchain como Starknet y Ethereum.',
        'about.passion': 'Me destaco por la resolución de problemas, iniciativa y capacidad de adaptación a nuevos retos tecnológicos. Busco integrarme a equipos de desarrollo donde pueda aplicar mis habilidades, resolver problemas complejos y seguir creciendo como profesional tech.',
        'about.skills': 'Habilidades Técnicas',
        
        // Skills Section
        'skills.title': 'Habilidades Técnicas',
        'skills.subtitle': 'Tecnologías y herramientas que domino',
        
        // Education Section
        'education.title': 'Formación y Certificaciones',
        'education.subtitle': 'Mi trayectoria educativa y certificaciones más recientes',
        'education.educationTitle': 'Educación',
        'education.certificationsTitle': 'Certificaciones Destacadas',
        
        // Projects Section
        'projects.title': 'Proyectos',
        'projects.subtitle': 'Algunos de mis trabajos más destacados',
        
        // Contact Section
        'contact.title': 'Contacto',
        'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
        'contact.location-title': 'Ubicación',
        'contact.availability-title': 'Disponibilidad',
        'contact.availability-description': 'Disponible para proyectos freelance',
        'contact.followMe': 'Sígueme en redes sociales',
        'contact.downloadCV': 'Descargar CV',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.madeWith': 'Realizado con HTML, CSS y JavaScript',

        // Skills Section (Spanish)
        'skills.languagesTitle': 'Lenguajes y Tecnologías',
        'skills.htmlcssjs': 'HTML, CSS, JavaScript',
        'skills.soliditycairo': 'Solidity, Cairo',
        'skills.react': 'React',
        'skills.javapython': 'Java, Python',

        'skills.web3Title': 'Web3 y Blockchain',
        'skills.starkneteth': 'Starknet, Ethereum',
        'skills.smartcontracts': 'Smart Contracts',
        'skills.tokenization': 'Tokenización',

        'skills.toolsTitle': 'Herramientas',
        'skills.github': 'GitHub',
        'skills.microsoft365': 'Microsoft 365',
        'skills.planner': 'Planner',
        'skills.eset': 'ESET Security',

        'skills.databasesTitle': 'Bases de Datos',
        'skills.mysql': 'MySQL',
        'skills.oci': 'OCI Analytics',
        'skills.documentation': 'Documentación Técnica',

        'skills.agileTitle': 'Metodologías Ágiles',
        'skills.scrum': 'Scrum',
        'skills.kanban': 'Kanban',
        'skills.projectmgmt': 'Gestión de Proyectos',

        'skills.softskillsTitle': 'Habilidades Blandas',
        'skills.problemSolving': 'Resolución de problemas',
        'skills.learning': 'Aprendizaje continuo',
        'skills.communication': 'Comunicación efectiva',
        'skills.collaboration': 'Colaboración y trabajo remoto',

        // Certificaciones
        'cert.blockchain': '<strong>Blockchain, Solidity y Gobernanza</strong> (Universidad CENFOTEC)',
        'cert.oracle': '<strong>React, MySQL, OCI, Java OO, Spring Boot, IA Generativa</strong> (Oracle Next Education + Alura Latam)',
        'cert.python': '<strong>Python Essentials y Data Science Intro</strong> (CISCO)',
        'cert.microsoft': '<strong>Microsoft 365</strong> (Udemy), <strong>Excel Avanzado</strong> (Instituto Municipal de Educación de Cartago)',
        'cert.english': '<strong>Inglés básico digital – B2+</strong> (Instituto Municipal de Educación de Cartago)',

        // Ejemplo de títulos de educación (si quieres traducirlos)
        'education.diploma': 'Diplomado en Tecnologías de Información',
        'education.technical': 'Técnico medio en Mantenimiento y Reparación de equipo de Cómputo',
        'education.colegio': 'Colegio Universitario de Cartago',
        'education.institutoJimenez': 'Instituto Jiménez',

        // Projects Section (Spanish)
        'project.starklotto.title': 'StarkLotto - Lotería Descentralizada',
        'project.starklotto.desc': 'La lotería descentralizada más innovadora en la blockchain de Starknet. Juega, gana y sé parte del futuro.',
        'project.starklotto.tech1': 'Starknet',
        'project.starklotto.tech2': 'Blockchain',
        'project.starklotto.tech3': 'React',
        'project.starklotto.tech4': 'Web3',
        'project.starklotto.tech5': 'Cairo',

        // PetVerse
        'project.petverse.title': 'PetVerse (En construcción)',
        'project.petverse.desc': 'Plataforma descentralizada para conectar dueños de mascotas con servicios locales confiables (veterinarios, paseadores, tiendas, etc). Construido con tecnologías Web3 modernas sobre Starknet.',
        'project.petverse.tech1': 'Starknet',
        'project.petverse.tech2': 'Cairo',
        'project.petverse.tech3': 'React',
        'project.petverse.tech4': 'Next.js',
        'project.petverse.tech5': 'Web3',

        // Barbería Alura
        'project.barberia.title': 'Barbería Alura',
        'project.barberia.desc': 'Primer página web desarrollada como parte de la formación en Oracle Next Education (Alura Latam). Proyecto enfocado en HTML5 y CSS3, aplicando buenas prácticas de maquetación y estilos.',
        'project.barberia.tech1': 'HTML5',
        'project.barberia.tech2': 'CSS3',

        // Encriptador de texto
        'project.encriptador.title': 'Encriptador de texto',
        'project.encriptador.desc': 'Aplicación web para encriptar y desencriptar mensajes de texto. Proyecto realizado como parte de la formación en el curso Oracle Next Education (Alura Latam).',
        'project.encriptador.tech1': 'HTML',
        'project.encriptador.tech2': 'CSS',
        'project.encriptador.tech3': 'JavaScript',

        // Mini Alura
        'project.miniAlura.title': 'Mini Alura',
        'project.miniAlura.desc': 'Mini plataforma de cursos inspirada en Alura. Proyecto de práctica realizado como parte de la formación de front end en Oracle Next Education (Alura Latam).',
        'project.miniAlura.tech1': 'HTML',
        'project.miniAlura.tech2': 'CSS',

        // Recetario con Vue.js
        'project.recetario.title': 'Recetario con Vue.js',
        'project.recetario.desc': 'Aplicación de recetas que muestra la conexión de Vue.js con una API externa. Proyecto creado para un taller universitario donde expuse sobre el framework Vue.js.',
        'project.recetario.tech1': 'Vue.js',
        'project.recetario.tech2': 'JavaScript',
        'project.recetario.tech3': 'CSS',

        // Apeperia
        'project.apeperia.title': 'Apeperia',
        'project.apeperia.desc': 'Proyecto front end desarrollado con la modalidad mobile first como parte de la formación de front end en Oracle Next Education (Alura Latam). Simula una empresa de desarrollo de aplicaciones móviles y web, con enfoque en diseño responsivo y experiencia de usuario.',
        'project.apeperia.tech1': 'HTML',
        'project.apeperia.tech2': 'CSS',

        // Fruta y Fruto
        'project.frutaFruto.title': 'Fruta y Fruto',
        'project.frutaFruto.desc': 'Proyecto de la formación de front end de Oracle Next Education (Alura Latam), enfocado en arquitectura CSS y buenas prácticas. Sitio de recetas saludables y aprovechamiento de alimentos.',
        'project.frutaFruto.tech1': 'HTML',
        'project.frutaFruto.tech2': 'CSS',

        // TODO App
        'project.todoApp.title': 'TODO App (DOM con JS)',
        'project.todoApp.desc': 'Aplicación de lista de tareas para practicar manipulación del DOM con JavaScript. Proyecto realizado como parte del curso de Oracle Next Education (Alura Latam).',
        'project.todoApp.tech1': 'HTML',
        'project.todoApp.tech2': 'CSS',
        'project.todoApp.tech3': 'JavaScript',

        // PetShop
        'project.petShop.title': 'PetShop',
        'project.petShop.desc': 'Aplicación web para gestión de una tienda de mascotas, desarrollada como parte de la formación en Oracle Next Education (Alura Latam). Permite registrar productos, clientes y realizar validaciones de formularios.',
        'project.petShop.tech1': 'HTML',
        'project.petShop.tech2': 'CSS',
        'project.petShop.tech3': 'JavaScript',

        // Rick & Morty API
        'project.rickMorty.title': 'Rick & Morty API (React)',
        'project.rickMorty.desc': 'Aplicación web desarrollada en React que consume la API pública de Rick & Morty para mostrar personajes, episodios y ubicaciones de la serie. Permite filtrar y buscar información de manera interactiva.',
        'project.rickMorty.tech1': 'React',
        'project.rickMorty.tech2': 'JavaScript',
        'project.rickMorty.tech3': 'API REST',

        // Starklings-App
        'project.starklings.title': 'Starklings-App (Cairo)',
        'project.starklings.desc': 'Repositorio donde practico el lenguaje Cairo resolviendo ejercicios de Starklings, una colección de desafíos para aprender desarrollo en Starknet y conceptos de blockchain.',
        'project.starklings.tech1': 'Cairo',
        'project.starklings.tech2': 'Starknet',
        'project.starklings.tech3': 'Blockchain',

        // SpeedRun Ethereum
        'project.speedRun.title': 'SpeedRun Ethereum',
        'project.speedRun.desc': 'Práctica intensiva de desarrollo Web3 y contratos inteligentes en Ethereum, utilizando Scaffold-ETH 2, Hardhat y Next.js. Incluye retos de NFT, wallets y despliegue en testnet. Proyecto con frontend y smart contracts propios.',
        'project.speedRun.tech1': 'Ethereum',
        'project.speedRun.tech2': 'Solidity',
        'project.speedRun.tech3': 'Next.js',
        'project.speedRun.tech4': 'Hardhat',
        'project.speedRun.tech5': 'Web3',

        // San José Indoor Club
        'project.sanJoseIndoorClub.title': 'San José Indoor Club - WebSite',
        'project.sanJoseIndoorClub.desc': 'Desarrollo completo de la página web institucional para el San José Indoor Club. Proyecto realizado desde cero con tecnologías modernas (TypeScript, Vite, Tailwind CSS), enfocado en brindar una experiencia atractiva y funcional para los usuarios del club. El proyecto no llegó a publicarse en producción.',
        'project.sanJoseIndoorClub.tech1': 'TypeScript',
        'project.sanJoseIndoorClub.tech2': 'Vite',
        'project.sanJoseIndoorClub.tech3': 'Tailwind CSS',
        'project.sanJoseIndoorClub.tech4': 'HTML',
        'project.sanJoseIndoorClub.tech5': 'CSS',

        // Learn-Solidity
        'project.learnSolidity.title': 'Learn-Solidity',
        'project.learnSolidity.desc': 'Repositorio donde practico y aprendo el lenguaje Solidity, desarrollando y probando smart contracts en la blockchain de Ethereum. Incluye ejercicios y ejemplos de cursos y documentación oficial.',
        'project.learnSolidity.tech1': 'Solidity',
        'project.learnSolidity.tech2': 'Ethereum',
        'project.learnSolidity.tech3': 'Smart Contracts',

        // ALL IT CR
        'project.allItCr.title': 'ALL IT CR - Plataforma Empresarial',
        'project.allItCr.desc': 'Proyecto de graduación universitaria: desarrollo completo de la plataforma web para ALL IT CR, empresa de soluciones integrales en tecnología, soporte, hosting y facturación electrónica. Incluye diseño, desarrollo y despliegue del sitio institucional y catálogo de servicios.',
        'project.allItCr.tech1': 'HTML',
        'project.allItCr.tech2': 'CSS',
        'project.allItCr.tech3': 'JavaScript',
        'project.allItCr.tech4': 'Web Hosting',
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
        'hero.subtitle': 'IT Professional',
        'hero.description': 'I am a formated IT professional with extensive experience in technical support, and I have studied development and participated in the Oracle Next Education program where I increased my knowledge in development. In addition, I am starting to work in the world of Blockchain and Web3.',
        'hero.viewProjects': 'View Projects',
        'hero.contactMe': 'Contact Me',
        'hero.location': 'Costa Rica',
        
        // About Section
        'about.title': 'About Me',
        'about.subtitle': 'Learn more about my experience and skills',
        'about.description': 'IT professional with over 6 years of experience in technical support, infrastructure, user support, and enterprise system management. Currently transitioning to software development, with experience in open source projects, hackathons, and blockchain technologies like Starknet and Ethereum.',
        'about.passion': 'I stand out for problem-solving, initiative, and the ability to adapt to new technological challenges. I seek to integrate into development teams where I can apply my skills, solve complex problems, and continue growing as a tech professional.',
        'about.skills': 'Technical Skills',
        
        // Skills Section
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies and tools I master',
        
        // Education Section
        'education.title': 'Education and Certifications',
        'education.subtitle': 'My educational background and most recent certifications',
        'education.educationTitle': 'Education',
        'education.certificationsTitle': 'Featured Certifications',
        
        // Projects Section
        'projects.title': 'Projects',
        'projects.subtitle': 'Some of my most outstanding works',
        
        // Contact Section
        'contact.title': 'Contact',
        'contact.subtitle': 'Have a project in mind? Let\'s talk!',
        'contact.location-title': 'Location',
        'contact.availability-title': 'Availability',
        'contact.availability-description': 'Available for freelance projects',
        'contact.followMe': 'Follow me on social media',
        'contact.downloadCV': 'Download CV',
        
        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.madeWith': 'Developed with HTML, CSS, and JavaScript.',

        // Skills Section (English)
        'skills.languagesTitle': 'Languages and Technologies',
        'skills.htmlcssjs': 'HTML, CSS, JavaScript',
        'skills.soliditycairo': 'Solidity, Cairo',
        'skills.react': 'React',
        'skills.javapython': 'Java, Python',

        'skills.web3Title': 'Web3 and Blockchain',
        'skills.starkneteth': 'Starknet, Ethereum',
        'skills.smartcontracts': 'Smart Contracts',
        'skills.tokenization': 'Tokenization',

        'skills.toolsTitle': 'Tools',
        'skills.github': 'GitHub',
        'skills.microsoft365': 'Microsoft 365',
        'skills.planner': 'Planner',
        'skills.eset': 'ESET Security',

        'skills.databasesTitle': 'Databases',
        'skills.mysql': 'MySQL',
        'skills.oci': 'OCI Analytics',
        'skills.documentation': 'Technical Documentation',

        'skills.agileTitle': 'Agile Methodologies',
        'skills.scrum': 'Scrum',
        'skills.kanban': 'Kanban',
        'skills.projectmgmt': 'Project Management',

        'skills.softskillsTitle': 'Soft Skills',
        'skills.problemSolving': 'Problem Solving',
        'skills.learning': 'Continuous Learning',
        'skills.communication': 'Effective Communication',
        'skills.collaboration': 'Collaboration and Remote Work',

        // Certificaciones
        'cert.blockchain': '<strong>Blockchain, Solidity and Governance</strong> (CENFOTEC University)',
        'cert.oracle': '<strong>React, MySQL, OCI, Java OOP, Spring Boot, Generative AI</strong> (Oracle Next Education + Alura Latam)',
        'cert.python': '<strong>Python Essentials and Data Science Intro</strong> (CISCO)',
        'cert.microsoft': '<strong>Microsoft 365</strong> (Udemy), <strong>Advanced Excel</strong> (Municipal Institute of Education of Cartago)',
        'cert.english': '<strong>Digital Basic English – B2+</strong> (Municipal Institute of Education of Cartago)',

        // Ejemplo de títulos de educación (si quieres traducirlos)
        'education.diploma': 'Diploma in Information Technologies',
        'education.technical': 'Technical Degree in Computer Equipment Maintenance and Repair',
        'education.colegio': 'University College of Cartago',
        'education.institutoJimenez': 'Jiménez Institute',

        // Projects Section (English)
        'project.starklotto.title': 'StarkLotto - Decentralized Lottery',
        'project.starklotto.desc': 'The most innovative decentralized lottery on the Starknet blockchain. Play, win, and be part of the future.',
        'project.starklotto.tech1': 'Starknet',
        'project.starklotto.tech2': 'Blockchain',
        'project.starklotto.tech3': 'React',
        'project.starklotto.tech4': 'Web3',
        'project.starklotto.tech5': 'Cairo',

        // PetVerse
        'project.petverse.title': 'PetVerse (Under Construction)',
        'project.petverse.desc': 'Decentralized platform to connect pet owners with reliable local services (vets, walkers, stores, etc). Built with modern Web3 technologies on Starknet.',
        'project.petverse.tech1': 'Starknet',
        'project.petverse.tech2': 'Cairo',
        'project.petverse.tech3': 'React',
        'project.petverse.tech4': 'Next.js',
        'project.petverse.tech5': 'Web3',

        // Barbería Alura
        'project.barberia.title': 'Barbería Alura',
        'project.barberia.desc': 'First website developed as part of the Oracle Next Education (Alura Latam) program. Focused on HTML5 and CSS3, applying best practices in layout and styles.',
        'project.barberia.tech1': 'HTML5',
        'project.barberia.tech2': 'CSS3',

        // Encriptador de texto
        'project.encriptador.title': 'Text Encryptor',
        'project.encriptador.desc': 'Web application to encrypt and decrypt text messages. Project carried out as part of the Oracle Next Education (Alura Latam) course.',
        'project.encriptador.tech1': 'HTML',
        'project.encriptador.tech2': 'CSS',
        'project.encriptador.tech3': 'JavaScript',

        // Mini Alura
        'project.miniAlura.title': 'Mini Alura',
        'project.miniAlura.desc': 'Mini course platform inspired by Alura. Practice project as part of the front-end training in Oracle Next Education.',
        'project.miniAlura.tech1': 'HTML',
        'project.miniAlura.tech2': 'CSS',

        // Recetario con Vue.js
        'project.recetario.title': 'Recipe Book with Vue.js',
        'project.recetario.desc': 'Recipe application showing Vue.js connection with an external API. Created for a university workshop where I presented about the Vue.js framework.',
        'project.recetario.tech1': 'Vue.js',
        'project.recetario.tech2': 'JavaScript',
        'project.recetario.tech3': 'CSS',

        // Apeperia
        'project.apeperia.title': 'Apeperia',
        'project.apeperia.desc': 'Front-end project developed with a mobile-first approach as part of the Oracle Next Education front-end training. Simulates a mobile and web app development company, focusing on responsive design and user experience.',
        'project.apeperia.tech1': 'HTML',
        'project.apeperia.tech2': 'CSS',

        // Fruta y Fruto
        'project.frutaFruto.title': 'Fruta y Fruto',
        'project.frutaFruto.desc': 'Front-end training project from Oracle Next Education, focused on CSS architecture and best practices. Healthy recipes and food utilization site.',
        'project.frutaFruto.tech1': 'HTML',
        'project.frutaFruto.tech2': 'CSS',

        // TODO App
        'project.todoApp.title': 'TODO App (DOM with JS)',
        'project.todoApp.desc': 'Task list application to practice DOM manipulation with JavaScript. Project carried out as part of the Alura course.',
        'project.todoApp.tech1': 'HTML',
        'project.todoApp.tech2': 'CSS',
        'project.todoApp.tech3': 'JavaScript',

        // PetShop
        'project.petShop.title': 'PetShop',
        'project.petShop.desc': 'Web application for managing a pet shop, developed as part of the Alura Latam training. Allows registering products, clients, and performing form validations.',
        'project.petShop.tech1': 'HTML',
        'project.petShop.tech2': 'CSS',
        'project.petShop.tech3': 'JavaScript',

        // Rick & Morty API
        'project.rickMorty.title': 'Rick & Morty API (React)',
        'project.rickMorty.desc': 'Web application developed in React that consumes the public Rick & Morty API to display characters, episodes, and locations. Allows filtering and searching interactively.',
        'project.rickMorty.tech1': 'React',
        'project.rickMorty.tech2': 'JavaScript',
        'project.rickMorty.tech3': 'API REST',

        // Starklings-App
        'project.starklings.title': 'Starklings-App (Cairo)',
        'project.starklings.desc': 'Repository where I practice the Cairo language by solving Starklings exercises, a collection of challenges to learn Starknet development and blockchain concepts.',
        'project.starklings.tech1': 'Cairo',
        'project.starklings.tech2': 'Starknet',
        'project.starklings.tech3': 'Blockchain',

        // SpeedRun Ethereum
        'project.speedRun.title': 'SpeedRun Ethereum',
        'project.speedRun.desc': 'Intensive Web3 and smart contract development practice on Ethereum, using Scaffold-ETH 2, Hardhat, and Next.js. Includes NFT, wallet, and testnet deployment challenges. Project with its own frontend and smart contracts.',
        'project.speedRun.tech1': 'Ethereum',
        'project.speedRun.tech2': 'Solidity',
        'project.speedRun.tech3': 'Next.js',
        'project.speedRun.tech4': 'Hardhat',
        'project.speedRun.tech5': 'Web3',

        // San José Indoor Club
        'project.sanJoseIndoorClub.title': 'San José Indoor Club - WebSite',
        'project.sanJoseIndoorClub.desc': 'Full development of the institutional website for San José Indoor Club. Project carried out from scratch with modern technologies (TypeScript, Vite, Tailwind CSS), focused on providing an attractive and functional experience for club users. The project was not published in production.',
        'project.sanJoseIndoorClub.tech1': 'TypeScript',
        'project.sanJoseIndoorClub.tech2': 'Vite',
        'project.sanJoseIndoorClub.tech3': 'Tailwind CSS',
        'project.sanJoseIndoorClub.tech4': 'HTML',
        'project.sanJoseIndoorClub.tech5': 'CSS',

        // Learn-Solidity
        'project.learnSolidity.title': 'Learn-Solidity',
        'project.learnSolidity.desc': 'Repository where I practice and learn the Solidity language, developing and testing smart contracts on the Ethereum blockchain. Includes exercises and examples from courses and official documentation.',
        'project.learnSolidity.tech1': 'Solidity',
        'project.learnSolidity.tech2': 'Ethereum',
        'project.learnSolidity.tech3': 'Smart Contracts',

        // ALL IT CR
        'project.allItCr.title': 'ALL IT CR - Business Platform',
        'project.allItCr.desc': 'University graduation project: full development of the web platform for ALL IT CR, a company providing comprehensive technology, support, hosting, and electronic invoicing solutions. Includes design, development, and deployment of the institutional site and service catalog.',
        'project.allItCr.tech1': 'HTML',
        'project.allItCr.tech2': 'CSS',
        'project.allItCr.tech3': 'JavaScript',
        'project.allItCr.tech4': 'Web Hosting',
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
