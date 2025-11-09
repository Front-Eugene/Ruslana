// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all skill cards for animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    const socialLinks = document.querySelectorAll('.social-link');
    
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        link.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(link);
    });
});

// Add parallax effect to background decorations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const decorations = document.querySelectorAll('.bg-decoration');
    
    decorations.forEach((decoration, index) => {
        const speed = index === 0 ? 0.5 : 0.3;
        decoration.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

const musicButton = document.querySelector('.profile-circle.music-button');
  const playIcon = musicButton.querySelector('img:nth-child(1)');
  const pauseIcon = musicButton.querySelector('img:nth-child(2)');
  
  // Создаем audio элемент
  const audio = new Audio('music.mp3');
  audio.loop = true; // зацикливаем, если нужно
  
  // Изначально показываем только иконку "play"
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  
  musicButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      audio.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
});


const images = document.querySelectorAll('.gallery');

// Создание элементов
const sliderOverlay = document.createElement('div');
sliderOverlay.className = 'gallery-slider-overlay';

const sliderImage = document.createElement('img');
sliderImage.className = 'gallery-slider-image';

const closeButton = document.createElement('button');
closeButton.className = 'gallery-slider-close';
closeButton.textContent = '⨉';

const prevButton = document.createElement('button');
prevButton.className = 'gallery-slider-prev';
prevButton.textContent = '←';

const nextButton = document.createElement('button');
nextButton.className = 'gallery-slider-next';
nextButton.textContent = '→';

sliderOverlay.appendChild(sliderImage);
sliderOverlay.appendChild(closeButton);
sliderOverlay.appendChild(prevButton);
sliderOverlay.appendChild(nextButton);
document.body.appendChild(sliderOverlay);

let currentIndex = 0;

function showImage(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  currentIndex = index;
  sliderImage.src = images[currentIndex].src;
  sliderOverlay.classList.add('active');
}

images.forEach((img, idx) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => showImage(idx));
});

closeButton.addEventListener('click', () => {
  sliderOverlay.classList.remove('active');
});

prevButton.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showImage(currentIndex + 1);
});