document.addEventListener('DOMContentLoaded', () => {
  const botonMenu = document.querySelector('.nav-toggle');
  const menuMobile = document.getElementById('navMobile');
  if (botonMenu && menuMobile) {
    botonMenu.addEventListener('click', () => menuMobile.classList.toggle('open'));
  }

  const formulario = document.getElementById('contactForm');

  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validarFormulario()) {
        mostrarExito(formulario);
      } else {
        alert('Por favor, corrige los errores en el formulario.');
      }
    });
  }
});

function validarFormulario() {
  let esValido = true;

  const nombre = document.getElementById('name');
  const valorNombre = nombre.value.trim();

  if (valorNombre === '' || valorNombre.length < 3) {
    nombre.classList.add('no-valid');
    mostrarError('nameError', valorNombre === '' ? 'El nombre es obligatorio.' : 'El nombre debe tener al menos 3 caracteres.');
    esValido = false;
  } else {
    nombre.classList.remove('no-valid');
    ocultarError('nameError');
  }

  const ciudad = document.getElementById('city');
  const valorCiudad = ciudad.value.trim();

  if (valorCiudad === '') {
    ciudad.classList.add('no-valid');
    mostrarError('cityError', 'La ciudad es obligatoria.');
    esValido = false;
  } else {
    ciudad.classList.remove('no-valid');
    ocultarError('cityError');
  }

  const email = document.getElementById('email');
  const valorEmail = email.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valorEmail === '') {
    email.classList.add('no-valid');
    mostrarError('emailError', 'El email es obligatorio.');
    esValido = false;
  } else if (!regexEmail.test(valorEmail)) {
    email.classList.add('no-valid');
    mostrarError('emailError', 'Introduce un email válido.');
    esValido = false;
  } else {
    email.classList.remove('no-valid');
    ocultarError('emailError');
  }

  const asunto = document.getElementById('subject');
  const valorAsunto = asunto.value.trim();

  if (valorAsunto === '') {
    asunto.classList.add('no-valid');
    mostrarError('subjectError', 'El asunto es obligatorio.');
    esValido = false;
  } else {
    asunto.classList.remove('no-valid');
    ocultarError('subjectError');
  }

  const descripcion = document.getElementById('description');
  const valorDescripcion = descripcion.value.trim();

  if (valorDescripcion === '' || valorDescripcion.length < 10) {
    descripcion.classList.add('no-valid');
    mostrarError('descriptionError', valorDescripcion === '' ? 'El mensaje es obligatorio.' : 'La descripción debe tener al menos 10 caracteres.');
    esValido = false;
  } else {
    descripcion.classList.remove('no-valid');
    ocultarError('descriptionError');
  }

  return esValido;
}

function mostrarError(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = mensaje;
    elemento.classList.add('visible');
  }
}

function ocultarError(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = '';
    elemento.classList.remove('visible');
  }
}

function mostrarExito(formulario) {
  const boton = formulario.querySelector('button[type="submit"]');
  const mensajeExito = document.getElementById('successMessage');
  const textoOriginal = boton ? boton.innerHTML : '';

  if (boton) {
    boton.disabled = true;
    boton.innerHTML = '<span class="material-symbols-outlined">sync</span> Enviando...';
  }

  setTimeout(() => {
    if (mensajeExito) mensajeExito.classList.add('visible');
    if (boton) {
      boton.innerHTML = textoOriginal;
      boton.disabled = false;
    }
    formulario.reset();
    formulario.querySelectorAll('input, textarea').forEach((input) => input.classList.remove('no-valid'));
    ocultarError('nameError');
    ocultarError('cityError');
    ocultarError('emailError');
    ocultarError('subjectError');
    ocultarError('descriptionError');
  }, 1500);
}
