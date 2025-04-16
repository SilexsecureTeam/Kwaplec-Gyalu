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
      }
    });
  }
  