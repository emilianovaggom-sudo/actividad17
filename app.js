const base = [
    { user: 'admin', pass: '1234', rol: 'Administrador', url: 'admin.html' },
    { user: 'profesor', pass: '1234', rol: 'Profesor', url: 'profesor.html' },
    { user: 'alumno', pass: '1234', rol: 'Alumno', url: 'alumno.html' }
];

function iniciarSesion(e) {
    e.preventDefault();
    const inputUser = document.getElementById('inputUser').value.trim();
    const inputPass = document.getElementById('inputPass').value.trim();
    const usuarioAutenticado = base.find(
        u => u.user === inputUser && u.pass === inputPass
    );

    if (usuarioAutenticado) {
        sessionStorage.setItem('sesionActiva', JSON.stringify(usuarioAutenticado));
        window.location.href = usuarioAutenticado.url;
    } else {
        document.getElementById('errorMsg').classList.remove('d-none');
    }
}

function saltarLoginSiAutenticado() {
    const sesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
    if (sesion) {
        window.location.href = sesion.url;
    }
}

function protegerRuta(rolPermitido) {
    const sesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
    if (!sesion) {
        window.location.href = 'index.html';
        return;
    }
    if (sesion.rol !== rolPermitido) {
        window.location.href = sesion.url;
        return;
    }
    const saludo = document.getElementById('saludoUsuario');
    if (saludo) {
        saludo.textContent = `${sesion.user} (${sesion.rol})`;
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('sesionActiva');
    window.location.href = 'index.html';
}