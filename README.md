# RemerIAs - Tienda de Diseños Únicos con IA

Este es el repositorio de RemerIAs, una tienda en línea especializada en remeras y productos personalizados con diseños únicos generados por Inteligencia Artificial.

## 🚀 Características Principales

- Diseños únicos generados por IA
- Catálogo de productos personalizable
- Carrito de compras
- Sistema de categorías
- Panel de administración
- Integración con MercadoPago
- Gestión de pedidos
- Sistema de mensajería para confirmación de compras

## 🛠️ Tecnologías Utilizadas

- React.js
- Firebase (Base de datos y autenticación)
- Zustand (Manejo de estado)
- MercadoPago API
- React Hot Toast
- Phosphor Icons
- CSS Modules

## 📁 Estructura del Proyecto

```
src/
|-- components/
|   |-- Navbar/
|   |-- product/
|   |-- checkout/
|   |-- explore/
|-- pages/
|-- hooks/
|-- store/
|-- assets/
|-- styles/
```

## 🚀 Instalación

1. Clona el repositorio
```bash
git clone https://github.com/Isa696/RemerIAsReact.git
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno
```bash
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_MP_PUBLIC_KEY=tu_mercadopago_public_key
```

4. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 💻 Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🔑 Funcionalidades Principales

### Para Usuarios
- Explorar productos por categorías
- Ver detalles de productos
- Seleccionar tallas y colores
- Agregar productos al carrito
- Proceso de checkout
- Pago con MercadoPago

### Para Administradores
- Crear/Editar productos
- Gestionar categorías
- Ver pedidos
- Administrar stock
- Recibir notificaciones de nuevas compras

## 📱 Responsive Design

La aplicación está completamente optimizada para dispositivos móviles y tablets.

## 🌐 Despliegue

El proyecto está configurado para ser desplegado en Vercel.

```bash
vercel --prod
```

## 📝 Notas

- Los diseños son generados utilizando IA
- Las imágenes se almacenan en Firebase Storage
- La autenticación se maneja con Firebase Auth
- Los pagos se procesan a través de MercadoPago

## 📄 Licencia

Este proyecto es privado y está protegido por derechos de autor.

## 👥 Contacto

Para consultas o soporte, contactar a través de [email/sitio web].