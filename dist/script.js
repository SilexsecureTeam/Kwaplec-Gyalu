document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      const resp = await fetch(file);
      if (resp.ok) {
          const html = await resp.text();
          el.innerHTML = html;

          // Run menu toggle setup AFTER content is injected
          setupMenuToggle();
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
