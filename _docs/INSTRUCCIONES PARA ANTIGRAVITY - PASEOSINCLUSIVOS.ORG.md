¡CARLOOOOS! ¡Qué groso verte de nuevo, boludo!

Mirá, me encanta que me traigas este laburo. Antigravity suena TREMENDO - básicamente es tener un equipo de devs IA laburando en paralelo, y necesitás que les hable en su idioma para que te entiendan y ejecuten bien.

Acá va mi enfoque para esto:

## MI ROL CON ANTIGRAVITY

Soy tu **arquitecto y traductor de sistemas**. Mi laburo es:

1. **Entender qué necesitás** (el proyecto real)
2. **Diseñar la arquitectura** (qué componentes, cómo se conectan, qué tecnologías)
3. **Escribir las specs PERFECTAS** para que Claude/Gemini/ChatGPT en Antigravity las ejecuten sin drama

## LO QUE VOY A HACER

Cuando me traigas un proyecto, te voy a entregar:

### 📋 DOCUMENTO DE ESPECIFICACIONES PARA ANTIGRAVITY

```
🎯 OVERVIEW DEL PROYECTO
├── Qué hace
├── Para quién
└── Por qué lo estamos haciendo

🏗️ ARQUITECTURA
├── Estructura de carpetas
├── Componentes principales
├── Stack tecnológico
└── Dependencias

📁 ÁRBOL DE ARCHIVOS
└── Cada archivo con su propósito explicado

🔧 INSTRUCCIONES POR ARCHIVO
├── Qué debe contener
├── Qué funcionalidad tiene
├── Qué imports necesita
└── Ejemplo de estructura

🔄 FLUJOS Y CONEXIONES
└── Cómo interactúan los componentes

✅ CRITERIOS DE ÉXITO
└── Qué validar que funcione
```

### LO CLAVE: INSTRUCCIONES PRECISAS

Para que los modelos en Antigravity no se pierdan, voy a escribir specs tipo:

**❌ VAGO:** "Haceme un componente de login"

**✅ PRECISO:**

```
ARCHIVO: src/components/LoginForm.jsx
PROPÓSITO: Formulario de autenticación con email/password
DEBE INCLUIR:
- Estado para email, password, error, loading
- Validación de email con regex
- Submit que llame a POST /api/auth/login
- Manejo de errores (mostrar mensaje)
- Disable del botón mientras loading
- Link a "olvidé mi contraseña"
ESTILO: Tailwind CSS, centrado, fondo blanco, sombra
DEPENDENCIAS: React 18, axios
```

## CÓMO LABURAMOS JUNTOS

**Vos me decís:** "Carlos, necesito una app de gestión de tareas para equipos"

**Yo te doy:**

- 📄 Documento completo con especificaciones
- 🎯 Dividido en fases implementables
- 📝 Instrucciones archivo por archivo
- 🔄 Flujos explicados paso a paso
- ✅ Checklist de qué validar

**Vos le pasás eso a Antigravity y...** 💥 Los modelos tienen TODO lo que necesitan para construir el sistema

## MI VENTAJA PARA VOS

- **Pienso el sistema completo** antes de que escriban una línea
- **Anticipo problemas** que los modelos podrían meter
- **Escribo specs que los modelos entienden** perfecto
- **Te ahorro vueltas** de "no, eso no era lo que quería"

---

**Dale, contame**: ¿Qué proyecto querés que diseñemos para Antigravity?

Traeme la idea, el problema a resolver, o lo que sea, y te armo TODO el diseño + las instrucciones perfectas para que los pibes IA lo ejecuten impecable.

¡A romperla, gordo! 🚀

Te animás hacer las instrucciones para esta página de excelencia gordo? porqué es para un fin lindo, solo instrucciones gordito, no codees vos porque es doble laburo viste? Brief para Claude — Desarrollo de paseosinclusivos.org
Dominio de referencia: paseosinclusivos.org (alias posibles: paseosdiscapacitados.org → redirección)
Para qué sirve
Crear una plataforma simple, honesta y útil que centralice paseos, actividades y lugares gratuitos o accesibles para personas con discapacidad (CUD) y movilidad reducida. No es turismo aspiracional: es vida real.
En qué la usamos

* Responder consultas reales en redes (Facebook/WhatsApp).
* Brindar autonomía para salir sin depender de terceros.
* Alimentar el Módulo Turismo Accesible del Butler.
  Público
* Personas con discapacidad / CUD.
* Acompañantes y familias.
* Instituciones que quieren declarar accesibilidad sin marketing.
  Principios no negociables
* Lenguaje claro, humano, sin épica falsa.
* Decir lo que sí y lo que no.
* Accesibilidad > estética.
* Datos verificables y actualización estacional.
  Estructura del sitio (MVP)
1) Home
* Título: “¿Este lugar da o no da?”
* Subtítulo: Información real para salir sin pedir permiso.
* CTA principal: Buscar paseos
* CTA secundario: Soy un lugar / Quiero declarar accesibilidad
2) Buscador de Paseos
   Filtros:
* Costo: Gratis / Gratis con CUD
* Nivel de esfuerzo: Bajo / Medio / Alto
* Movilidad: Andador / Bastón / Silla
* Ambiente: Ruido bajo / Sombra
* Estación del año
  Resultados en fichas cortas.
3) Ficha de Lugar (estándar)
   Campos visibles:
* Nombre + ubicación
* Costo
* Accesibilidad real (plano, rampas, baños)
* Distancias aproximadas
* Nivel de esfuerzo
* Notas honestas (viento, multitudes, horarios tranquilos)
* Última actualización + estación
  Badge:
* “Accesibilidad declarada por el lugar”
* o “Información comunitaria”
4) Formulario de Auto‑Declaración
* Formulario seguro (autohosteado)
* Declaración simple y honesta
* Actualización automática por estación (4 veces al año)
5) Transparencia
* Qué es el proyecto
* Qué no promete
* Filosofía: la accesibilidad es proceso, no foto
  Stack sugerido (simple)
* Front: Next.js
* Forms: Formbricks (self‑hosted)
* DB: Postgres
* Hosting: VPS propio
* HTTPS + cifrado
  Tono y copy
* Cercano, argentino, sin infantilizar.
* Humor leve, respeto total.
* Ejemplo de copy:
  “No es perfecto, pero se puede ir.”
  Qué NO hacer
* No SEO forzado.
* No stock photos épicas.
* No promesas vagas.
* No caridad estética.
  Entregables esperados (Claude)
* Arquitectura del sitio
* Componentes UI base
* Modelo de datos
* Copys iniciales
* Roadmap de mejora
  Firmado digitalmente, NICO — Neural Inteligente & Cibernetic Operator [Fecha: 28/01/2026]

Mostrar más

12:47

# INSTRUCCIONES PARA ANTIGRAVITY - PASEOSINCLUSIVOS.ORG

---

## 🎯 CONTEXTO DEL PROYECTO

**Nombre**: Paseos Inclusivos **Dominio**: paseosinclusivos.org **Propósito**: Plataforma que centraliza paseos, actividades y lugares accesibles para personas con discapacidad (CUD) y movilidad reducida. **NO es turismo aspiracional, es vida real.**

**Filosofía**:

- Lenguaje claro, humano, sin épica falsa
- Decir lo que SÍ y lo que NO
- Accesibilidad > estética
- Datos verificables y honestos
- **"¿Este lugar da o no da?"**

---

## 🏗️ ARQUITECTURA GENERAL

```
paseosinclusivos.org/
├── Frontend (Next.js 14 con App Router)
├── Backend API (Next.js API Routes)
├── Base de Datos (PostgreSQL)
├── Formularios (Formbricks self-hosted)
└── Deploy (VPS propio con HTTPS)
```

### Componentes Principales:

1. **Home** - Landing con búsqueda rápida
2. **Buscador** - Filtros múltiples y resultados
3. **Ficha de Lugar** - Detalle completo de cada sitio
4. **Formulario Auto-Declaración** - Para que lugares se registren
5. **Página de Transparencia** - Qué es y qué no es el proyecto

---

## 📁 ESTRUCTURA DE CARPETAS

```
/
├── app/
│   ├── page.jsx                    # Home
│   ├── buscar/
│   │   └── page.jsx                # Buscador de paseos
│   ├── lugar/
│   │   └── [slug]/
│   │       └── page.jsx            # Ficha individual
│   ├── declarar/
│   │   └── page.jsx                # Formulario auto-declaración
│   ├── transparencia/
│   │   └── page.jsx                # Qué es el proyecto
│   ├── api/
│   │   ├── lugares/
│   │   │   └── route.js            # GET lugares + filtros
│   │   ├── lugar/
│   │   │   └── [id]/
│   │   │       └── route.js        # GET lugar específico
│   │   └── declaracion/
│   │       └── route.js            # POST nueva declaración
│   ├── layout.jsx                  # Layout principal
│   └── globals.css                 # Estilos globales
├── components/
│   ├── Buscador/
│   │   ├── Filtros.jsx             # Panel de filtros
│   │   └── TarjetaLugar.jsx        # Card de resultado
│   ├── Ficha/
│   │   ├── InfoGeneral.jsx         # Datos básicos
│   │   ├── AccesibilidadReal.jsx   # Niveles de accesibilidad
│   │   ├── NotasHonestas.jsx       # Comentarios realistas
│   │   └── Badge.jsx               # "Declarado" vs "Comunitario"
│   ├── Formulario/
│   │   ├── FormDeclaracion.jsx     # Form completo
│   │   └── CamposAccesibilidad.jsx # Inputs específicos
│   ├── Layout/
│   │   ├── Header.jsx              # Header simple
│   │   └── Footer.jsx              # Footer con links
│   └── UI/
│       ├── Button.jsx              # Botón accesible
│       ├── Input.jsx               # Input con labels claros
│       └── Select.jsx              # Dropdown accesible
├── lib/
│   ├── db.js                       # Conexión a PostgreSQL
│   └── utils.js                    # Helpers generales
├── public/
│   └── icons/                      # Iconos de accesibilidad
├── prisma/
│   └── schema.prisma               # Schema de DB
├── .env.local                      # Variables de entorno
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗄️ MODELO DE DATOS (PostgreSQL con Prisma)

### Tabla: `lugares`

prisma

```prisma
model Lugar {
  id                Int       @id @default(autoincrement())
  nombre            String
  slug              String    @unique
  ubicacion         String
  lat               Float?
  lng               Float?

  // Costos
  costo             String    // "Gratis", "Gratis con CUD", "Pago"

  // Accesibilidad
  nivel_esfuerzo    String    // "Bajo", "Medio", "Alto"
  movilidad         String[]  // ["Andador", "Bastón", "Silla"]
  tiene_rampa       Boolean
  tiene_banio       Boolean
  es_plano          Boolean
  distancia_aprox   String?   // "200m desde estacionamiento"

  // Ambiente
  ruido             String    // "Bajo", "Medio", "Alto"
  tiene_sombra      Boolean

  // Estacionalidad
  mejor_estacion    String[]  // ["Verano", "Otoño", "Invierno", "Primavera"]

  // Notas honestas
  notas_honestas    String?   // Texto libre

  // Metadata
  fuente            String    // "Declarado", "Comunitario"
  ultima_actualizacion DateTime @default(now())
  estacion_actual   String    // "Verano 2026"

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

### Tabla: `declaraciones` (formularios recibidos)

prisma

```prisma
model Declaracion {
  id                Int       @id @default(autoincrement())
  nombre_lugar      String
  email_contacto    String
  telefono          String?
  ubicacion         String

  // Datos de accesibilidad
  costo             String
  nivel_esfuerzo    String
  movilidad         String[]
  tiene_rampa       Boolean
  tiene_banio       Boolean
  es_plano          Boolean
  distancia_aprox   String?
  ruido             String
  tiene_sombra      Boolean
  mejor_estacion    String[]
  notas_adicionales String?

  // Estado
  estado            String    @default("pendiente") // "pendiente", "aprobado", "rechazado"

  createdAt         DateTime  @default(now())
}
```

---

## 🎨 COMPONENTES UI - ESPECIFICACIONES

### 1. HOME (`app/page.jsx`)

**Propósito**: Landing simple y directo con búsqueda rápida.

**Contenido**:
- Hero section con:
  - **Título**: "¿Este lugar da o no da?"
  - **Subtítulo**: "Información real para salir sin pedir permiso"
  - **CTA Principal**: Botón grande "Buscar paseos" → `/buscar`
  - **CTA Secundario**: Link "Soy un lugar / Quiero declarar accesibilidad" → `/declarar`
- Sección breve: "Qué es esto" (3 líneas, link a `/transparencia`)

**Estilo**:
- Fondo blanco o gris muy claro
- Tipografía grande, legible (mínimo 18px body, 48px título)
- Alto contraste (WCAG AAA)
- Sin fotos épicas, máximo un ícono simple

**Accesibilidad**:
- Skip to content link
- HTML semántico (`<main>`, `<section>`)
- Botones con `aria-label` descriptivos

---

### 2. BUSCADOR (`app/buscar/page.jsx`)

**Propósito**: Filtrar lugares según necesidades reales.

**Layout**:
```
+----------------------------------+
| [Filtros laterales]  | [Resultados]
| - Costo              | [Card 1]
| - Esfuerzo           | [Card 2]
| - Movilidad          | [Card 3]
| - Ambiente           | ...
| - Estación           |
+----------------------------------+
```

**Componente: Filtros** (`components/Buscador/Filtros.jsx`)

**Filtros disponibles**:
1. **Costo** (radio buttons):
   - Gratis
   - Gratis con CUD
   - Pago

2. **Nivel de esfuerzo** (checkboxes):
   - Bajo
   - Medio
   - Alto

3. **Movilidad** (checkboxes):
   - Andador
   - Bastón
   - Silla de ruedas

4. **Ambiente** (checkboxes):
   - Ruido bajo
   - Tiene sombra

5. **Estación del año** (checkboxes):
   - Verano
   - Otoño
   - Invierno
   - Primavera

**Comportamiento**:
- Al cambiar filtros → llamar a API `/api/lugares?costo=gratis&esfuerzo=bajo`
- Mostrar cantidad de resultados: "X lugares encontrados"
- Botón "Limpiar filtros"

**Accesibilidad**:
- Labels asociados a inputs
- Fieldsets con legends
- Foco visible en todos los controles

---

**Componente: TarjetaLugar** (`components/Buscador/TarjetaLugar.jsx`)

**Contenido de cada card**:
```
+--------------------------------+
| [Badge: Declarado/Comunitario] |
| Nombre del Lugar               |
| Ubicación                      |
| Costo: Gratis con CUD          |
| Esfuerzo: Bajo                 |
| Movilidad: Silla ✓ Andador ✓   |
| [Botón: Ver detalles]          |
+--------------------------------+
```

**Datos a mostrar**:
- `nombre`
- `ubicacion`
- `costo`
- `nivel_esfuerzo`
- `movilidad` (iconos o texto)
- Badge según `fuente`

**Interacción**:
- Click en card → Ir a `/lugar/[slug]`

---

### 3. FICHA DE LUGAR (`app/lugar/[slug]/page.jsx`)

**Propósito**: Mostrar TODA la info honesta de un lugar.

**Estructura**:
```
+--------------------------------------------------+
| [Badge: Accesibilidad declarada por el lugar]    |
| o [Badge: Información comunitaria]               |
|                                                  |
| NOMBRE DEL LUGAR                                 |
| Ubicación: Parque Centenario, CABA               |
|                                                  |
| --- COSTO ---                                    |
| Gratis con CUD                                   |
|                                                  |
| --- ACCESIBILIDAD REAL ---                       |
| ✓ Plano (sin escalones)                          |
| ✓ Tiene rampas                                   |
| ✓ Baños accesibles                               |
| Distancia: 150m desde estacionamiento            |
|                                                  |
| --- NIVEL DE ESFUERZO ---                        |
| Bajo - Ideal para paseo tranquilo                |
|                                                  |
| --- MOVILIDAD COMPATIBLE ---                     |
| ✓ Silla de ruedas                                |
| ✓ Andador                                        |
| ✓ Bastón                                         |
|                                                  |
| --- AMBIENTE ---                                 |
| Ruido: Bajo                                      |
| Sombra: Sí (muchos árboles)                      |
|                                                  |
| --- MEJOR ÉPOCA ---                              |
| Primavera, Otoño                                 |
| (evitar verano por calor extremo)                |
|                                                  |
| --- NOTAS HONESTAS ---                           |
| Los fines de semana hay más gente. Mejor ir      |
| entre semana o temprano en la mañana. El baño    |
| está cerca del lago, no en todas las entradas.   |
|                                                  |
| Última actualización: Verano 2026                |
+--------------------------------------------------+
```

**Componentes**:
- `InfoGeneral.jsx` - Nombre, ubicación, costo
- `AccesibilidadReal.jsx` - Rampa, baño, distancias
- `NotasHonestas.jsx` - Texto libre realista
- `Badge.jsx` - Visual de "Declarado" vs "Comunitario"

**Accesibilidad**:
- Títulos con `<h2>`, `<h3>`
- Listas con `<ul>`, `<li>`
- Contraste alto en textos

---

### 4. FORMULARIO AUTO-DECLARACIÓN (`app/declarar/page.jsx`)

**Propósito**: Que lugares se registren ellos mismos con info honesta.

**Intro**:
```
¿Sos un lugar y querés aparecer en el listado?

Completá este formulario con honestidad. No prometemos 
perfección, prometemos transparencia.

La info se actualiza cada 3 meses (cada estación).
```

**Campos del formulario**:

1. **Datos del lugar**:
   - Nombre del lugar (text)
   - Ubicación completa (text)
   - Email de contacto (email)
   - Teléfono (opcional, tel)
2. **Costo**:
   - Radio: Gratis / Gratis con CUD / Pago
3. **Accesibilidad**:
   - Checkbox: ¿Tiene rampas?
   - Checkbox: ¿Tiene baños accesibles?
   - Checkbox: ¿Es plano? (sin escalones)
   - Text: Distancia desde estacionamiento (ej: "50m")
4. **Nivel de esfuerzo**:
   - Radio: Bajo / Medio / Alto
5. **Movilidad compatible**:
   - Checkboxes: Silla de ruedas / Andador / Bastón
6. **Ambiente**:
   - Radio: Ruido bajo / Ruido medio / Ruido alto
   - Checkbox: ¿Tiene sombra?
7. **Mejor estación**:
   - Checkboxes: Verano / Otoño / Invierno / Primavera
8. **Notas adicionales** (opcional):
   - Textarea: "Contanos algo que deberíamos saber"

**Botón**: "Enviar declaración"

**Comportamiento**:

- POST a `/api/declaracion`
- Guardar en tabla `declaraciones` con `estado: "pendiente"`
- Mostrar mensaje: "Gracias. Revisaremos tu info y la publicaremos pronto."

**Accesibilidad**:

- Labels claros y descriptivos
- Required fields con `aria-required`
- Validación con mensajes claros
- Foco en primer error si hay

---

### 5. PÁGINA TRANSPARENCIA (`app/transparencia/page.jsx`)

**Propósito**: Explicar qué es y qué NO es el proyecto.

**Contenido**:

markdown

```markdown
# ¿Qué es Paseos Inclusivos?

Una plataforma simple que centraliza lugares accesibles 
para personas con discapacidad y movilidad reducida.

## ¿Para qué sirve?
- Responder: "¿Este lugar da o no da?"
- Brindar autonomía para salir sin depender de terceros
- Información real, no marketing

## ¿Qué NO es?
- No es turismo aspiracional
- No es caridad estética
- No prometemos perfección, prometemos transparencia

## Filosofía
- Lenguaje claro, humano
- Decir lo que SÍ y lo que NO
- Accesibilidad > estética
- La accesibilidad es proceso, no foto

## ¿Cómo se mantiene actualizado?
Los lugares declaran su info y se actualiza cada 
estación del año (4 veces al año).

## ¿Quién está detrás?
Proyecto comunitario, sin fines de lucro.
```

**Estilo**: Tipografía grande, legible, sin diseños complejos.

---

## 🔌 API ENDPOINTS

### `GET /api/lugares` (Buscar lugares con filtros)

**Query params**:

- `costo` (string): "Gratis", "Gratis con CUD", "Pago"
- `esfuerzo` (string): "Bajo", "Medio", "Alto"
- `movilidad` (array): ["Silla", "Andador", "Bastón"]
- `ruido` (string): "Bajo", "Medio", "Alto"
- `sombra` (boolean): true/false
- `estacion` (array): ["Verano", "Otoño", etc]

**Respuesta**:

json

```json
{
  "total": 15,
  "lugares": [
    {
      "id": 1,
      "nombre": "Parque Centenario",
      "slug": "parque-centenario",
      "ubicacion": "CABA",
      "costo": "Gratis",
      "nivel_esfuerzo": "Bajo",
      "movilidad": ["Silla", "Andador", "Bastón"],
      "fuente": "Declarado"
    }
  ]
}
```

**Lógica**:

- Construir query SQL con WHERE dinámico según filtros
- Retornar solo lugares con `fuente != "rechazado"`

---

### `GET /api/lugar/[id]` (Detalle de un lugar)

**Respuesta**:

json

```json
{
  "id": 1,
  "nombre": "Parque Centenario",
  "slug": "parque-centenario",
  "ubicacion": "Av. Díaz Vélez y Av. Patricias Argentinas, CABA",
  "lat": -34.6067,
  "lng": -58.4367,
  "costo": "Gratis",
  "nivel_esfuerzo": "Bajo",
  "movilidad": ["Silla", "Andador", "Bastón"],
  "tiene_rampa": true,
  "tiene_banio": true,
  "es_plano": true,
  "distancia_aprox": "150m desde estacionamiento",
  "ruido": "Bajo",
  "tiene_sombra": true,
  "mejor_estacion": ["Primavera", "Otoño"],
  "notas_honestas": "Los fines de semana hay más gente...",
  "fuente": "Declarado",
  "ultima_actualizacion": "2026-01-15",
  "estacion_actual": "Verano 2026"
}
```

---

### `POST /api/declaracion` (Recibir auto-declaración)

**Body**:

json

```json
{
  "nombre_lugar": "Reserva Ecológica",
  "email_contacto": "info@reserva.com",
  "telefono": "1234567890",
  "ubicacion": "Costanera Sur, CABA",
  "costo": "Gratis",
  "nivel_esfuerzo": "Medio",
  "movilidad": ["Bastón"],
  "tiene_rampa": false,
  "tiene_banio": true,
  "es_plano": false,
  "distancia_aprox": "500m",
  "ruido": "Bajo",
  "tiene_sombra": true,
  "mejor_estacion": ["Primavera"],
  "notas_adicionales": "Terreno irregular en algunas zonas"
}
```

**Lógica**:

- Validar datos (email válido, campos requeridos)
- Insertar en tabla `declaraciones` con `estado: "pendiente"`
- Enviar email de confirmación (opcional)
- Retornar: `{ success: true, message: "Declaración recibida" }`

---

## 🎨 DISEÑO Y ESTILOS (Tailwind CSS)

### Principios visuales:

- **Fondo**: Blanco o gris claro (`bg-gray-50`)
- **Texto**: Negro o gris oscuro (`text-gray-900`)
- **Alto contraste**: WCAG AAA
- **Tipografía**: Sans-serif, mínimo 18px body
- **Botones**: Grandes, con padding generoso
- **Sin fotos stock épicas**: Máximo iconos simples

### Paleta sugerida:

js

```js
// tailwind.config.js
colors: {
  primary: '#2563eb', // Azul accesible
  secondary: '#64748b', // Gris
  success: '#10b981', // Verde
  warning: '#f59e0b', // Naranja
  danger: '#ef4444', // Rojo
}
```

### Componentes base:

**Button.jsx**:

jsx

```jsx
// Botón grande, accesible, con estados hover/focus
<button className="px-6 py-3 text-lg font-medium bg-primary text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
  Texto del botón
</button>
```

**Input.jsx**:

jsx

```jsx
<div>
  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-2">
    Nombre del lugar
  </label>
  <input
    type="text"
    id="nombre"
    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary"
  />
</div>
```

---

## 📝 COPYS INICIALES

### Home:

- **Título**: "¿Este lugar da o no da?"
- **Subtítulo**: "Información real para salir sin pedir permiso"
- **CTA**: "Buscar paseos"
- **Secundario**: "Soy un lugar / Quiero declarar accesibilidad"

### Buscador:

- **Placeholder search**: "Nombre del lugar..."
- **Filtros título**: "Filtrar por:"
- **Sin resultados**: "No encontramos lugares con esos filtros. Probá cambiando alguno."

### Ficha:

- **Badge declarado**: "Accesibilidad declarada por el lugar"
- **Badge comunitario**: "Información comunitaria"
- **Sección esfuerzo**: "Nivel de esfuerzo"
- **Sección notas**: "Notas honestas"

### Formulario:

- **Título**: "Declarar accesibilidad de mi lugar"
- **Intro**: "Completá este formulario con honestidad. No prometemos perfección, prometemos transparencia."
- **Submit**: "Enviar declaración"
- **Éxito**: "Gracias. Revisaremos tu info y la publicaremos pronto."

### Transparencia:

- **Título**: "¿Qué es Paseos Inclusivos?"
- **Subtítulo**: "Una plataforma simple que centraliza lugares accesibles."

---

## 🚀 ROADMAP DE IMPLEMENTACIÓN

### FASE 1 (MVP - 2 semanas):

1. Setup proyecto Next.js + Tailwind
2. Configurar PostgreSQL + Prisma
3. Crear estructura de carpetas
4. Implementar Home básico
5. Implementar Buscador con filtros
6. Implementar Ficha de lugar
7. Implementar Formulario de declaración
8. Crear API endpoints
9. Deploy en VPS con HTTPS

### FASE 2 (Mejoras - 1 semana):

1. Integrar Formbricks self-hosted
2. Sistema de actualización estacional automático
3. Panel admin básico para aprobar declaraciones
4. Email de confirmación al declarar
5. Mejoras de accesibilidad (testing con usuarios)

### FASE 3 (Futuro):

1. Mapa interactivo de lugares
2. Sistema de reseñas comunitarias
3. App móvil (React Native)
4. Integración con Butler (Módulo Turismo Accesible)

---

## ✅ CRITERIOS DE ÉXITO

### Técnicos:

- [ ] Sitio funciona en móviles y desktop
- [ ] Cumple WCAG AAA en contraste
- [ ] Tiempo de carga < 3 segundos
- [ ] HTTPS configurado
- [ ] Base de datos con backup automático

### Funcionales:

- [ ] Buscador retorna resultados correctos
- [ ] Filtros funcionan en combinación
- [ ] Formulario guarda datos en DB
- [ ] Ficha muestra toda la info necesaria

### Usabilidad:

- [ ] Usuario encuentra info en < 2 clicks
- [ ] Formularios tienen validación clara
- [ ] Copy es honesto y directo
- [ ] Sin lenguaje épico o falso

---

## ⚠️ LO QUE NO HACER

1. **NO usar fotos stock épicas** de personas sonriendo en parques
2. **NO promesas vagas** tipo "el mejor lugar para..."
3. **NO infantilizar** el lenguaje
4. **NO SEO forzado** con keywords repetidas
5. **NO caridad estética** con diseños condescendientes

---

## 🔐 SEGURIDAD

- **HTTPS obligatorio** (Let's Encrypt)
- **Validación server-side** en todos los forms
- **Rate limiting** en API (max 100 requests/hora)
- **Sanitización** de inputs (prevenir XSS)
- **CORS** configurado correctamente
- **Headers de seguridad**:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security`

---

## 📦 DEPENDENCIAS PRINCIPALES

json

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@prisma/client": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "axios": "^1.6.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## 🎯 ENTREGA FINAL PARA ANTIGRAVITY

Este documento contiene:

- ✅ Arquitectura completa
- ✅ Estructura de carpetas detallada
- ✅ Modelo de datos con Prisma
- ✅ Especificaciones de cada componente
- ✅ Endpoints de API con ejemplos
- ✅ Guías de diseño y accesibilidad
- ✅ Copys iniciales
- ✅ Roadmap de implementación
- ✅ Criterios de éxito

**INSTRUCCIÓN PARA LOS MODELOS EN ANTIGRAVITY**:

> "Implementar el sitio paseosinclusivos.org siguiendo EXACTAMENTE estas especificaciones. Cada archivo debe contener lo descrito en su sección correspondiente. Respetar la filosofía de lenguaje claro, honesto y accesible. NO agregar features no solicitadas. NO usar fotos stock. Priorizar accesibilidad sobre estética."

---

**Firmado digitalmente**: CLAUDE, Arquitecto de Sistemas  
**Fecha**: 28 de enero de 2026  
**Para**: NICO (Neural Inteligente & Cibernetic Operator)  
**Proyecto**: Paseos Inclusivos - MVP

---

Nico, ahí tenés TODO lo que necesitan los pibes en Antigravity para levantar este proyecto. Está pensado para que cualquiera de los tres modelos (Claude, Gemini o ChatGPT) pueda agarrar esto y ejecutarlo sin drama.

¿Querés que ajuste algo? ¿Le agrego más detalle a alguna parte?
