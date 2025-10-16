let currentIndex = 0;
let images = [];

// Load images from JSON which backend updates dynamically
async function loadImages() {
  const res = await fetch('uploads/images.json');
  images = await res.json();
  buildDots();
  showSlide(currentIndex);
}

// Show current slide and update dots
function showSlide(index) {
  const slider = document.getElementById('slider');
  slider.innerHTML = '';

  images.forEach((imgSrc, i) => {
    const img = document.createElement('img');
    img.src = '/uploads/' + imageName;
    if (i === index) {
      img.classList.add('active');
    }
    slider.appendChild(img);
  });

  updateDots(index);
}

// Build navigation dots
function buildDots() {
  const nav = document.getElementById('nav-dots');
  nav.innerHTML = '';
  images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
    nav.appendChild(dot);
  });
}

// Update active dot
function updateDots(index) {
  const dots = document.querySelectorAll('.nav-dots .dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) {
    dots[index].classList.add('active');
  }
}

// Next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}

// Previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
}

// Automatic slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Button events
document.querySelector('.next').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

document.querySelector('.prev').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Reset auto slide timer on manual navigation
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

window.onload = loadImages;

