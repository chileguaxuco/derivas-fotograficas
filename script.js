(function () {
  'use strict';

  // --- Helpers ---
  function isPorLlenar(val) {
    if (!val) return true;
    if (typeof val !== 'string') return false;
    return val.trim() === '' || val.includes('[POR LLENAR');
  }

  // Acto colors
  const ACTO_COLORS = { 1: '#F47B6B', 2: '#1A1A1A', 3: '#9E9E9E' };

  // --- DOM refs ---
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const modalOverlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalTag = document.getElementById('modalTag');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  // --- Sidebar drawer ---
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar on nav link click (mobile)
  sidebar.querySelectorAll('.nav-link, .nav-sub a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 1024) closeSidebar();
    });
  });

  // --- Intersection Observer for active section ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(function (s) { observer.observe(s); });

  // --- Lightbox ---
  var lightboxOverlay = document.getElementById('lightboxOverlay');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxCloseBtn = document.getElementById('lightboxClose');

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightboxOverlay.hidden = false;
  }

  function closeLightbox() {
    lightboxOverlay.hidden = true;
    lightboxImg.src = '';
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', function (e) {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightboxOverlay.hidden) closeLightbox();
  });

  // --- Modal ---
  function openModal(stop, actoNum) {
    var actoLabel = 'Acto ' + actoNum + ' · Parada ' + stop.orden_global;
    modalTag.textContent = actoLabel;

    var html = '<h2 class="modal-name">' + escHtml(stop.nombre) + '</h2>';

    if (!isPorLlenar(stop.por_que_paramos)) {
      html += '<div class="modal-section">';
      html += '<h3 class="modal-section-title">¿Por qué paramos aquí?</h3>';
      html += '<p>' + escHtml(stop.por_que_paramos) + '</p>';
      html += '</div>';
    }

    if (!isPorLlenar(stop.descripcion_corta)) {
      html += '<div class="modal-section">';
      html += '<h3 class="modal-section-title">Descripción</h3>';
      html += '<p>' + escHtml(stop.descripcion_corta) + '</p>';
      html += '</div>';
    }

    // Meta
    var metaItems = [];
    if (!isPorLlenar(stop.ano_fundacion)) metaItems.push(['Año de inauguración', stop.ano_fundacion]);
    if (!isPorLlenar(stop.pelicula_inauguracion)) metaItems.push(['Película de inauguración', stop.pelicula_inauguracion]);
    if (!isPorLlenar(stop.ultima_pelicula)) metaItems.push(['Última película', stop.ultima_pelicula]);
    if (!isPorLlenar(stop.ano_abandono) && stop.ano_abandono !== '—') metaItems.push(['Año de abandono', stop.ano_abandono]);
    if (!isPorLlenar(stop.estado_actual)) metaItems.push(['Estado actual', stop.estado_actual]);
    if (!isPorLlenar(stop.aforo)) metaItems.push(['Aforo', stop.aforo]);
    if (!isPorLlenar(stop.estilo_arquitectonico)) metaItems.push(['Estilo arquitectónico', stop.estilo_arquitectonico]);
    if (!isPorLlenar(stop.arquitecto)) metaItems.push(['Arquitecto', stop.arquitecto]);
    if (!isPorLlenar(stop.direccion)) metaItems.push(['Dirección', stop.direccion]);

    if (metaItems.length > 0) {
      html += '<dl class="modal-meta">';
      metaItems.forEach(function (m) {
        html += '<dt>' + escHtml(m[0]) + '</dt><dd>' + escHtml(m[1]) + '</dd>';
      });
      html += '</dl>';
    }

    // Images
    if (stop.imagenes && stop.imagenes.length > 0) {
      html += '<div class="modal-gallery" id="modalGallery">';
      stop.imagenes.forEach(function (img, idx) {
        html += '<figure class="gallery-item">';
        html += '<img src="' + escAttr(img.src) + '" alt="' + escAttr(img.alt || '') + '" loading="lazy" data-lightbox-idx="' + idx + '" onerror="this.closest(\'figure\').remove()">';
        if (img.credit && !isPorLlenar(img.credit)) {
          html += '<figcaption>' + escHtml(img.credit) + '</figcaption>';
        }
        html += '</figure>';
      });
      html += '</div>';
    }

    modalBody.innerHTML = html;

    // Bind lightbox clicks on gallery images
    if (stop.imagenes && stop.imagenes.length > 0) {
      modalBody.querySelectorAll('[data-lightbox-idx]').forEach(function (imgEl) {
        imgEl.addEventListener('click', function () {
          var idx = parseInt(imgEl.dataset.lightboxIdx);
          var imgData = stop.imagenes[idx];
          if (imgData) openLightbox(imgData.src, imgData.alt, imgData.credit);
        });
      });
    }
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
  });

  // --- Escape HTML ---
  function escHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // --- Load data ---
  fetch('data/stops.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { render(data); })
    .catch(function (err) { console.error('Error loading data:', err); });

  function render(data) {
    var taller = data.taller;
    var actos = data.actos;
    var stops = data.stops;

    // Build stop lookup
    var stopMap = {};
    stops.forEach(function (s) { stopMap[s.id] = s; });

    // Sidebar sub-nav: actos
    var navActos = document.getElementById('navActos');
    actos.forEach(function (acto) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#acto-' + acto.numero;
      a.textContent = 'Acto ' + acto.numero + ' — ' + acto.titulo;
      li.appendChild(a);
      navActos.appendChild(li);
      // Close sidebar on click (mobile)
      a.addEventListener('click', function () {
        if (window.innerWidth < 1024) closeSidebar();
      });
    });

    // Render actos
    var actosContainer = document.getElementById('actosContainer');
    actos.forEach(function (acto) {
      var div = document.createElement('div');
      div.className = 'acto open';
      div.id = 'acto-' + acto.numero;

      var headerHtml = '<div class="acto-header" role="button" tabindex="0" aria-expanded="true">';
      headerHtml += '<span class="acto-number acto-' + acto.numero + '">' + acto.numero + '</span>';
      headerHtml += '<div class="acto-info">';
      headerHtml += '<div class="acto-title">' + escHtml(acto.titulo) + '</div>';
      headerHtml += '<div class="acto-desc">' + escHtml(acto.descripcion) + '</div>';
      headerHtml += '</div>';
      headerHtml += '<span class="acto-toggle" aria-hidden="true">▾</span>';
      headerHtml += '</div>';

      var stopsHtml = '<div class="acto-stops">';
      acto.stops.forEach(function (stopId) {
        var stop = stopMap[stopId];
        if (!stop) return;
        stopsHtml += '<div class="acto-stop-item" data-stop="' + stop.id + '" tabindex="0" role="button">';
        stopsHtml += '<span class="acto-stop-num">' + stop.orden_global + '.</span> ' + escHtml(stop.nombre);
        stopsHtml += '</div>';
      });
      stopsHtml += '</div>';

      div.innerHTML = headerHtml + stopsHtml;
      actosContainer.appendChild(div);

      // Toggle
      var header = div.querySelector('.acto-header');
      header.addEventListener('click', function () {
        div.classList.toggle('open');
        header.setAttribute('aria-expanded', div.classList.contains('open'));
      });
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          div.classList.toggle('open');
          header.setAttribute('aria-expanded', div.classList.contains('open'));
        }
      });

      // Stop items → open modal
      div.querySelectorAll('.acto-stop-item').forEach(function (item) {
        function handleClick() {
          var stop = stopMap[item.dataset.stop];
          if (stop) openModal(stop, acto.numero);
        }
        item.addEventListener('click', handleClick);
        item.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
        });
      });
    });

    // Render testimonios
    var testimoniosContainer = document.getElementById('testimoniosContainer');
    var hasTestimonios = false;
    stops.forEach(function (stop) {
      if (isPorLlenar(stop.testimonio_archivo)) return;
      hasTestimonios = true;
      var div = document.createElement('div');
      div.className = 'testimonio';
      var years = stop.ano_fundacion || '';
      if (stop.ano_abandono && stop.ano_abandono !== '—') years += ' – ' + stop.ano_abandono;
      div.innerHTML =
        '<div class="testimonio-header">' + escHtml(stop.nombre) + (years ? ' · ' + escHtml(years) : '') + '</div>' +
        '<div class="testimonio-text">' + escHtml(stop.testimonio_archivo) + '</div>';
      testimoniosContainer.appendChild(div);
    });
    if (!hasTestimonios) {
      testimoniosContainer.style.display = 'none';
    }

    // Mapa estático para impresión (Wikimedia Maps, sin API key)
    var printMapImg = document.getElementById('printMapImage');
    if (printMapImg) {
      var sumLat = 0, sumLng = 0;
      stops.forEach(function (s) { sumLat += s.coords.lat; sumLng += s.coords.lng; });
      var cLat = (sumLat / stops.length).toFixed(4);
      var cLng = (sumLng / stops.length).toFixed(4);
      printMapImg.src = 'https://maps.wikimedia.org/img/osm-intl,14,' + cLat + ',' + cLng + ',800x450.png';
      printMapImg.onerror = function () { this.closest('.print-map-box').style.display = 'none'; };
    }

    // Enlace y QR digital (se activan cuando DIGITAL_URL está configurada)
    if (DIGITAL_URL) {
      var urlEl = document.getElementById('printBitlyUrl');
      var qrEl = document.getElementById('printQrImage');
      if (urlEl) urlEl.textContent = DIGITAL_URL;
      if (qrEl) qrEl.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(DIGITAL_URL);
    }

    // Render print stops
    renderPrintStops(actos, stopMap);

    // Init map
    initMap(stops, actos, stopMap);
  }

  // --- Print stops (for print.css) ---
  function renderPrintStops(actos, stopMap) {
    var container = document.getElementById('printStops');
    actos.forEach(function (acto) {
      var actoDiv = document.createElement('div');
      actoDiv.className = 'print-acto';
      actoDiv.innerHTML = '<h3 class="print-acto-title">Acto ' + acto.numero + ' — ' + escHtml(acto.titulo) + '</h3>' +
        '<p class="print-acto-desc">' + escHtml(acto.descripcion) + '</p>';

      acto.stops.forEach(function (stopId) {
        var stop = stopMap[stopId];
        if (!stop) return;
        var stopDiv = document.createElement('div');
        stopDiv.className = 'print-stop';
        var html = '<h4 class="print-stop-name"><span class="print-stop-num">' + stop.orden_global + '.</span> ' + escHtml(stop.nombre) + '</h4>';

        if (!isPorLlenar(stop.descripcion_corta)) {
          html += '<p>' + escHtml(stop.descripcion_corta) + '</p>';
        }
        if (!isPorLlenar(stop.por_que_paramos)) {
          html += '<p><strong>¿Por qué paramos?</strong> ' + escHtml(stop.por_que_paramos) + '</p>';
        }

        var meta = [];
        if (!isPorLlenar(stop.ano_fundacion)) meta.push('Inauguración: ' + stop.ano_fundacion);
        if (!isPorLlenar(stop.ano_abandono) && stop.ano_abandono !== '—') meta.push('Abandono: ' + stop.ano_abandono);
        if (!isPorLlenar(stop.estado_actual)) meta.push('Estado: ' + stop.estado_actual);
        if (!isPorLlenar(stop.direccion)) meta.push('Dir: ' + stop.direccion);
        if (meta.length) html += '<p class="print-stop-meta">' + meta.map(escHtml).join(' · ') + '</p>';

        // Max 2 images for print
        if (stop.imagenes && stop.imagenes.length > 0) {
          html += '<div class="print-stop-images">';
          stop.imagenes.slice(0, 2).forEach(function (img) {
            html += '<img src="' + escAttr(img.src) + '" alt="' + escAttr(img.alt || '') + '" onerror="this.remove()">';
          });
          html += '</div>';
        }

        stopDiv.innerHTML = html;
        actoDiv.appendChild(stopDiv);
      });

      container.appendChild(actoDiv);
    });
  }

  // Puntos intermedios que siguen el trazo de calles reales entre paradas.
  // Clave: id de la parada DESPUÉS de la cual se insertan los waypoints.
  // Ruta: Antiguo Cine Monterrey → este por Modesto Arreola → sur por Calle Zaragoza → Macroplaza
  var ROUTE_WAYPOINTS = {
    'cine_monterrey': [
      [25.6758, -100.3195], // baja a Modesto Arreola
      [25.6755, -100.3150], // este por Modesto Arreola
      [25.6752, -100.3100], // esquina Arreola / Zaragoza
      [25.6720, -100.3097]  // sur por Zaragoza hacia Macroplaza
    ]
  };

  // URL de la versión digital — actualizar al desplegar en GitHub Pages
  var DIGITAL_URL = 'https://chileguaxuco.github.io/derivas-fotograficas/';

  // --- Leaflet Map ---
  function initMap(stops, actos, stopMap) {
    var map = L.map('map', {
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(map);

    var bounds = [];
    var polylineCoords = [];

    // Build acto lookup for quick access
    var stopActoMap = {};
    actos.forEach(function (acto) {
      acto.stops.forEach(function (sid) { stopActoMap[sid] = acto.numero; });
    });

    stops.forEach(function (stop) {
      var latlng = [stop.coords.lat, stop.coords.lng];
      bounds.push(latlng);
      polylineCoords.push(latlng);

      // Insertar waypoints de calles después de esta parada (solo en la polilínea)
      if (ROUTE_WAYPOINTS[stop.id]) {
        ROUTE_WAYPOINTS[stop.id].forEach(function (wp) { polylineCoords.push(wp); });
      }

      var actoNum = stopActoMap[stop.id] || 1;
      var color = ACTO_COLORS[actoNum] || ACTO_COLORS[1];

      var icon = L.divIcon({
        className: '',
        html: '<div class="custom-marker" style="background:' + color + '">' + stop.orden_global + '</div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      var marker = L.marker(latlng, { icon: icon }).addTo(map);

      // Tooltip (desktop hover)
      var years = stop.ano_fundacion || '';
      var tooltipText = stop.nombre + (years && !isPorLlenar(years) ? ' (' + years + ')' : '');
      marker.bindTooltip(tooltipText, { direction: 'top', offset: [0, -16] });

      // Click → modal
      marker.on('click', function () {
        openModal(stop, actoNum);
      });
    });

    // Polilínea — ruta del recorrido con calles reales
    L.polyline(polylineCoords, {
      color: '#F47B6B',
      weight: 3,
      opacity: 0.55,
      dashArray: '10 6'
    }).addTo(map);

    // Fit bounds (solo paradas, no waypoints)
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }

})();
