// ============================================
// REDIRECCIÓN ENTRE PÁGINAS
// ============================================
function actionRedirect(page) {
    window.location.href = page;
}

// ============================================
// RESALTAR BOTÓN ACTIVO AUTOMÁTICAMENTE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    
    // Mapeo de páginas a IDs de botones
    const mapaPaginas = {
        'index.html': 'btnHtml',
        '': 'btnHtml',
        'css.html': 'btnCss',
        'javascript.html': 'btnJavaScript',
        'git.html': 'btnGit',
        'github.html': 'btnGitHub',
        'gitlab.html': 'btnGitLab',
        'typescript.html': 'btntypescript',
        'alojamientoWeb.html': 'btnalojamiento',
        
        // Subpáginas de Programación
        'estructuras-datos.html': 'btnprogramacion',
        'ciclos.html': 'btnprogramacion',
        'condicionales.html': 'btnprogramacion',
    };
    
    const idBotonActivo = mapaPaginas[paginaActual];
    
    if (idBotonActivo) {
        const botonActivo = document.getElementById(idBotonActivo);
        if (botonActivo) {
            // REMOVER cualquier clase 'activo' existente primero
            botonActivo.classList.remove('activo');
            // Agregar clase específica para página activa
            botonActivo.classList.add('nav-activo');
        }
    }
    
});

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
    
    // Cerrar todos los dropdowns primero
    cerrarTodosDropdowns();
    
    if (!estaAbierto) {
        dropdown.classList.add('show');
        // Usar clase diferente: 'menu-abierto' en lugar de 'activo'
        boton.classList.add('menu-abierto');
    }
}

function cerrarTodosDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        // Quitar solo 'menu-abierto', NUNCA 'nav-activo'
        btn.classList.remove('menu-abierto');
    });
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        cerrarTodosDropdowns();
    }
});

window.addEventListener('resize', function() {
    cerrarTodosDropdowns();
});