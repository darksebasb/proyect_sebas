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
    
    // Obtener nombre de archivo de múltiples formas posibles
    let paginaActual = window.location.pathname.split('/').pop();
    
    // Si está vacío (estamos en raíz), usar index.html
    if (!paginaActual || paginaActual === '') {
        paginaActual = 'index.html';
    }
    
    // Si no tiene extensión .html, agregarla (por si acaso)
    if (!paginaActual.includes('.') && paginaActual !== '') {
        paginaActual += '.html';
    }
    
    console.log('Página detectada:', paginaActual); // Para debugging
    
    // Mapeo completo de páginas a IDs de botones
    const mapaPaginas = {
        'index.html': 'btnHtml',
        'css.html': 'btnCss',
        'javascript.html': 'btnJavaScript',
        'git.html': 'btnGit',
        'github.html': 'btnGitHub',
        'gitlab.html': 'btnGitLab',
        'typescript.html': 'btntypescript',
        'alojamientoWeb.html': 'btnalojamiento',
        'alojamientoweb.html': 'btnalojamiento', // por si es minúscula
        
        // Subpáginas de Programación
        'estructuras-datos.html': 'btnprogramacion',
        'ciclos.html': 'btnprogramacion',
        'condicionales.html': 'btnprogramacion',
    };
    
    const idBotonActivo = mapaPaginas[paginaActual];
    
    console.log('ID del botón:', idBotonActivo); // Para debugging
    
    if (idBotonActivo) {
        const botonActivo = document.getElementById(idBotonActivo);
        if (botonActivo) {
            // Remover clase activo de todos los botones primero
            document.querySelectorAll('.boton-redirect').forEach(btn => {
                btn.classList.remove('activo');
            });
            
            // Agregar clase activo al botón actual
            botonActivo.classList.add('activo');
            console.log('Botón activado:', botonActivo.textContent);
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

document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        cerrarTodosDropdowns();
    }
});

window.addEventListener('resize', function() {
    cerrarTodosDropdowns();
});