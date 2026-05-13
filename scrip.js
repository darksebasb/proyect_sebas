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
                    { texto: 'http', url: 'http.html' }
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
// GENERAR NAVEGACIÓN - VERSIÓN CORREGIDA
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
    nav.className = 'tab-container';
    nav.id = 'main-nav';
    
    // Función recursiva para crear elementos del menú
    function crearElementoMenu(item) {
        if (item.dropdown) {
            // Contenedor del dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';
            
            // Botón principal
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect dropdown-btn';
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
            content.className = 'dropdown-content';
            content.id = 'submenu-' + item.id;
            
            // Lista de items
            const ul = document.createElement('ul');
            
            // Procesar cada subitem
            item.subitems.forEach(sub => {
                if (sub.dropdown) {
                    // Si el subitem tiene dropdown, crear elemento anidado
                    const li = document.createElement('li');
                    li.style.listStyle = 'none';
                    li.style.position = 'relative';
                    
                    // Crear el dropdown anidado
                    const subDropdown = crearElementoMenu(sub);
                    li.appendChild(subDropdown);
                    ul.appendChild(li);
                } else {
                    // Si es un link normal
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
                    ul.appendChild(a);
                }
            });
            
            content.appendChild(ul);
            dropdown.appendChild(btn);
            dropdown.appendChild(content);
            return dropdown;
        } else {
            // Botón normal sin dropdown
            const btn = document.createElement('button');
            btn.id = item.id;
            btn.className = 'boton-redirect';
            btn.textContent = item.texto;
            btn.onclick = function() {
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
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });
});



// 1. Hacer la petición GET (consultar datos)
fetch('https://jsonplaceholder.typicode.com/posts/1')
  
  // 2. Cuando la API responde, convertimos la respuesta a JSON
  .then(response => {
    // Verificamos que todo salió bien
    if (!response.ok) {
      throw new Error('Error en la petición: ' + response.status);
    }
    return response.json(); // Convertimos a objeto JavaScript
  })
  
  // 3. Usamos los datos recibidos
  .then(data => {
    console.log('Datos recibidos:', data);
    // data es un objeto JavaScript normal
    console.log('Título:', data.title);
  })
  
  // 4. Si algo falla, capturamos el error
  .catch(error => {
    console.error('Algo salió mal:', error);
  });