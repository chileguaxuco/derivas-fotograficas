# Derivas Fotográficas — Kit del taller

Kit digital e imprimible para el fototour del **2 de mayo de 2026**, 9:00–13:00.
Vinculado a la exposición *¿Cómo salimos?* de Teresa Margolles en MARCO, Monterrey.

**Sitio en línea:** https://chileguaxuco.github.io/derivas-fotograficas/

---

## Estado del proyecto

### Hecho

**Interfaz y estructura**
- [x] Página única HTML con 8 secciones: portada, recorrido, fórmula, cuidados, archivos históricos, colección fotográfica digital, WhatsApp, créditos
- [x] Sidebar de navegación con índice (desktop) y menú hamburguesa (móvil)
- [x] Datos cargados desde `data/stops.json` vía `fetch()` — sin backend
- [x] Responsive: desktop 2 columnas (sidebar + contenido), móvil drawer lateral
- [x] Tipografía: Cormorant Garamond (títulos) + Lora (cuerpo) + IBM Plex Mono (archivos/código)

**Mapa**
- [x] Mapa interactivo Leaflet con tiles de OpenStreetMap
- [x] Marcadores numerados (1–7) con color por acto (coral / negro / gris)
- [x] Polilínea del recorrido con waypoints que siguen calles reales: Julián Villagrán → Modesto Arreola → Calle Zaragoza → Macroplaza → MARCO
- [x] Tooltip en marcadores (nombre + año) al hacer hover
- [x] Modal de parada con descripción, metadatos, imágenes y crédito de autoría al hacer clic

**Sección Recorrido**
- [x] Indicador de ruta tipográfico (`.ruta-calles`): scroll horizontal en móvil, sin overflow
- [x] 7 paradas organizadas en 3 actos: El Olvido / La Destrucción / La Reinterpretación

**Secciones de contenido**
- [x] Sección "Fórmula de colección fotográfica" (3 tarjetas)
- [x] Sección "Cuidados al fotografiar" (4 bloques 2×2: identidades, no infancias, calidad, si alguien te pregunta)
- [x] Sección "Archivos Históricos" (testimonios por parada, oculto si no hay contenido)
- [x] Sección "Colección fotográfica digital" (8 pasos con fórmula de nombrado, categorías de Wikimedia, video embebido)
- [x] Sección "WhatsApp" con QR y enlace al grupo

**Datos de paradas (7 stops)**
- [x] Cine Encanto (acto 1) — fachada en pie
- [x] Cine Alameda (acto 1) — fachada en pie
- [x] Cine Montoya (acto 1) — fachada en pie
- [x] Antiguo Cine Monterrey (acto 1) — patrimonio + mercado interior
- [x] Teatro Juárez / Cine Rex / Cine Olympia (acto 2) — 4 generaciones, borrado por Macroplaza
- [x] Cine Elizondo (acto 2) — borrado por Macroplaza, predio hoy Fuente de Neptuno
- [x] MARCO (acto 3) — sede de la exposición, cierre del fototour

**Imágenes**
- [x] Encanto: `01.png`
- [x] Alameda: `01.png`, `02.png`
- [x] Montoya: `01.png`
- [x] Cine Monterrey: `actual_01.jpg` (CC BY-SA 2.0, LABNL/CONARTE)
- [x] Teatro Juárez: `1.png`–`4.png` (secuencia de 4 generaciones, cinesaurio.com)
- [x] Elizondo: `1.png`–`5.png` (archivo cinesaurio.com) + `fuente_neptuno_actual.jpg` (CC BY-SA 4.0)
- [x] MARCO: `exterior_01.jpg` (CC BY-SA 3.0), `exterior_02.jpg` (CC BY-SA 3.0)
- [x] QR WhatsApp: `assets/qr-whatsapp.png`

**Despliegue**
- [x] Publicado en GitHub Pages: https://chileguaxuco.github.io/derivas-fotograficas/
- [x] `DIGITAL_URL` configurada en `script.js` — QR y enlace de la versión digital activos en impresión
- [x] WhatsApp: enlace real del grupo configurado en `index.html` y QR en `assets/`

**Versión imprimible**
- [x] `print.css` con layout carta (US Letter, 2cm márgenes)
- [x] Mapa interactivo Leaflet visible en impresión (con marcadores y ruta)
- [x] Detalles de paradas (actos + descripción) generados por JS en bloque de impresión
- [x] Video de Wikimedia Commons oculto en impresión (`.no-print`)
- [x] Pie de página automático con nombre del taller y número de página

---

## Pendientes

### Críticos (antes del 2 de mayo)

- [ ] **Llenar `por_que_paramos` en cada parada** (`data/stops.json`)
  - Texto del facilitador, ~60–80 palabras por parada
  - Se muestra en el modal al hacer clic sobre cada marcador del mapa

- [ ] **Llenar `testimonio_archivo` en cada parada** (`data/stops.json`)
  - Guión a partir de archivos históricos
  - Se muestra en la sección "Archivos Históricos" (oculto si está vacío)

- [ ] **Imágenes faltantes** en `assets/images/`
  - `cine_monterrey/historico_01.jpg` — foto histórica del cine en sus años activos (1947–1960s)
  - `cine_monterrey/mercado_01.jpg` — interior funcionando como mercado
  - `elizondo/fuente_neptuno_actual.jpg` — ya referenciada, falta subir el archivo
  - `marco/la_ilusion.jpg` — pieza *La ilusión* (2025) de Teresa Margolles

### Mejoras opcionales

- [ ] **Afinar waypoints de la ruta en el mapa**
  - Los waypoints actuales son aproximaciones de coordenadas de calle
  - Editar el objeto `ROUTE_WAYPOINTS` en `script.js` línea ~314

- [ ] **Verificar la impresión en distintos navegadores**
  - Chrome (recomendado): el canvas de Leaflet imprime correctamente
  - Firefox: puede haber diferencias en el mapa canvas
  - Safari iOS: probar desde el dispositivo con "Imprimir" del sistema

- [ ] **Agregar dirección exacta del Teatro Juárez**
  - Campo `direccion` en `data/stops.json` marcado como `[POR LLENAR]`

- [ ] **Dominio personalizado** (opcional)
  - Agregar archivo `CNAME` en la raíz y configurar DNS

---

## Estructura de archivos

```
files/
├── index.html          ← página principal
├── styles.css          ← estilos de pantalla
├── print.css           ← estilos de impresión (carta, 2cm márgenes)
├── script.js           ← lógica JS: mapa, modal, render de datos
├── data/
│   └── stops.json      ← datos de paradas, actos y taller (EDITAR AQUÍ)
└── assets/
    ├── images/
    │   ├── encanto/
    │   ├── alameda/
    │   ├── montoya/
    │   ├── cine_monterrey/
    │   ├── teatro_juarez/
    │   ├── elizondo/
    │   └── marco/
    ├── icons/
    └── qr-whatsapp.png
```

---

## Cómo actualizar el contenido (sin tocar código)

1. Abrir `data/stops.json` en cualquier editor de texto
2. Buscar los campos `[POR LLENAR]` y reemplazarlos con el texto real
3. Agregar imágenes en las carpetas de `assets/images/` con los nombres que ya están en el JSON
4. Hacer `git add . && git commit -m "actualizar contenido" && git push`
5. En ~1 minuto la versión en línea se actualiza automáticamente

---

*Kit generado con Claude Code · Taller Derivas Fotográficas · MARCO Monterrey · Mayo 2026*
