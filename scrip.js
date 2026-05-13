// ============================================
// CONFIGURACIÓN DEL MENÚ - EDITAS SOLO AQUÍ
// ============================================

const menuConfig = [
    {
        id: 'btnprogramacion', 
        texto: 'Programación ▼', 
        url: '#',
        dropdown: true,
        subitems: [
            {
                id: 'btnfrontend',
                texto: 'Frontend ▼',
                url: '#',
                dropdown: true,
                subitems: [
                    { texto: 'HTML', url: 'index.html' },
                    { texto: 'CSS', url: 'css.html' },
                    { texto: 'JavaScript', url: 'javascript.html' },
                ]
            },
            {
                id: 'btnbackend',
                texto: 'Backend ▼',
                url: '#',
                dropdown: true,
                subitems: [
                    { texto: 'Estructura de datos', url: 'estructuras-datos.html' },
                    { texto: 'Ciclos', url: 'ciclos.html' },
                    { texto: 'Condicionales', url: 'condicionales.html' },
                    { texto: 'TypeScript', url: 'typescript.html' },
                    { texto: 'Endpoint', url: 'endpoint.html' },
                    { texto: 'http', url: 'http.html' },
                    { texto: 'API', url: 'api.html' }
                ]
            },
            {
                 id: 'btnfullstack',
                texto: 'Fullstack ▼',
                url: '#',
                dropdown: true,
                subitems: [
                    { texto: 'Frameworks', url: 'frameworks.html' },
                    { texto: 'Back y Front', url: 'backyfront.html' }
                ]
            },
            {
                id: 'btnloajamiento',
                texto: "Alojamiento Web",
                url: 'alojamientoWeb.html',
                dropdown: false
            }
        ]
    },
    {
        id: 'btnbasesdedatos',
        texto: 'Bases de datos ▼',
        url: '#',
        dropdown: true,
        subitems: [
            { texto: 'Base de datos', url: 'base_de_datos.html' },
            { texto: 'ORM', url: 'orm.html' }
        ]
    },
    { 
        id: 'btnrepositorios',
        texto: 'Repositorios ▼',
        url: '#',
        dropdown: true,
        subitems: [
            { texto: 'Git', url: 'git.html' },
            { texto: 'GitHub', url: 'github.html' },
            { texto: 'GitLab', url: 'gitlab.html' }
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
    
    // Doble clic: cerrar todo
    if (e.detail === 2) {
        cerrarTodosDropdowns();
        return;
    }
    
    // Cerrar otros dropdowns
    if (!estaAbierto) {
        document.querySelectorAll('.dropdown-content').forEach(menu => {
            if (menu !== submenu) {
                menu.classList.remove('show');
            }
        });
        document.querySelectorAll('.dropdown-btn').forEach(btn => {
            if (btn !== boton) {
                btn.classList.remove('dropdown-abierto');
            }
        });
    }
    
    // Abrir o cerrar el actual
    if (estaAbierto) {
        submenu.classList.remove('show');
        if (boton) boton.classList.remove('dropdown-abierto');
    } else {
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
        cerrarTodosDropdowns();
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
    cerrarTodosDropdowns();
}

// ============================================
// GENERAR NAVEGACIÓN - SUBMENÚS AL LADO DERECHO
// ============================================
function generarNavegacion() {
    // Crear botón hamburguesa
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
    nav.className = 'tab-container navbar';
    nav.id = 'main-nav';
    
    // Función recursiva para crear elementos del menú
    function crearElementoMenu(item, nivel = 0) {
        if (item.dropdown) {
            // Contenedor subnav
            const subnav = document.createElement('div');
            // Primer nivel: dropdown normal, segundo nivel: subnav-lateral
            subnav.className = nivel === 0 ? 'dropdown subnav' : 'dropdown subnav subnav-lateral';
            
            // Botón principal
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect dropdown-btn subnavbtn';
            btn.innerHTML = item.texto;
            btn.onclick = function(e) {
                e.stopPropagation();
                toggleDropdown(e, item.id);
            };
            btn.ondblclick = function(e) {
                e.stopPropagation();
                cerrarTodosDropdowns();
            };
            
            // Contenedor del submenú
            const content = document.createElement('div');
            content.className = nivel === 0 
                ? 'dropdown-content subnav-content' 
                : 'dropdown-content subnav-content subnav-content-lateral';
            content.id = 'submenu-' + item.id;
            
            // Procesar cada subitem
            item.subitems.forEach(sub => {
                if (sub.dropdown) {
                    // Submenú anidado
                    const subDropdown = crearElementoMenu(sub, nivel + 1);
                    content.appendChild(subDropdown);
                } else {
                    // Link normal
                    const a = document.createElement('a');
                    a.href = sub.url;
                    a.textContent = sub.texto;
                    a.dataset.url = sub.url;
                    a.onclick = function() {
                        if (window.innerWidth <= 768) {
                            setTimeout(cerrarMenu, 100);
                        }
                        cerrarTodosDropdowns();
                    };
                    content.appendChild(a);
                }
            });
            
            subnav.appendChild(btn);
            subnav.appendChild(content);
            return subnav;
        } else {
            // Botón normal sin dropdown
            const btn = document.createElement('a');
            btn.id = item.id;
            btn.className = 'boton-redirect';
            btn.textContent = item.texto;
            btn.href = item.url;
            btn.onclick = function(e) {
                e.preventDefault();
                actionRedirect(item.url);
                if (window.innerWidth <= 768) {
                    cerrarMenu();
                }
                cerrarTodosDropdowns();
            };
            return btn;
        }
    }
    
    // Generar el menú principal
    menuConfig.forEach(item => {
        const elemento = crearElementoMenu(item);
        nav.appendChild(elemento);
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
    
    // Limpiar clases activas
    document.querySelectorAll('.boton-redirect').forEach(btn => {
        btn.classList.remove('activo');
    });
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.classList.remove('activo');
    });
    
    // Buscar la página actual en la configuración
    function buscarEnMenu(items, padreId = null) {
        for (let item of items) {
            if (item.dropdown) {
                // Buscar en subitems
                for (let sub of item.subitems) {
                    if (sub.url === paginaActual) {
                        return { padreId: item.id, subUrl: sub.url };
                    }
                    if (sub.dropdown) {
                        const resultado = buscarEnMenu([sub], item.id);
                        if (resultado) return resultado;
                    }
                }
            } else if (item.url === paginaActual) {
                return { padreId: item.id, subUrl: null };
            }
        }
        return null;
    }
    
    const resultado = buscarEnMenu(menuConfig);
    
    if (resultado && resultado.padreId) {
        const botonPadre = document.getElementById(resultado.padreId);
        if (botonPadre) {
            botonPadre.classList.add('activo');
        }
    }
    
    if (resultado && resultado.subUrl) {
        const links = document.querySelectorAll('.dropdown-content a');
        links.forEach(link => {
            if (link.getAttribute('href') === resultado.subUrl) {
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
// CONSUMO DE API PÚBLICA CON FETCH
// ============================================

/**
 * Función para consumir la API pública JSONPlaceholder
 * Endpoint: /users - devuelve 10 usuarios de ejemplo
 */
function cargarUsuariosAPI() {
    const contenedor = document.getElementById('contenedor-usuarios');
    const estado = document.getElementById('estado-api');
    const btnRecargar = document.getElementById('btn-recargar');
    
    // URL de la API pública (no requiere autenticación)
    const urlAPI = 'https://jsonplaceholder.typicode.com/users';
    
    // 1. Hacer la petición GET con fetch
    fetch(urlAPI)
        
        // 2. Verificar que la respuesta sea correcta
        .then(response => {
            if (!response.ok) {
                // Si hay error HTTP (404, 500, etc.)
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            // Convertir la respuesta a JSON (objeto JavaScript)
            return response.json();
        })
        
        // 3. Usar los datos recibidos
        .then(usuarios => {
            // Ocultar mensaje de carga
            estado.style.display = 'none';
            
            // Mostrar botón de recargar
            btnRecargar.style.display = 'inline-block';
            
            // Limpiar contenedor
            contenedor.innerHTML = '';
            
            // Recorrer cada usuario y crear una tarjeta
            usuarios.forEach(usuario => {
                const tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-usuario';
                tarjeta.innerHTML = `
                    <h4>👤 ${usuario.name}</h4>
                    <p><strong>Usuario:</strong> @${usuario.username}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                    <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
                    <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                    <a href="https://${usuario.website}" target="_blank">🌐 ${usuario.website}</a>
                `;
                contenedor.appendChild(tarjeta);
            });
            
            console.log('✅ Usuarios cargados correctamente:', usuarios);
        })
        
        // 4. Capturar errores
        .catch(error => {
            estado.innerHTML = `❌ Error al cargar los datos: ${error.message}`;
            estado.style.color = 'red';
            console.error('Error en fetch:', error);
            
            // Mostrar botón para reintentar
            btnRecargar.style.display = 'inline-block';
            btnRecargar.textContent = '🔁 Reintentar';
        });
}

// ============================================
// INICIALIZAR TODO AL CARGAR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    generarNavegacion();
    generarFooterYScript();
    marcarBotonActivo();
    
    // Agregar evento al botón de recargar API
    const btnRecargar = document.getElementById('btn-recargar');
    if (btnRecargar) {
        btnRecargar.addEventListener('click', function() {
            const estado = document.getElementById('estado-api');
            estado.style.display = 'block';
            estado.style.color = '';
            estado.textContent = '🔄 Cargando usuarios desde la API...';
            cargarUsuariosAPI();
        });
    }
    
    // Cargar usuarios al iniciar la página (solo si existe el contenedor)
    if (document.getElementById('contenedor-usuarios')) {
        cargarUsuariosAPI();
    }
    
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
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });
});