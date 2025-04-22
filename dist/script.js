document.addEventListener("DOMContentLoaded", () => {
    includeHTML();
    highlightActiveNavLink();
  });

  function includeHTML() {
    const includes = document.querySelectorAll("[data-include]");
    includes.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      const resp = await fetch(file);
      if (resp.ok) {
        const html = await resp.text();
        el.innerHTML = html;

        // Run setup functions after content is injected
        setupMenuToggle();
        highlightActiveNavLink(); // Re-run in case nav is loaded via include
      } else {
        el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
      }
    });
  }

  function setupMenuToggle() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

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

  function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('#main-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('font-bold');
      } else {
        link.classList.remove('font-bold');
      }
    });
  }