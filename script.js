function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

const items = document.querySelectorAll('.slider-item');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
const navToggle = document.querySelector('.toggle-nav');
const navMenu = document.querySelector('.flex-nav');
let count = 0;

function showSlide(index) {
  if (!items.length) return;
  items[count].classList.remove('active');
  count = (index + itemCount) % itemCount;
  items[count].classList.add('active');
}

function showNextItem() {
  showSlide(count + 1);
}

function showPreviousItem() {
  showSlide(count - 1);
}

function toggleNavigation() {
  if (!navMenu) return;
  navMenu.classList.toggle('active');
  const expanded = navMenu.classList.contains('active');
  this.setAttribute('aria-expanded', expanded);
}

function keyPress(e) {
  const key = e.key || e.keyCode;
  if (key === 'ArrowLeft' || key === 37) {
    showPreviousItem();
  } else if (key === 'ArrowRight' || key === 39) {
    showNextItem();
  }
}

window.addEventListener('scroll', function () {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

if (nextItem) {
  nextItem.addEventListener('click', showNextItem);
}

if (previousItem) {
  previousItem.addEventListener('click', showPreviousItem);
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', toggleNavigation);
}

document.addEventListener('keydown', keyPress);

document.querySelectorAll('.flex-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

async function loadClubs() {
  try {
    const response = await fetch('clubs.json');
    const clubs = await response.json();
    const container = document.getElementById('clubContainer');

    if (!container) return;

    clubs.forEach((club) => {
      const card = document.createElement('div');
      card.classList.add('club-card');
      card.innerHTML = `
        <h3>${club.name}</h3>
        <p class="club-type">${club.type}</p>
        <p>${club.description}</p>
        <p><strong>Grades:</strong> ${club.grades}</p>
        <p><strong>Meets:</strong> ${club.meeting}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Unable to load clubs:', error);
  }
}

loadClubs();
