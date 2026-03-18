/**
 * Zelf-test checklist: waar lekt tijd uit je rooster?
 *
 * Gebruik:
 *   <div id="sb-zelftest-rooster"></div>
 *   <script src="snippet.js"></script>
 *
 * Of via jsDelivr:
 *   <script src="https://cdn.jsdelivr.net/gh/[OWNER]/marketing-js@main/snippets/nl-zelftest-rooster/snippet.js"></script>
 */
(function () {
  'use strict';

  var root = document.getElementById('sb-zelftest-rooster');
  if (!root) return;

  root.classList.add('sb-widget');

  /* ---- Data ---- */
  var categories = [
    {
      num: 1,
      title: 'Roosterplanning & herstelwerk',
      subtitle: 'Tijdverlies door correcties nadat het rooster is gepubliceerd',
      items: [
        'Ik pas roosters na publicatie meerdere keren aan',
        'Diensten moeten last minute worden geruild of opnieuw verdeeld',
        'Planningsfouten vallen pas op als het al druk is'
      ],
      pattern: 'het rooster is \u201Caf\u201D, maar in de praktijk nog niet stabiel.'
    },
    {
      num: 2,
      title: 'Beschikbaarheid & afwezigheid',
      subtitle: 'Tijdverlies door ontbrekende of verouderde informatie',
      items: [
        'Beschikbaarheid wordt laat of onvolledig doorgegeven',
        'Verlof/afwezigheid staat niet altijd actueel in het overzicht',
        'Ik check informatie handmatig voordat ik kan plannen'
      ],
      pattern: 'je plant op aannames in plaats van op betrouwbare data.'
    },
    {
      num: 3,
      title: 'Communicatie & afstemming',
      subtitle: 'Tijdverlies door vragen, ruis en meerdere kanalen',
      items: [
        'Medewerkers vragen regelmatig naar diensten of wijzigingen',
        'Info gaat via meerdere kanalen (WhatsApp, bellen, mail, briefjes)',
        'Ik leg dezelfde dingen meerdere keren uit'
      ],
      pattern: 'er is geen centrale, \u201Cleidende\u201D bron van waarheid.'
    },
    {
      num: 4,
      title: 'Uren & correcties',
      subtitle: 'Tijdverlies doordat planning en werkelijkheid uit elkaar lopen',
      items: [
        'Geplande en gewerkte tijden komen niet altijd overeen',
        'Uren moeten achteraf worden gecorrigeerd of verklaard',
        'Vragen over salaris/uren kosten veel tijd'
      ],
      pattern: 'de administratie loopt achter de feiten aan.'
    },
    {
      num: 5,
      title: 'Mentale belasting',
      subtitle: 'Onzichtbare stressfactor met grote impact op de lange termijn',
      items: [
        'Plannen voelt zwaarder dan het zou moeten zijn',
        'Ik denk buiten werktijd nog aan open planningsvragen',
        'Planning kost mij energie, in plaats van dat het rust brengt'
      ],
      pattern: 'planning is niet \u201Cklaar\u201D, maar blijft mentaal doorspelen.'
    }
  ];

  var interpretations = [
    { max: 4, status: 'grotendeels stabiel', text: 'je roosterproces is grotendeels stabiel. Kleine frictie is normaal en meestal goed te beheersen.' },
    { max: 8, status: 'merkbare frictie', text: 'er is merkbare frictie in je roosterproces. De kans is groot dat je wekelijks tijd verliest aan vermijdbare taken.' },
    { max: 12, status: 'structureel tijdverlies', text: 'je verliest structureel tijd aan je roosterproces. Automatisering kan hier direct impact maken.' },
    { max: 15, status: 'hoge druk', text: 'je roosterproces vraagt onevenredig veel tijd en energie. Er is ruimte voor grote verbeteringen.' }
  ];

  var TOTAL_ITEMS = 15;

  /* ---- HTML ---- */
  function buildCategoryHTML(cat) {
    var itemsHTML = '';
    for (var i = 0; i < cat.items.length; i++) {
      var id = 'sb-zt-c' + cat.num + '-i' + i;
      itemsHTML +=
        '<label class="sb-zt__checkbox-label" for="' + id + '">' +
          '<input type="checkbox" id="' + id + '" class="sb-zt__checkbox" data-cat="' + cat.num + '"> ' +
          '<span>' + cat.items[i] + '</span>' +
        '</label>';
    }

    return (
      '<div class="sb-zt__category">' +
        '<div class="sb-zt__cat-header">' +
          '<span class="sb-zt__cat-num">' + cat.num + '</span>' +
          '<div>' +
            '<h3 class="sb-zt__cat-title">' + cat.title + '</h3>' +
            '<p class="sb-text-muted sb-zt__cat-subtitle">' + cat.subtitle + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="sb-zt__items">' + itemsHTML + '</div>' +
        '<div class="sb-zt__pattern">' +
          '<strong>Typisch patroon:</strong> ' + cat.pattern +
        '</div>' +
      '</div>'
    );
  }

  var categoriesHTML = '';
  for (var c = 0; c < categories.length; c++) {
    categoriesHTML += buildCategoryHTML(categories[c]);
  }

  root.innerHTML =
    '<div class="sb-zt">' +
      '<h2 class="sb-zt__title">\u2705 Zelf-test checklist: waar lekt tijd uit je rooster?</h2>' +
      '<p class="sb-text-muted sb-mb-3">Vink spontaan aan wat in de afgelopen 7\u201314 dagen van toepassing was. De score laat live zien hoeveel \u201Ctijdlekken\u201D er nu actief zijn.</p>' +

      /* Score header */
      '<div class="sb-zt__score-row">' +
        '<div class="sb-zt__score-left">' +
          '<div class="sb-zt__score-label"><strong>Tijdlek-score:</strong> <span id="sb-zt-score">0</span>/15</div>' +
          '<div class="sb-zt__status">Status: <span id="sb-zt-status">grotendeels stabiel</span></div>' +
          '<div class="sb-zt__bar-track"><div class="sb-zt__bar-fill" id="sb-zt-bar"></div></div>' +
        '</div>' +
        '<div class="sb-zt__score-tip sb-text-muted" id="sb-zt-tip"></div>' +
      '</div>' +

      /* Categories */
      categoriesHTML +

      /* Open punten */
      '<div class="sb-card sb-mt-3" id="sb-zt-open" style="display:none;">' +
        '<p><strong>Open punten</strong> (dit speelt nu nog)</p>' +
        '<ul class="sb-zt__open-list" id="sb-zt-open-list"></ul>' +
      '</div>' +

      /* Interpretatie */
      '<div class="sb-card sb-mt-3" id="sb-zt-interp">' +
        '<strong>Interpretatie:</strong> <span id="sb-zt-interp-range">0\u20134 punten</span>: <span id="sb-zt-interp-text">je roosterproces is grotendeels stabiel. Kleine frictie is normaal en meestal goed te beheersen.</span>' +
      '</div>' +

    '</div>';

  /* ---- Styles (snippet-specifiek) ---- */
  var style = document.createElement('style');
  style.textContent =
    '.sb-zt { max-width: 760px; margin: 0 auto; }' +
    '.sb-zt__title { margin-bottom: 0.5rem; }' +

    /* Score row */
    '.sb-zt__score-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; margin-bottom: 2rem; }' +
    '.sb-zt__score-left { flex: 0 0 auto; }' +
    '.sb-zt__score-label { font-size: 1rem; margin-bottom: 0.25rem; }' +
    '.sb-zt__status { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; }' +
    '.sb-zt__bar-track { width: 220px; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }' +
    '.sb-zt__bar-fill { height: 100%; width: 0%; background: #31a7f0; border-radius: 4px; transition: width 0.3s ease; }' +
    '.sb-zt__score-tip { flex: 1; font-size: 0.85rem; text-align: right; }' +
    '@media (max-width: 600px) { .sb-zt__score-row { flex-direction: column; } .sb-zt__score-tip { text-align: left; } }' +

    /* Category */
    '.sb-zt__category { margin-bottom: 1.75rem; }' +
    '.sb-zt__cat-header { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; }' +
    '.sb-zt__cat-num { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #31a7f0; color: #fff; font-size: 0.8rem; font-weight: 700; border-radius: 6px; flex-shrink: 0; margin-top: 2px; }' +
    '.sb-zt__cat-title { font-size: 1.1rem; font-weight: 700; }' +
    '.sb-zt__cat-subtitle { font-size: 0.85rem; margin-bottom: 0; }' +

    /* Checkbox items */
    '.sb-zt__items { margin-left: 2.5rem; margin-bottom: 0.75rem; }' +
    '.sb-zt__checkbox-label { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.5rem 0; cursor: pointer; font-size: 0.95rem; line-height: 1.4; }' +
    '.sb-zt__checkbox { width: 20px; height: 20px; accent-color: #31a7f0; flex-shrink: 0; margin-top: 1px; cursor: pointer; }' +

    /* Pattern box */
    '.sb-zt__pattern { margin-left: 2.5rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.9rem; color: #374151; }' +

    /* Open punten */
    '.sb-zt__open-list { list-style: disc; padding-left: 1.5rem; margin-top: 0.75rem; }' +
    '.sb-zt__open-list li { padding: 0.25rem 0; font-size: 0.95rem; }' +

    '';
  document.head.appendChild(style);

  /* ---- Logic ---- */
  var scoreEl = document.getElementById('sb-zt-score');
  var statusEl = document.getElementById('sb-zt-status');
  var barEl = document.getElementById('sb-zt-bar');
  var tipEl = document.getElementById('sb-zt-tip');
  var openEl = document.getElementById('sb-zt-open');
  var openListEl = document.getElementById('sb-zt-open-list');
  var interpRangeEl = document.getElementById('sb-zt-interp-range');
  var interpTextEl = document.getElementById('sb-zt-interp-text');

  var checkboxes = root.querySelectorAll('.sb-zt__checkbox');

  function update() {
    var score = 0;
    var checked = [];

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        score++;
        var label = checkboxes[i].parentElement.querySelector('span');
        if (label) checked.push(label.textContent);
      }
    }

    /* Score display */
    scoreEl.textContent = score;
    barEl.style.width = (score / TOTAL_ITEMS * 100) + '%';

    /* Interpretation */
    var interp = interpretations[0];
    for (var j = 0; j < interpretations.length; j++) {
      if (score <= interpretations[j].max) {
        interp = interpretations[j];
        break;
      }
    }
    statusEl.textContent = interp.status;

    var prevMax = 0;
    for (var k = 0; k < interpretations.length; k++) {
      if (interpretations[k] === interp) {
        interpRangeEl.textContent = prevMax + '\u2013' + interp.max + ' punten';
        break;
      }
      prevMax = interpretations[k].max + 1;
    }
    interpTextEl.textContent = interp.text;

    /* Tip */
    if (score >= 2) {
      tipEl.innerHTML = 'Tip: de grootste tijdwinst zit vaak in <strong>actuele beschikbaarheid</strong> en <strong>\u00E9\u00E9n centraal communicatiekanaal</strong>.';
    } else {
      tipEl.textContent = '';
    }

    /* Open punten */
    if (checked.length > 0) {
      openEl.style.display = 'block';
      var listHTML = '';
      for (var m = 0; m < checked.length; m++) {
        listHTML += '<li>' + checked[m] + '</li>';
      }
      openListEl.innerHTML = listHTML;
    } else {
      openEl.style.display = 'none';
    }

    /* Bar color */
    if (score <= 4) {
      barEl.style.background = '#31a7f0';
    } else if (score <= 8) {
      barEl.style.background = '#f59e0b';
    } else if (score <= 12) {
      barEl.style.background = '#f97316';
    } else {
      barEl.style.background = '#dc2626';
    }
  }

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', update);
  }

  update();
})();
