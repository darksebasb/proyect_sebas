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