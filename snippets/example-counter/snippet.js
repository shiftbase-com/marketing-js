/**
 * Example Counter — demonstratie snippet
 *
 * Gebruik:
 *   <div id="sb-counter"></div>
 *   <script src="snippet.js"></script>
 *
 * Of via jsDelivr:
 *   <script src="https://cdn.jsdelivr.net/gh/shiftbase-com/marketing-js@trunk/snippets/example-counter/snippet.js"></script>
 */
(function () {
  'use strict';

  const container = document.getElementById('sb-counter');
  if (!container) return;

  container.classList.add('sb-widget');

  let count = 0;

  container.innerHTML = `
    <div class="sb-card sb-text-center" style="max-width: 320px; margin: 0 auto;">
      <h2>Counter</h2>
      <p class="sb-text-muted sb-mt-1">Klik op de knop om te tellen</p>
      <p class="sb-mt-2" style="font-size: 2.5rem; font-weight: 700;" id="sb-counter-value">0</p>
      <div class="sb-mt-2">
        <button class="sb-btn sb-btn-primary" id="sb-counter-btn">+1</button>
      </div>
    </div>
  `;

  const valueEl = document.getElementById('sb-counter-value');
  const btn = document.getElementById('sb-counter-btn');

  btn.addEventListener('click', function () {
    count++;
    valueEl.textContent = count;
  });
})();
