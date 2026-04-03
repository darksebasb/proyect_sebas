// ============================================
// CONFIGURACIÓN DEL MENÚ - EDITAS SOLO AQUÍ
// ============================================

const menuConfig = [
    { id: 'btnalojamiento', texto: 'Alojamiento Web', url: 'alojamientoWeb.html' },
    { 
        id: 'btnprogramacion', 
        texto: 'Programación ▼', 
        url: '#',
        dropdown: true,
        subitems: [
            { texto: 'HTML', url: 'index.html' },
            { texto: 'CSS', url: 'css.html' },
            { texto: 'JavaScript', url: 'javascript.html' },
            { texto: 'Estructura de datos', url: 'estructuras-datos.html' },
            { texto: 'Ciclos', url: 'ciclos.html' },
            { texto: 'Condicionales', url: 'condicionales.html' },
            { texto: 'TypeScript', url: 'typescript.html' },
            { texto: 'Frameworks', url: 'frameworks.html' },
            { texto: 'Back y Front', url: 'backyfront.html' },
            { texto: 'Endpoint', url: 'endpoint.html' },
        ]
    },
    {
        id: 'btnbasesdedatos',
        texto: 'Bases de datos ▼',
        url: '#',
        dropdown: true,
        subitems: [
            {texto: 'Base de datos', url: 'base_de_datos.html'}
        ]
    },
    { 
        id: 'btnrepositorios',
        texto: 'Repositorios ▼',
        url: '#',
        dropdown: true,
        subitems: [
            {texto: 'Git', url: 'git.html'},
            {texto: 'GitHub', url: 'github.html'},
            {texto: 'GitLab', url: 'gitlab.html'}
        ]
    },
];

// ============================================
// REDIRECCIÓN ENTRE PÁGINAS
// ============================================
function actionRedirect(page) {
    window.location.href = page;
}

// ============================================
// TOGGLE DROPDOWN
// ============================================
function toggleDropdown(e, id) {
    e.preventDefault();
    e.stopPropagation();
    
    const submenu = document.getElementById('submenu-' + id);
    const boton = document.getElementById(id);
    
    if (!submenu) {
        console.error('No se encontró submenu-' + id);
        return;
    }
    
    const estaAbierto = submenu.classList.contains('show');
    
    cerrarTodosDropdowns();
    
    if (!estaAbierto) {
        submenu.classList.add('show');
        if (boton) boton.classList.add('dropdown-abierto');
    }
}

function cerrarTodosDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.classList.remove('dropdown-abierto');
    });
}

// ============================================
// FUNCIONES DEL MENÚ HAMBURGUESA (MÓVIL)
// ============================================
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const overlay = document.querySelector('.menu-overlay');
    const toggle = document.querySelector('.menu-toggle');
    
    if (nav.classList.contains('abierto')) {
        cerrarMenu();
    } else {
        nav.classList.add('abierto');
        overlay.classList.add('activo');
        toggle.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarMenu() {
    const nav = document.getElementById('main-nav');
    const overlay = document.querySelector('.menu-overlay');
    const toggle = document.querySelector('.menu-toggle');
    
    nav.classList.remove('abierto');
    overlay.classList.remove('activo');
    toggle.innerHTML = '☰';
    document.body.style.overflow = '';
}

// ============================================
// GENERAR NAVEGACIÓN - CON MENÚ HAMBURGUESA
// ============================================
function generarNavegacion() {
    // Crear botón hamburguesa (solo visible en móvil por CSS)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    menuToggle.onclick = toggleMenu;
    document.body.appendChild(menuToggle);
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.onclick = cerrarMenu;
    document.body.appendChild(overlay);
    
    // Crear nav
    const nav = document.createElement('nav');
    nav.className = 'tab-container';
    nav.id = 'main-nav';
    
    menuConfig.forEach(item => {
        if (item.dropdown) {
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';
            
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect dropdown-btn';
            btn.innerHTML = item.texto;
            btn.onclick = function(e) { 
                e.stopPropagation();
                toggleDropdown(e, item.id); 
            };
            
            const content = document.createElement('div');
            content.className = 'dropdown-content';
            content.id = 'submenu-' + item.id;
            
            const ul = document.createElement('ul');
            item.subitems.forEach(sub => {
                const a = document.createElement('a');
                a.href = sub.url;
                a.textContent = sub.texto;
                a.dataset.url = sub.url;
                // Cerrar menú al hacer clic en subitem (solo móvil)
                a.onclick = function() {
                    if (window.innerWidth <= 768) {
                        setTimeout(cerrarMenu, 100);
                    }
                };
                ul.appendChild(a);
            });
            
            content.appendChild(ul);
            dropdown.appendChild(btn);
            dropdown.appendChild(content);
            nav.appendChild(dropdown);
        } else {
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect';
            btn.textContent = item.texto;
            btn.onclick = function() { 
                actionRedirect(item.url);
                if (window.innerWidth <= 768) {
                    cerrarMenu();
                }
            };
            nav.appendChild(btn);
        }
    });
    
    document.body.insertBefore(nav, document.body.firstChild);
}

// ============================================
// GENERAR FOOTER
// ============================================
function generarFooterYScript() {
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>2026 Yosef. Todos los derechos reservados.</p>';
    document.body.appendChild(footer);
}

// ============================================
// RESALTAR BOTÓN ACTIVO Y SUBITEM ACTIVO
// ============================================
function marcarBotonActivo() {
    let paginaActual = window.location.pathname.split('/').pop();
    
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'index.html';
    }
    
    if (!paginaActual.includes('.') && paginaActual !== '') {
        paginaActual += '.html';
    }
    
    // Limpiar todas las clases activas
    document.querySelectorAll('.boton-redirect').forEach(btn => {
        btn.classList.remove('activo');
    });
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.classList.remove('activo');
    });
    
    // Buscar botón padre y subitem
    let botonPadreId = null;
    let subitemActivo = null;
    
    for (let item of menuConfig) {
        if (item.dropdown) {
            for (let sub of item.subitems) {
                if (sub.url === paginaActual) {
                    botonPadreId = item.id;
                    subitemActivo = sub.url;
                    break;
                }
            }
            if (botonPadreId) break;
        }
    }
    
    if (!botonPadreId) {
        for (let item of menuConfig) {
            if (!item.dropdown && item.url === paginaActual) {
                botonPadreId = item.id;
                break;
            }
        }
    }
    
    // Aplicar clases activas
    if (botonPadreId) {
        const botonPadre = document.getElementById(botonPadreId);
        if (botonPadre) {
            botonPadre.classList.add('activo');
        }
    }
    
    if (subitemActivo) {
        const links = document.querySelectorAll('.dropdown-content a');
        links.forEach(link => {
            if (link.dataset.url === subitemActivo || link.getAttribute('href') === subitemActivo) {
                link.classList.add('activo');
            }
        });
    }
}

// ============================================
// BOTON DESPLEGABLE ACORDEON
// ============================================
function toggleAcordeon(id) {
    const contenido = document.getElementById(id);
    const boton = contenido.previousElementSibling;
    
    const estaActivo = contenido.classList.contains('activo');
    
    document.querySelectorAll('.acordeon-contenido').forEach(item => {
        item.classList.remove('activo');
    });
    document.querySelectorAll('.acordeon-boton').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    if (!estaActivo) {
        contenido.classList.add('activo');
        boton.classList.add('activo');
    }
}

// ============================================
// INICIALIZAR TODO AL CARGAR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    generarNavegacion();
    generarFooterYScript();
    marcarBotonActivo();
    
    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            cerrarTodosDropdowns();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        cerrarTodosDropdowns();
        // Cerrar menú hamburguesa al redimensionar a escritorio
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });
});