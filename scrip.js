// ============================================
// CONFIGURACIÓN DEL MENÚ - EDITAS SOLO AQUÍ
// ============================================

const menuConfig = [
    { id: 'btnHtml', texto: 'HTML', url: 'index.html' },
    { id: 'btnCss', texto: 'CSS', url: 'css.html' },
    { id: 'btnJavaScript', texto: 'JavaScript', url: 'javascript.html' },
    { id: 'btnGit', texto: 'Git', url: 'git.html' },
    { id: 'btnGitHub', texto: 'GitHub', url: 'github.html' },
    { id: 'btnGitLab', texto: 'GitLab', url: 'gitlab.html' },
    { id: 'btnalojamiento', texto: 'Alojamiento Web', url: 'alojamientoWeb.html' },
    { 
        id: 'btnprogramacion', 
        texto: 'Programación ▼', 
        url: '#',
        dropdown: true,
        subitems: [
            { texto: 'Estructura de datos', url: 'estructuras-datos.html' },
            { texto: 'Ciclos', url: 'ciclos.html' },
            { texto: 'Condicionales', url: 'condicionales.html' },
            { texto: 'TypeScript', url: 'typescript.html' },
            { texto: 'Frameworks', url: 'frameworks.html' },
            { texto: 'Back y Front', url: 'backyfront.html' },
            { texto: 'Endpoint', url: 'endpoint.html' }
        ]
    }
    // Agrega nuevos botones aquí ↓↓↓
    // { id: 'btnNuevo', texto: 'Nuevo', url: 'nuevo.html' },
];

// ============================================
// REDIRECCIÓN ENTRE PÁGINAS
// ============================================
function actionRedirect(page) {
    window.location.href = page;
}

// ============================================
// GENERAR NAVEGACIÓN AUTOMÁTICAMENTE
// ============================================

function generarNavegacion() {
    const nav = document.createElement('nav');
    nav.className = 'tab-container';
    
    menuConfig.forEach(item => {
        if (item.dropdown) {
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';
            
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect dropdown-btn';
            btn.innerHTML = item.texto;
            btn.onclick = function(e) { toggleDropdown(e); };
            
            const content = document.createElement('div');
            content.className = 'dropdown-content';
            content.id = 'submenuProgramacion';
            
            const ul = document.createElement('ul');
            item.subitems.forEach(sub => {
                const a = document.createElement('a');
                a.href = sub.url;
                a.textContent = sub.texto;
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
            btn.onclick = function() { actionRedirect(item.url); };
            nav.appendChild(btn);
        }
    });
    
    document.body.insertBefore(nav, document.body.firstChild);
}

// ============================================
// GENERAR FOOTER Y CARGAR SCRIP.JS ADICIONAL
// ============================================

function generarFooterYScript() {
    // Crear footer
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>2026 Yosef. Todos los derechos reservados.</p>';
    
    // Agregar footer al final del body
    document.body.appendChild(footer);
}

// ============================================
// RESALTAR BOTÓN ACTIVO AUTOMÁTICAMENTE
// ============================================

function marcarBotonActivo() {
    let paginaActual = window.location.pathname.split('/').pop();
    
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'index.html';
    }
    
    if (!paginaActual.includes('.') && paginaActual !== '') {
        paginaActual += '.html';
    }
    
    console.log('Página detectada:', paginaActual);
    
    // Crear mapa automático desde menuConfig
    const mapaPaginas = {};
    
    menuConfig.forEach(item => {
        if (item.dropdown) {
            item.subitems.forEach(sub => {
                mapaPaginas[sub.url] = item.id;
            });
        } else {
            mapaPaginas[item.url] = item.id;
        }
    });
    
    const idBotonActivo = mapaPaginas[paginaActual];
    
    console.log('ID del botón:', idBotonActivo);
    
    if (idBotonActivo) {
        const botonActivo = document.getElementById(idBotonActivo);
        if (botonActivo) {
            document.querySelectorAll('.boton-redirect').forEach(btn => {
                btn.classList.remove('activo');
            });
            
            botonActivo.classList.add('activo');
            console.log('Botón activado:', botonActivo.textContent);
        }
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
// DROPDOWN/SUBMENÚ PROGRAMACIÓN
// ============================================
function toggleDropdown(event) {
    event.stopPropagation();
    
    const dropdown = document.getElementById('submenuProgramacion');
    const boton = event.currentTarget;
    
    const estaAbierto = dropdown.classList.contains('show');
    
    cerrarTodosDropdowns();
    
    if (!estaAbierto) {
        dropdown.classList.add('show');
        boton.classList.add('dropdown-abierto');
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
// INICIALIZAR TODO AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Generar navegación automáticamente
    generarNavegacion();
    
    // Generar footer automáticamente
    generarFooterYScript();
    
    // Marcar botón activo según página actual
    marcarBotonActivo();
    
    // Event listeners para cerrar dropdowns
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            cerrarTodosDropdowns();
        }
    });
    
    window.addEventListener('resize', function() {
        cerrarTodosDropdowns();
    });
});