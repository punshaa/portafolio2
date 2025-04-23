// Obtener elementos del DOM
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const toast = document.getElementById('toast');
const toastMessage = document.querySelector('.toast-message');

// Expresiones regulares para validación
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const subjectRegex = /^.{5,100}$/;
const messageRegex = /^.{10,500}$/;

// Función para mostrar mensajes de error
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = message;
    errorElement.classList.add('visible');
    input.classList.add('error');
}

// Función para limpiar mensajes de error
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
    input.classList.remove('error');
}

// Función para mostrar toast
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.classList.add('visible', type);
    setTimeout(() => {
        toast.classList.remove('visible', type);
    }, 3000);
}

// Validación del formulario
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validar nombre
    if (!nameRegex.test(nameInput.value)) {
        showError(nameInput, 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validar email
    const emailValue = emailInput.value.trim();
    console.log('Email ingresado:', emailValue);
    console.log('Resultado de la validación:', emailRegex.test(emailValue));
    
    if (!emailRegex.test(emailValue)) {
        showError(emailInput, 'Por favor ingresa un email válido (ejemplo: usuario@dominio.com)');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validar asunto
    if (!subjectRegex.test(subjectInput.value)) {
        showError(subjectInput, 'El asunto debe tener entre 5 y 100 caracteres');
        isValid = false;
    } else {
        clearError(subjectInput);
    }

    // Validar mensaje
    if (!messageRegex.test(messageInput.value)) {
        showError(messageInput, 'El mensaje debe tener entre 10 y 500 caracteres');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    // Si el formulario es válido, mostrar mensaje de éxito
    if (isValid) {
        showToast('¡Mensaje enviado con éxito!');
        contactForm.reset();
        // Aquí podrías agregar la lógica para enviar el formulario a un servidor
    } else {
        showToast('Por favor corrige los errores en el formulario', 'error');
    }
});

// Validación en tiempo real
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
        clearError(this);
    });
});

// Manejo del modal
const modal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('visible');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
    }
}); 