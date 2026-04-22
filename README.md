# Ingeniotech — Soluciones Tecnológicas

Sitio web moderno para **Ingeniotech**, negocio especializado en servicio técnico, venta de equipos e instalación de cámaras de seguridad en Moniquirá, Boyacá.

## 🎯 Objetivo

Crear una presencia digital profesional que:
- Promocione los servicios del negocio
- Permita a los clientes contactar fácilmente vía WhatsApp
- Sirva como referencia de un proyecto React + TypeScript de calidad

## 🛠 Stack técnico

**Frontend:**
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **React Router v6** — Client-side routing
- **Lucide React** — Icon library
- **Vite** — Build tool

**Backend (Fase 2):**
- **Laravel 11** — Framework PHP
- **PostgreSQL** — Base de datos
- **Railway** — Hosting

## 📋 Características

### Sitio público
- ✅ Página de inicio con hero section y CTA
- ✅ Página de servicios con detalles completos
- ✅ Página de contacto con información y botón WhatsApp flotante
- ✅ Diseño responsive (mobile-first)
- ✅ Logo como marca de agua decorativa
- ✅ Navegación fluida con React Router

### Diseño
- 🎨 Tema oscuro moderno con acentos naranja (#F26522)
- 🎨 Paleta de colores basada en logo de Ingeniotech
- 🎨 Tipografía Inter de Google Fonts
- 🎨 Animaciones sutiles y transiciones fluidas

## 🚀 Instalación y desarrollo

### Prerequisites
- Node.js 18+
- npm o yarn

### Setup

```bash
git clone https://github.com/tu-usuario/ingeniotech-web.git
cd ingeniotech-web
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 📁 Estructura de carpetas

```
src/
├── config.ts                    # Configuración del negocio
├── App.tsx                      # Router principal
├── index.css                    # Estilos globales
├── main.tsx                     # Punto de entrada
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── WhatsAppButton.tsx
└── pages/
    ├── Home.tsx
    ├── Services.tsx
    └── Contact.tsx
```

## 🎨 Configuración

Edita `src/config.ts`:

```typescript
export const BUSINESS = {
  name: 'Ingeniotech',
  phone: '+57 321 217 8254',
  whatsapp: '573212178254',
  address: 'Moniquirá, Boyacá, Colombia',
  hours: { /* ... */ }
}
```

## 🚀 Deployment

### Vercel
1. Conecta tu repositorio GitHub a Vercel
2. Vercel detecta automáticamente que es Vite
3. Deploy automático en cada push a `main`

```bash
npm run build
vercel --prod
```

## 📝 Scripts

```bash
npm run dev     # Desarrollo
npm run build   # Producción
npm run preview # Previsualizar build
```

## 🎯 Roadmap

**Fase 1** ✅
- [x] Frontend React + TypeScript + Tailwind
- [x] Sitio público (3 páginas)
- [x] WhatsApp flotante

**Fase 2** 🚧
- [ ] Backend Laravel
- [ ] Panel de gestión de trabajos
- [ ] Autenticación

**Fase 3** 📋
- [ ] Formulario de cotización
- [ ] Notificaciones por email
- [ ] Blog técnico

## 📄 Licencia

Privado — Ingeniotech

## 👤 Autor

Jose Sierra — Developer & Entrepreneur
- GitHub: joseO
- Email: jost9804@gmail.com

---

**Ingeniotech — Soluciones tecnológicas que funcionan** 🚀
