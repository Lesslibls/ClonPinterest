// Selección de elementos generales
const searchBar = document.querySelector('.search-bar');
const gridContainer = document.querySelector('.grid-container');

// Funcionalidad del buscador
searchBar.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const img = card.querySelector('img');
    const imgAlt = img?.alt.toLowerCase() || ''; // Manejo seguro en caso de que img o alt sean nulos
    if (imgAlt.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Cargar imágenes dinámicas al hacer scroll
function loadMoreImages() {
  for (let i = 0; i < 6; i++) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = `
      <img src="images/example${Math.floor(Math.random() * 10) + 1}.jpg" alt="Dynamic Image">
    `;
    gridContainer.appendChild(newCard);
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMoreImages();
  }
});

// Selección de elementos específicos para el modal y la carga de imágenes
const addButton = document.querySelector('.add-button');
const imageUploader = document.getElementById('imageUploader');
const modal = document.getElementById('modal');
const imageDescriptionInput = document.getElementById('imageDescription');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

let uploadedImage = null;

// Abrir el selector de archivos al hacer clic en el botón "+"
addButton.addEventListener('click', () => {
  imageUploader.click();
});

// Manejar la carga de imágenes
imageUploader.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage = reader.result; // Guardar la imagen cargada
      modal.classList.remove('hidden'); // Mostrar el modal
    };
    reader.readAsDataURL(file); // Leer la imagen como DataURL
  }
});

// Guardar la imagen y descripción
saveButton.addEventListener('click', () => {
  const description = imageDescriptionInput.value.trim();
  if (uploadedImage) {
    // Crear una nueva tarjeta
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = `
      <img src="${uploadedImage}" alt="${description || 'User uploaded image'}">
      <p class="description">${description}</p>
    `;
    gridContainer.appendChild(newCard); // Agregar la tarjeta al grid
  }

  // Limpiar y cerrar el modal
  uploadedImage = null;
  imageDescriptionInput.value = '';
  modal.classList.add('hidden');
});

// Cancelar la acción
cancelButton.addEventListener('click', () => {
  uploadedImage = null;
  imageDescriptionInput.value = '';
  modal.classList.add('hidden');
});


// Redirigir a la página de login al hacer clic en el botón de perfil
function goToLogin() {
  window.location.href = "/login.html"; // Cambia la ruta si es necesario
}

// Selecciona los botones
const btnIngresar = document.getElementById('btn-ingresar');
const btnRegistrar = document.getElementById('btn-registrar');

// Función para redirigir al index
btnIngresar.addEventListener('click', () => {
  window.location.href = '/index.html'; // Redirige a index.html
});

// Función para redirigir al registro
btnRegistrar.addEventListener('click', () => {
  window.location.href = '/registrar.html'; // Redirige a registrar.html
});
