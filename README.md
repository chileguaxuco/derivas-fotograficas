# Derivas Fotográficas — Kit del taller

Kit digital e imprimible para el fototour del **2 de mayo de 2026**, 9:00–13:00.
Vinculado a la exposición *¿Cómo salimos?* de Teresa Margolles en MARCO, Monterrey.

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
- [x] Marcadores numerados (1–6) con color por acto (coral / negro / gris)
- [x] Polilínea del recorrido con waypoints que siguen calles reales: Julián Villagrán → Modesto Arreola → Calle Zaragoza → Macroplaza
- [x] Tooltip en marcadores (nombre + año) al hacer hover
- [x] Modal de parada con descripción, metadatos e imágenes al hacer clic

**Sección Recorrido**
- [x] Indicador de ruta tipográfico (`.ruta-calles`): calles con paradas en tipografía editorial (Cormorant Garamond itálica + Lora), sin fondos ni píldoras — estética coherente con el resto
- [x] Párrafo descriptivo de las seis paradas y calles del recorrido

**Secciones de contenido**
- [x] Sección "Fórmula de colección fotográfica" (3 tarjetas)
- [x] Sección "Cuidados al fotografiar" (4 bloques 2×2: identidades, no infancias, calidad, si alguien te pregunta)
- [x] Sección "Archivos Históricos" (testimonios por parada, oculto si no hay contenido)
- [x] Sección "Colección fotográfica digital" (8 pasos con fórmula de nombrado, categorías de Wikimedia, video embebido)
- [x] Sección "WhatsApp" con QR y enlace de respaldo

**Datos de paradas**
- [x] Campo etiquetado como "Año de inauguración" en modal, tooltip del mapa y versión impresa
- [x] Campos editables en `data/stops.json`: `ano_fundacion`, `ano_abandono`, `estado_actual`, `descripcion_corta`, `por_que_paramos`, `testimonio_archivo`

**Versión imprimible**
- [x] `print.css` con layout carta (US Letter, 2cm márgenes)
- [x] Página 1: portada + mapa estático de Wikimedia Maps + (cuando esté configurado) QR y bit.ly de la versión digital
- [x] Mapa interactivo Leaflet visible en impresión (con marcadores y ruta)
- [x] Páginas siguientes: secciones fórmula, cuidados, archivos, colección fotográfica digital
- [x] Detalles de paradas (actos + descripción) generados por JS en bloque de impresión
- [x] Video de Wikimedia Commons oculto en impresión (`.no-print`)
- [x] Pie de página automático con nombre del taller y número de página

---

## Pendientes

### Críticos (antes del 2 de mayo)

- [ ] **Publicar en GitHub Pages**
  1. Crear repositorio público en GitHub (ej. `documentar-el-olvido`)
  2. Subir la carpeta `files/` como raíz del repositorio
  3. Activar GitHub Pages: `Settings → Pages → Deploy from branch: main → / (root)`
  4. La URL quedará en: `https://[usuario].github.io/documentar-el-olvido/`

- [ ] **Configurar URL digital en `script.js`**
  - Una vez desplegado, editar línea `var DIGITAL_URL = '';` en `script.js`
  - Poner la URL de GitHub Pages (o dominio personalizado)
  - El QR y bit.ly en la versión impresa se activarán automáticamente

- [ ] **Agregar código QR y bit.ly de la versión digital** a la versión impresa
  - Crear el bit.ly en [bitly.com](https://bitly.com) con la URL de GitHub Pages
  - El QR se genera automáticamente desde `api.qrserver.com` cuando se configura `DIGITAL_URL`

- [ ] **Agregar código QR del grupo de WhatsApp**
  - Crear el grupo de WhatsApp del taller
  - Guardar el enlace de invitación en el campo `whatsapp.url` del JSON
  - Guardar el QR como `assets/qr-whatsapp.png`

- [ ] **Agregar imágenes de los cines** en `assets/images/`
  - Especificaciones: JPG, lado largo máximo 1600px, < 300 KB c/u
  - Subcarpetas: `encanto/`, `alameda/`, `montoya/`, `cine_monterrey/`, `macroplaza/`, `marco/`

- [ ] **Agregar un archivo histórico (testimonio) por cine**
  - Editar el campo `testimonio_archivo` de cada parada en `data/stops.json`
  - Se mostrarán automáticamente en la sección "Archivos Históricos"

- [ ] **Llenar los campos `[POR LLENAR]` en `data/stops.json`**
  - `por_que_paramos` en cada parada (texto del facilitador, ~60–80 palabras)
  - `testimonio_archivo` en cada parada (guión a partir de archivos históricos)

### Mejoras opcionales

- [ ] **Primera página: foto del Antiguo Cine Monterrey**
  - Añadir imagen de portada en la sección `#portada` para darle más presencia visual
  - Sugerido: foto histórica del Cine Monterrey en sus años activos (1947–1960s)
  - En `index.html`, dentro de `<section id="portada">`, agregar `<figure class="hero-image">` después del bloque `.hero-meta`

- [ ] **Afinar waypoints de la ruta en el mapa**
  - Los waypoints actuales son aproximaciones de coordenadas de calle
  - Revisar en OpenStreetMap las coordenadas exactas de: Modesto Arreola en Marroquín Leal, Modesto Arreola en Zaragoza, y el tramo Zaragoza hacia la Macroplaza
  - Editar el objeto `ROUTE_WAYPOINTS` en `script.js` línea ~314

- [ ] **Verificar la impresión en distintos navegadores**
  - Chrome (recomendado): el canvas de Leaflet imprime correctamente
  - Firefox: puede haber diferencias en el mapa canvas
  - Safari iOS: probar desde el dispositivo con "Imprimir" del sistema

- [ ] **Dominio personalizado** (opcional)
  - Si se quiere `derivasfotograficas.org` u otro dominio, agregar archivo `CNAME` en la raíz con el dominio y configurar DNS según la [documentación de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

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
    │   ├── macroplaza/
    │   └── marco/
    ├── icons/
    └── qr-whatsapp.png ← QR del grupo (pendiente)
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
