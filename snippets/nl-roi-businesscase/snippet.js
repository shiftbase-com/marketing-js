/**
 * Shiftbase ROI- & businesscase-calculator
 *
 * Gebruik:
 *   <div id="sb-roi-businesscase"></div>
 *   <script src="snippet.js"></script>
 */
(function () {
  'use strict';

  var root = document.getElementById('sb-roi-businesscase');
  if (!root) return;

  root.classList.add('sb-widget');

  /* ---- HTML ---- */
  root.innerHTML =
    '<div class="sb-roi">' +
      '<h2 class="sb-roi__title">\u{1F4C8} Shiftbase ROI- &amp; businesscase-calculator</h2>' +
      '<p class="sb-text-muted sb-mb-3">Een interactieve tool die het financi\u00eble rendement op investering (ROI) van Shiftbase berekent in drie dimensies: directe foutkosten, gewonnen HR-productiviteit en compliancezekerheid.</p>' +

      /* Invoer */
      '<h3 class="sb-mb-2">1) Invoer (gebruikersgegevens)</h3>' +
      '<div class="sb-roi__grid">' +
        /* L */
        '<div class="sb-card">' +
          '<label class="sb-roi__label" for="sb-roi-L">Maandelijkse bruto loonsom in &euro; (L)</label>' +
          '<input class="sb-roi__input" id="sb-roi-L" type="number" min="0" placeholder="bijv. 50000">' +
          '<small class="sb-text-muted">\u201CDe totale loonsom van alle medewerkers waarvan uren worden geregistreerd.\u201D</small>' +
        '</div>' +
        /* N */
        '<div class="sb-card">' +
          '<label class="sb-roi__label" for="sb-roi-N">Aantal medewerkers (N)</label>' +
          '<input class="sb-roi__input" id="sb-roi-N" type="number" min="0" placeholder="bijv. 35">' +
          '<small class="sb-text-muted">\u201CWordt gebruikt om de software-investering te berekenen.\u201D</small>' +
        '</div>' +
        /* H */
        '<div class="sb-card">' +
          '<label class="sb-roi__label" for="sb-roi-H">Tijd voor loonvoorbereiding per maand in uren (H)</label>' +
          '<input class="sb-roi__input" id="sb-roi-H" type="number" min="0" placeholder="bijv. 8">' +
          '<small class="sb-text-muted">\u201CHoeveel tijd besteed je aan het verzamelen, controleren en overzetten van uren?\u201D</small>' +
        '</div>' +
        /* R */
        '<div class="sb-card">' +
          '<label class="sb-roi__label" for="sb-roi-R">Uurtarief HR / administratie in &euro; (R)</label>' +
          '<input class="sb-roi__input" id="sb-roi-R" type="number" min="0" value="45">' +
          '<small class="sb-text-muted">Standaard: &euro; 45</small>' +
        '</div>' +
      '</div>' +

      /* Excel checkbox */
      '<div class="sb-roi__excel-box sb-mt-3">' +
        '<label class="sb-roi__checkbox-label">' +
          '<input type="checkbox" id="sb-roi-excel"> ' +
          '<strong>Ik werk momenteel met Excel</strong> (rekent met 2% foutpercentage)' +
        '</label>' +
        '<div class="sb-text-muted sb-roi__excel-hint" id="sb-roi-excel-hint">Inactief: foutpercentage staat op 0% (vink aan om met 2% te rekenen).</div>' +
      '</div>' +

      /* Buttons */
      '<div class="sb-mt-3 sb-roi__actions">' +
        '<button class="sb-btn sb-roi__btn-primary" id="sb-roi-calc">Resultaat berekenen</button>' +
        '<button class="sb-btn sb-roi__btn-secondary" id="sb-roi-reset">Reset</button>' +
      '</div>' +

      /* Resultaat */
      '<div id="sb-roi-result" class="sb-mt-3" style="display:none;">' +
        '<h3 class="sb-mb-2">4) Resultaat</h3>' +
        '<div class="sb-roi__grid">' +
          '<div class="sb-card sb-roi__result-card">' +
            '<div class="sb-text-muted">Foutkosten besparing / maand</div>' +
            '<div class="sb-roi__value" id="sb-roi-out-fout">&euro; 0</div>' +
          '</div>' +
          '<div class="sb-card sb-roi__result-card">' +
            '<div class="sb-text-muted">HR-productiviteitsbesparing / maand</div>' +
            '<div class="sb-roi__value" id="sb-roi-out-prod">&euro; 0</div>' +
          '</div>' +
          '<div class="sb-card sb-roi__result-card">' +
            '<div class="sb-text-muted">Shiftbase investering / maand</div>' +
            '<div class="sb-roi__value" id="sb-roi-out-invest">&euro; 0</div>' +
          '</div>' +
          '<div class="sb-card sb-roi__result-card sb-roi__result-card--total">' +
            '<div class="sb-text-muted">Netto besparing / maand</div>' +
            '<div class="sb-roi__value sb-roi__value--big" id="sb-roi-out-netto">&euro; 0</div>' +
          '</div>' +
          '<div class="sb-card sb-roi__result-card sb-roi__result-card--total">' +
            '<div class="sb-text-muted">ROI</div>' +
            '<div class="sb-roi__value sb-roi__value--big" id="sb-roi-out-roi">0%</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ---- Styles (snippet-specifiek) ---- */
  var style = document.createElement('style');
  style.textContent =
    '.sb-roi { max-width: 760px; margin: 0 auto; }' +
    '.sb-roi__title { margin-bottom: 0.5rem; }' +
    '.sb-roi__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }' +
    '@media (max-width: 600px) { .sb-roi__grid { grid-template-columns: 1fr; } }' +
    '.sb-roi__label { display: block; font-weight: 600; margin-bottom: 0.5rem; }' +
    '.sb-roi__input { width: 100%; padding: 0.625rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; font-family: inherit; }' +
    '.sb-roi__input:focus { outline: none; border-color: #31a7f0; box-shadow: 0 0 0 3px rgba(49,167,240,0.15); }' +
    '.sb-roi__excel-box { border: 2px dashed #bfdbfe; background: #eff6ff; border-radius: 12px; padding: 1rem 1.25rem; }' +
    '.sb-roi__checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }' +
    '.sb-roi__checkbox-label input[type="checkbox"] { width: 18px; height: 18px; accent-color: #31a7f0; }' +
    '.sb-roi__excel-hint { margin-top: 0.375rem; font-size: 0.85rem; margin-left: 1.625rem; }' +
    '.sb-roi__btn-primary { background-color: #31a7f0; color: #fff; border-radius: 0.375rem; padding: 0.75rem 2rem; font-size: 1rem; }' +
    '.sb-roi__btn-primary:hover { background-color: #2891d4; }' +
    '.sb-roi__btn-secondary { background-color: transparent; color: #31a7f0; border: 2px solid #31a7f0; border-radius: 0.375rem; padding: 0.75rem 2rem; font-size: 1rem; }' +
    '.sb-roi__btn-secondary:hover { background-color: #edf7fe; }' +
    '.sb-roi__actions { display: flex; gap: 0.75rem; }' +
    '.sb-roi__result-card { text-align: center; }' +
    '.sb-roi__result-card--total { grid-column: span 1; }' +
    '.sb-roi__value { font-size: 1.5rem; font-weight: 700; color: #1a1a2e; margin-top: 0.5rem; }' +
    '.sb-roi__value--big { font-size: 2rem; color: #059669; }';
  document.head.appendChild(style);

  /* ---- Refs ---- */
  var inputL = document.getElementById('sb-roi-L');
  var inputN = document.getElementById('sb-roi-N');
  var inputH = document.getElementById('sb-roi-H');
  var inputR = document.getElementById('sb-roi-R');
  var cbExcel = document.getElementById('sb-roi-excel');
  var hintEl = document.getElementById('sb-roi-excel-hint');
  var resultEl = document.getElementById('sb-roi-result');

  var outFout = document.getElementById('sb-roi-out-fout');
  var outProd = document.getElementById('sb-roi-out-prod');
  var outInvest = document.getElementById('sb-roi-out-invest');
  var outNetto = document.getElementById('sb-roi-out-netto');
  var outRoi = document.getElementById('sb-roi-out-roi');

  /* ---- Excel checkbox hint ---- */
  cbExcel.addEventListener('change', function () {
    if (cbExcel.checked) {
      hintEl.textContent = 'Actief: er wordt gerekend met 2% foutpercentage.';
    } else {
      hintEl.textContent = 'Inactief: foutpercentage staat op 0% (vink aan om met 2% te rekenen).';
    }
  });

  /* ---- Helpers ---- */
  function euro(n) {
    return '\u20AC ' + n.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function num(input) {
    var v = parseFloat(input.value);
    return isNaN(v) ? 0 : v;
  }

  /* ---- Berekening ---- */
  var PRIJS_PER_MEDEWERKER = 4; // € per medewerker per maand (voorbeeld)
  var FOUT_PERCENTAGE = 0.02;

  document.getElementById('sb-roi-calc').addEventListener('click', function () {
    var L = num(inputL);
    var N = num(inputN);
    var H = num(inputH);
    var R = num(inputR);
    var foutPct = cbExcel.checked ? FOUT_PERCENTAGE : 0;

    /* Dimensie 1: foutkosten besparing */
    var foutBesparing = L * foutPct;

    /* Dimensie 2: HR-productiviteit */
    var prodBesparing = H * R;

    /* Investering */
    var investering = N * PRIJS_PER_MEDEWERKER;

    /* Netto */
    var netto = foutBesparing + prodBesparing - investering;

    /* ROI */
    var roi = investering > 0 ? ((foutBesparing + prodBesparing) / investering - 1) * 100 : 0;

    outFout.textContent = euro(foutBesparing);
    outProd.textContent = euro(prodBesparing);
    outInvest.textContent = euro(investering);
    outNetto.textContent = euro(netto);
    outNetto.style.color = netto >= 0 ? '#059669' : '#dc2626';
    outRoi.textContent = roi.toFixed(0) + '%';
    outRoi.style.color = roi >= 0 ? '#059669' : '#dc2626';

    resultEl.style.display = 'block';
  });

  /* ---- Reset ---- */
  document.getElementById('sb-roi-reset').addEventListener('click', function () {
    inputL.value = '';
    inputN.value = '';
    inputH.value = '';
    inputR.value = '45';
    cbExcel.checked = false;
    cbExcel.dispatchEvent(new Event('change'));
    resultEl.style.display = 'none';
  });
})();
