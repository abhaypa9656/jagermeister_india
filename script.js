const canvas = document.getElementById("animation-canvas");
const context = canvas.getContext("2d");
const scrollContainer = document.getElementById("scroll-container");

const frameCount = 200;
const currentFrame = index => (
  `anim/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const containerOffsetTop = scrollContainer.offsetTop;
  const containerHeight = scrollContainer.scrollHeight - window.innerHeight;

  let scrollFraction = (scrollTop - containerOffsetTop) / containerHeight;

  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();

// --- Countdown Logic ---
const countDownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
  document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<div class='time-box'><span>Live!</span></div>";
  }
}, 1000);

// --- Premium Section Animations ---
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('accent-line')) {
        entry.target.classList.add('expand');
      }
      if (entry.target.classList.contains('feature-card')) {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.accent-line, .feature-card').forEach(el => {
  observer.observe(el);
});

// --- Header Dynamic Scroll & Mobile Menu ---
const header = document.getElementById('main-header');
const menuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');

// Solid background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
  // Simple animation for hamburger icon lines
  const spans = menuToggle.querySelectorAll('span');
  if (mainNav.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

