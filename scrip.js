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
    
    // Obtener el nombre del archivo actual (ej: "index.html", "css.html")
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    
    // Mapeo de páginas a IDs de botones
    const mapaPaginas = {
        'index.html': 'btnHtml',
        '': 'btnHtml',                    // Si está en raíz sin archivo
        'css.html': 'btnCss',
        'javascript.html': 'btnJavaScript',
        'git.html':'btnGit',
        'github.html': 'btnGitHub',
        'gitlab.html': 'btnGitLab',

        // Agrega más páginas aquí fácilmente:
        // 'nueva-pagina.html': 'btnNueva'
    };
    
    // Obtener el ID del botón que corresponde a esta página
    const idBotonActivo = mapaPaginas[paginaActual];
    
    // Si existe un botón para esta página, agregar clase 'activo'
    if (idBotonActivo) {
        const botonActivo = document.getElementById(idBotonActivo);
        if (botonActivo) {
            botonActivo.classList.add('activo');
        }
    }
    
});

// ============================================
// BOTON DESPLEGABLE ACORDEON
// ============================================
function toggleAcordeon(id) {
    // Obtener elementos
    const contenido = document.getElementById(id);
    const boton = contenido.previousElementSibling;
    
    // Verificar si está activo
    const estaActivo = contenido.classList.contains('activo');
    
    // Cerrar todos los acordeones primero (modo "solo uno abierto")
    document.querySelectorAll('.acordeon-contenido').forEach(item => {
        item.classList.remove('activo');
    });
    document.querySelectorAll('.acordeon-boton').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    // Si no estaba activo, abrirlo
    if (!estaActivo) {
        contenido.classList.add('activo');
        boton.classList.add('activo');
    }
}



// ============================================
// DROPDOWN/SUBMENÚ PROGRAMACIÓN
// ============================================

/**
 * Abre o cierra el submenú de Programación
 * @param {Event} event - Evento del click
 */
function toggleDropdown(event) {
    event.stopPropagation();
    
    const dropdown = document.getElementById('submenuProgramacion');
    const boton = event.currentTarget;
    
    // Verificar si ya está abierto
    const estaAbierto = dropdown.classList.contains('show');
    
    // Cerrar todos los dropdowns abiertos primero
    cerrarTodosDropdowns();
    
    // Si no estaba abierto, abrirlo
    if (!estaAbierto) {
        dropdown.classList.add('show');
        boton.classList.add('activo');
    }
}

/**
 * Cierra todos los dropdowns abiertos
 */
function cerrarTodosDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        cerrarTodosDropdowns();
    }
});

// Cerrar dropdown al redimensionar ventana (evita problemas visuales)
window.addEventListener('resize', function() {
    cerrarTodosDropdowns();
});