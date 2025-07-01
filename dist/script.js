document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
  highlightActiveNavLink();
  setupSearchToggle();       // ← initialize search toggle on DOM ready
});

function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    const resp = await fetch(file);
    if (resp.ok) {
      el.innerHTML = await resp.text();
      // re‐run setup on newly injected HTML
      setupMenuToggle();
      highlightActiveNavLink();
      setupSearchToggle();     // ← also initialize after includes
    } else {
      el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
    }
  });
}

function setupMenuToggle() {
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu  = document.getElementById('closeMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
    });
  }
}

function setupSearchToggle() {
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearch    = document.getElementById('mobileSearch');
  const closeSearch     = document.getElementById('closeMobileSearch');

  // bail out if any element is missing
  if (!mobileSearchBtn || !mobileSearch || !closeSearch) return;

  mobileSearchBtn.addEventListener('click', () => {
    mobileSearch.classList.remove('-translate-y-full');
  });

  closeSearch.addEventListener('click', () => {
    mobileSearch.classList.add('-translate-y-full');
  });
}

function highlightActiveNavLink() {
  const navLinks   = document.querySelectorAll('#main-nav a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    link.classList.toggle(
      'font-bold',
      link.getAttribute('href') === currentPath
    );
  });
}
