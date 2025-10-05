# 🏦 Skandia Financial Planning Platform

> **Plataforma digital de planificación financiera desarrollada con Angular 20.3.4**

[![Angular](https://img.shields.io/badge/Angular-20.3.4-red?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-30%20passing-success)](https://jasmine.github.io/)

---

## ✨ **Características**

- ✅ **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- ✅ **Integración con API**: Consumo de datos en tiempo real desde una API REST
- ✅ **Testing Completo**: 30 tests unitarios con cobertura crítica
- ✅ **Arquitectura Modular**: Componentes standalone reutilizables

---

## 🛠️ **Tecnologías**

### **Core**

- **Angular** `20.3.4` - Framework principal
- **TypeScript** `5.9.2` - Lenguaje de programación
- **RxJS** `7.8.0` - Programación reactiva
- **Zone.js** `0.15.0` - Detección de cambios

### **Desarrollo**

- **Angular CLI** `20.3.4` - Herramienta de línea de comandos
- **Karma** `6.4.0` - Test runner
- **Jasmine** `5.4.0` - Framework de testing
- **TypeScript ESLint** `8.18.0` - Linting

### **Diseño**

- **CSS3** con metodología BEM
- **Responsive Design** con Media Queries
- **Custom Properties** (Variables CSS)

---

## 📦 **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado:

| Herramienta     | Versión Mínima |
| --------------- | -------------- |
| **Node.js**     | `22.16.0`      |
| **npm**         | `11.4.2`       |
| **Angular CLI** | `20.3.4`       |

### **Instalación de Angular CLI (si no lo tienes):**

```bash
npm install -g @angular/cli
```

---

## 📁 **Estructura del Proyecto**

```
skandia-app/
│
├── src/
│   ├── app/
│   │   ├── core/                               # Servicios y modelos core
│   │   │   ├── models/
│   │   │   │   └── card.interface.ts           # Interfaces de datos
│   │   │   └── services/
│   │   │       └── products-api.service.ts     # Servicio HTTP
│   │   │
│   │   ├── features/                           # Módulos de funcionalidades
│   │   │   │
│   │   │   │___├── components/
│   │   │       │   ├── goal-card/              # Banner principal
│   │   │       │   ├── hero-banner/            # Tarjeta de objetivo
│   │   │       │   ├── products-slider/        # Slider de productos
│   │   │       │   └── recommended-products/   # Recomendaciones
│   │   │       │
│   │   │       └── home/                       # Módulo Home
│   │   │           ├── home.component.ts       # Componente principal
│   │   │           ├── home.component.html
│   │   │           └── home.component.css
│   │   │
│   │   ├── shared/                             # Componentes compartidos
│   │   │   └── components/
│   │   │       ├── footer/                     # Footer institucional
│   │   │       ├── header/                     # Header con navegación
│   │   │       └── sidebar/                    # Sidebar colapsable
│   │   │
│   │   ├── app.component.ts                    # Componente raíz
│   │   ├── app.config.ts                       # Configuración de la app
│   │   └── app.routes.ts                       # Rutas de la aplicación
│   │
│   ├── assets/                                 # Recursos estáticos
│   │   ├── aside/                              # Iconos del sidebar
│   │   ├── footer/                             # Logos y redes sociales
│   │   ├── main/                               # Iconos principales
│   │   └── nav/                                # Iconos de navegación
│   │
│   ├── styles.css                              # Estilos globales
│   ├── index.html                              # HTML principal
│   └── main.ts                                 # Bootstrap de la app
│
├── .editorconfig                               # Configuración del editor
├── angular.json                                # Configuración de Angular
├── karma.conf.js                               # Configuración de Karma
├── package.json                                # Dependencias del proyecto
├── tsconfig.json                               # Configuración de TypeScript
└── README.md                                   # Este archivo
```

---

## 🚀 **Instalación**

### **1. Clonar el repositorio**

```bash
git clone https://github.com/JuanRinconG21/test-front-end.git
cd skandia-app
```

### **2. Instalar dependencias**

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`.

---

## **Ejecución**

### **Desarrollo**

```bash
ng serve --open
```

La aplicación estará disponible en: **http://localhost:4200**

### **Build de producción**

```bash
ng build --configuration production
```

Los archivos compilados estarán en: `dist/skandia-app/browser/`

---

## **Testing**

El proyecto incluye **30 tests unitarios** con cobertura completa de componentes y servicios.

### **Distribución de tests:**

| Componente/Servicio  | Tests  |
| -------------------- | ------ |
| App Component        | 2      |
| Header               | 3      |
| Sidebar              | 3      |
| Footer               | 3      |
| Hero Banner          | 3      |
| Goal Card            | 3      |
| Products Slider      | 3      |
| Recommended Products | 3      |
| Home Component       | 3      |
| Products API Service | 4      |
| **TOTAL**            | **30** |

### **Ejecutar tests**

```bash
ng test --watch=false
```

---

## **API**

### **Endpoint Principal**

```
https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia/cards
```

### **Método:** `GET`

### **Respuesta:**

```json
{
  "listCard": [
    {
      "nameProduct": "MFUND",
      "numberProduct": "789654123",
      "balanceProduct": "4000000",
      "detaildProduct": "Ya tienes un 15% de tu objetivo"
    }
  ]
}
```

### **Modelo de datos:**

```typescript
export interface Product {
  nameProduct: string;
  numberProduct: string;
  balanceProduct: string;
  detaildProduct: string;
}

export interface ProductsResponse {
  listCard: Product[];
}
```

---

## 👨‍💻 **Autor**

**Juan Jose Rincón Gomez**
