/* ==============================
   SL CyberSecurity Services – Site JS
   - Lazy-load hero slide backgrounds
   - Fix mobile viewport height (no white gap)
   - (Optional) Footer year
============================== */

// (Optional) auto-set footer year if you have <span id="year"></span>
function setFooterYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ----- Fix viewport height on mobile (prevents white gap) ----- */
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/* Run early and keep it updated */
document.addEventListener('DOMContentLoaded', setVh, { passive: true });
window.addEventListener('load', setVh, { passive: true });
window.addEventListener('resize', setVh, { passive: true });
window.addEventListener('orientationchange', setVh, { passive: true });
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setVh, { passive: true });
}

/* ----- Lazy-load hero slide backgrounds ----- */
document.addEventListener("DOMContentLoaded", () => {
  setFooterYear(); // safe if #year doesn't exist

  const carousel = document.getElementById("heroCarousel");
  if (!carousel) return;

  const applyBg = (item) => {
    if (!item || item.dataset.applied === "1") return;
    const src = item.getAttribute("data-bg");
    if (src) {
      item.style.backgroundImage = `url("${src}")`;
      item.dataset.applied = "1";
    }
  };

  // 1) Apply to the active slide immediately
  applyBg(carousel.querySelector(".carousel-item.active"));

  // 2) Preload the next (and optionally following) slide just before it shows
  carousel.addEventListener("slide.bs.carousel", (e) => {
    const next = e.relatedTarget;
    applyBg(next);

    // Optionally also preload the following slide for smoother UX
    const items = Array.from(next.parentElement.children);
    const nextIndex = items.indexOf(next);
    const following = items[nextIndex + 1];
    applyBg(following);
  });
});



