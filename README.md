# 🛍️ Panel de Gestión de Productos - React

Una aplicación web moderna para la gestión de productos construida con Next.js, TypeScript y Tailwind CSS. Permite crear, listar, buscar, editar y eliminar productos con una interfaz intuitiva y notificaciones en tiempo real.
![alt text](<docs/Screenshot 2025-10-24 at 11.17.58 PM.png>)
## 🚀 Características

### ✨ Funcionalidades Principales
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Búsqueda en Tiempo Real**: Filtrar productos por nombre
- **Paginación**: Navegación eficiente entre páginas de resultados
- **Edición Inline**: Modificar productos directamente en la tabla
- **Notificaciones**: Feedback visual para todas las operaciones
- **Validación de Formularios**: Validación robusta en el cliente
- **Estados de Carga**: Indicadores de loading y manejo de errores

### 🎨 Interfaz de Usuario
- **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla
- **Tema Claro**: Interfaz limpia con tarjetas oscuras para contraste
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Accesibilidad**: Navegación por teclado y semántica HTML

### 🔧 Tecnologías
- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Estilos utilitarios y diseño responsive
- **React Query**: Gestión de estado del servidor y cache
- **Formik + Yup**: Manejo de formularios y validación
- **Axios**: Cliente HTTP para comunicación con la API

## 📋 Requisitos del Sistema

- Node.js 22+ 
- npm o yarn
- Docker (opcional)

## 🛠️ Instalación y Configuración

### Método 1: Instalación Local

 **Instalar dependencias**
```bash
npm install
# o
yarn install
```

 **Configurar variables de entorno**
```bash
# Crear archivo .env.local -> URL backend previamente corriendo
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" > .env.local
```

 **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

 **Abrir en el navegador**
```
http://localhost:3000
```

### Método 2: Docker

 **Construir la imagen**
```bash
docker build -t domus-products-panel .
```

 **Ejecutar el contenedor**
```bash
docker run -p 3000:3000 domus-products-panel
```

 **Abrir en el navegador**
```
http://localhost:3000
```

**Nota**: Asegúrate de que tu API backend esté ejecutándose en `http://localhost:8080` o actualiza la variable de entorno `NEXT_PUBLIC_API_BASE_URL` en el comando docker run.

## 🏗️ Estructura del Proyecto

```
domus-challenge-frontend/
├── app/                          # App Router de Next.js
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal
├── components/                   # Componentes reutilizables
│   ├── Notification.tsx         # Sistema de notificaciones
│   ├── ProductForm.tsx          # Formulario de creación
│   └── ProductList.tsx          # Lista y tabla de productos
├── contexts/                     # Contextos de React
│   └── NotificationContext.tsx  # Contexto global de notificaciones
├── hooks/                        # Hooks personalizados
│   └── useProducts.ts           # Hook para gestión de productos
├── lib/                          # Utilidades y configuración
│   └── api.ts                   # Cliente API y tipos TypeScript
├── public/                       # Archivos estáticos
├── Dockerfile                    # Configuración de Docker
├── .dockerignore                # Archivos ignorados en Docker
├── env.example                  # Ejemplo de variables de entorno
├── next.config.ts               # Configuración de Next.js
├── tailwind.config.js           # Configuración de Tailwind
└── package.json                 # Dependencias y scripts
```

## 🔌 Integración con la API

La aplicación está diseñada para consumir la API RESTful previamente en  JAVA

### Endpoints Utilizados
- `GET /api/products` - Listar productos con paginación y filtros
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/{id}` - Actualizar producto existente
- `DELETE /api/products/{id}` - Eliminar producto

### Parámetros de Consulta
- `name` (opcional): Filtrar por nombre del producto
- `page` (opcional): Número de página (por defecto 0)
- `size` (opcional): Tamaño de página (por defecto 10)

### Estructura de Datos
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

interface PagedResponseProduct {
  data: Product[];
  metadata: {
    page: number;
    size: number;
    total: number;
  };
}
```

## 🎯 Funcionalidades Detalladas

### 📝 Crear Producto
- Formulario con validación en tiempo real
- Campos: nombre (requerido) y precio (requerido, positivo)
- Notificación de éxito/error
- Limpieza automática del formulario

### 🔍 Buscar Productos
- Campo de búsqueda en tiempo real
- Filtrado por nombre del producto
- Reseteo automático a la primera página
- Indicador de resultados encontrados

### ✏️ Editar Producto
- Edición inline en la tabla
- Campos editables: nombre y precio
- Botones de guardar/cancelar
- Validación de datos antes de guardar

### 🗑️ Eliminar Producto
- Confirmación antes de eliminar
- Botón de eliminación con estado de carga
- Notificación de éxito/error

### 📄 Paginación
- Navegación entre páginas
- Información de página actual y total
- Botones deshabilitados en extremos
- 10 productos por página (configurable)

## 🎨 Sistema de Notificaciones

### Tipos de Notificación
- **Éxito** (verde): Operaciones completadas correctamente
- **Error** (rojo): Errores en operaciones
- **Info** (azul): Información general

### Características
- Posición fija en esquina superior derecha
- Animaciones de entrada y salida
- Auto-cierre después de 3 segundos
- Botón de cierre manual
- Contexto global compartido

## 🧪 Testing

Tests unitarios con Jest y React Testing Library.

### Scripts
```bash
npm test              # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

### Cobertura
- **30 tests** ejecutándose exitosamente
- **6 suites de test** pasando
- **Cobertura**: 60.5% de statements

### Tests Incluidos
- ✅ **Componentes**: Notification, ProductForm, ProductList
- ✅ **Contextos**: NotificationContext
- ✅ **Hooks**: useProducts
- ✅ **Tipos**: Interfaces de API

## 🚀 Scripts de Desarrollo

```bash
npm run dev          # Servidor de desarrollo en puerto 3000

npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Verificar código con ESLint
```

## 🔧 Configuración

### Variables de Entorno
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080  # URL base de la API
```

### Tailwind CSS
- Configuración personalizada con variables CSS
- Tema claro con tarjetas oscuras
- Animaciones personalizadas para notificaciones
- Diseño responsive y accesible

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Tabla completa con todas las columnas
- **Tablet**: Tabla con scroll horizontal
- **Mobile**: Interfaz adaptada con botones táctiles

## 🔒 Validaciones

### Formulario de Creación
- **Nombre**: Requerido, no puede estar vacío
- **Precio**: Requerido, debe ser un número positivo

### Edición Inline
- **Nombre**: No puede estar vacío
- **Precio**: Debe ser un número válido y positivo

### Separación de Componentes
- Componentes funcionales con responsabilidades claras
- Hooks personalizados para lógica de negocio
- Contextos para estado global
- Separación clara entre UI y lógica

### UX de Errores y Cargas
- Estados de loading en todas las operaciones
- Manejo robusto de errores con notificaciones
- Formularios con validación en tiempo real
- Feedback visual inmediato

### Organización del Proyecto
- Estructura clara y escalable
- Separación por funcionalidad
- Configuración centralizada
- Documentación completa

### Performance
- React Query para cache y optimización
- Memoización selectiva en componentes
- Lazy loading de componentes
- Optimización de re-renders

---

**¡Gracias por revisar este proyecto!** 🚀