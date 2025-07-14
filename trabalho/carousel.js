const carouselContainer = document.getElementById('carouselContainer');
const tableContainer = document.getElementById('tableContainer');
const carouselSection = document.querySelector('.carousel-section');

let slides = document.querySelector('.slides');
let totalSlides = slides.children.length;
let currentIndex = 0;

let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

function updateSlide() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Impede que o clique no botão suba para o carouselSection
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalSlides -1;
  }
  updateSlide();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex++;
  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }
  updateSlide();
});

// Inicializa o slide
updateSlide();

carouselSection.addEventListener('click', () => {
  if (carouselContainer.style.display !== 'none') {
    carouselContainer.style.display = 'none';
    tableContainer.style.display = 'block';
  } else {
    tableContainer.style.display = 'none';
    carouselContainer.style.display = 'block';
  }
});