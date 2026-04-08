# ⚡ Fuerzas Físicas - Simulador de Ley de Coulomb

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

*Una aplicación web interactiva para visualizar y calcular fuerzas electrostáticas entre cargas puntuales*

[Iniciar Proyecto](#-instalación) • [Características](#-características) • [Tecnologías](#-tecnologías) • [Uso](#-uso)

</div>

## 📋 Descripción

**Fuerzas Físicas** es un simulador educativo que implementa la **Ley de Coulomb** y el **Principio de Superposición** para calcular y visualizar las fuerzas electrostáticas entre cargas puntuales. Esta herramienta está diseñada para estudiantes y profesionales de física que deseen comprender de manera visual las interacciones entre cargas eléctricas.

### 🎯 Objetivo Principal

- **Visualizar** la distribución de cargas en un plano 2D
- **Calcular** la fuerza neta sobre una carga objetivo
- **Comprender** el principio de superposición de fuerzas
- **Experimentar** con diferentes configuraciones de cargas

## ✨ Características

### 🔌 Gestión de Cargas
- **Cargas Puntuales**: Agrega múltiples cargas fuente con magnitudes y posiciones personalizadas
- **Carga Objetivo**: Define una carga específica para calcular la fuerza neta sobre ella
- **Validación Inteligente**: Verifica que todos los valores sean numéricos y válidos
- **Gestión Visual**: Lista interactiva con colores distintivos (rojo para positivas, azul para negativas)

### 📊 Cálculos Físicos
- **Ley de Coulomb**: `F = k · |q₁ · q₂| / r²`
- **Constante de Coulomb**: `k = 8.99 × 10⁹ N·m²/C²`
- **Principio de Superposición**: Suma vectorial de todas las fuerzas individuales
- **Cálculo en Tiempo Real**: Resultados instantáneos al modificar las cargas

### 🎨 Visualización Interactiva
- **Canvas HTML5**: Renderizado eficiente de cargas y vectores
- **Escalado Automático**: Ajuste dinámico del viewport según las posiciones
- **Vectores de Fuerza**: Visualización clara de dirección y magnitud
- **Sistema Coordenado**: Grid y ejes X-Y para referencia espacial

### 💻 Interfaz de Usuario
- **Design Moderno**: UI elegante con Tailwind CSS y componentes Radix
- **Responsive Design**: Funciona perfectamente en desktop y móviles
- **Tabs Organizados**: Separación clara entre configuración y visualización
- **Feedback Visual**: Indicadores de estado y mensajes de error informativos

## 🛠 Tecnologías

### Frontend Core
- **React 18.3.1** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Vite 6.3.5** - Build tool rápido y moderno

### Estilos y UI
- **Tailwind CSS 4.1.12** - Framework de CSS utility-first
- **Radix UI** - Componentes accesibles y personalizables
- **Lucide React** - Iconos modernos y consistentes
- **shadcn/ui** - Sistema de diseño completo

### Visualización
- **Canvas API** - Renderizado 2D nativo del navegador
- **HTML5 Canvas** - Gráficos vectoriales escalables

### Desarrollo
- **ESLint** - Linting para código limpio
- **PostCSS** - Procesamiento de CSS moderno

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/fuerzas-fisicas.git
   cd fuerzas-fisicas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir navegador**
   ```
   http://localhost:5173
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 📖 Uso

### 1. Configurar Carga Objetivo
- Ve a la pestaña **"Carga Objetivo"**
- Ingresa la magnitud en microcoulombs (μC)
- Define la posición X e Y en metros
- Ejemplo: `q = 2 μC` en posición `(0, 0)`

### 2. Agregar Cargas Puntuales
- Cambia a la pestaña **"Cargas Puntuales"**
- Añade múltiples cargas con diferentes magnitudes y posiciones
- Usa valores positivos para cargas positivas (rojo)
- Usa valores negativos para cargas negativas (azul)

### 3. Analizar Resultados
- La fuerza neta se calcula automáticamente
- Visualiza los vectores de fuerza en el canvas
- Revisa los cálculos detallados en la sección de resultados

### 4. Experimentar
- Modifica las posiciones y magnitudes
- Observa cómo cambian los vectores de fuerza
- Elimina cargas individuales o limpia todo

## 📁 Estructura del Proyecto

```
fuerzas-fisicas/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ChargeInput.tsx          # Gestión de cargas puntuales
│   │   │   ├── TargetChargeInput.tsx    # Configuración de carga objetivo
│   │   │   ├── ChargeVisualization.tsx  # Visualización en canvas
│   │   │   ├── ForceCalculation.tsx     # Cálculos físicos
│   │   │   └── ui/                      # Componentes UI reutilizables
│   │   ├── App.tsx                      # Componente principal
│   │   └── main.tsx                     # Punto de entrada
│   └── styles/
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## 🧮 Fundamentos Físicos

### Ley de Coulomb
La fuerza electrostática entre dos cargas puntuales está dada por:

```
F = k · |q₁ · q₂| / r²
```

Donde:
- `F` = Fuerza electrostática (Newton)
- `k` = 8.99 × 10⁹ N·m²/C² (Constante de Coulomb)
- `q₁, q₂` = Magnitudes de las cargas (Coulomb)
- `r` = Distancia entre las cargas (metros)

### Principio de Superposición
Cuando múltiples cargas actúan sobre una carga de prueba, la fuerza neta es la suma vectorial de todas las fuerzas individuales:

```
F_neta = Σ F_i
```

## 🎯 Casos de Uso

### Educación
- **Estudiantes de Física**: Comprender conceptos electrostáticos
- **Profesores**: Herramienta visual para enseñanza
- **Tutoriales**: Demostraciones interactivas

### Ingeniería
- **Diseño de Circuitos**: Análisis de distribuciones de carga
- **Electromagnetismo**: Estudio de campos eléctricos
- **Simulaciones**: Modelado de sistemas de cargas

### Investigación
- **Física Teórica**: Validación de modelos matemáticos
- **Experimentos Virtuales**: Pruebas de configuraciones
- **Análisis Cuantitativo**: Cálculos precisos de fuerzas

## 🔧 Configuración Avanzada

### Personalización de Unidades
Para cambiar entre microcoulombs y coulombs, modifica las siguientes líneas en `ChargeInput.tsx`:

```typescript
// Para entrada en microcoulombs
onAddCharge(mag * 1e-6, { x, y });

// Para entrada directa en coulombs  
onAddCharge(mag, { x, y });
```

### Ajustes de Visualización
Personaliza el canvas modificando las constantes en `ChargeVisualization.tsx`:

```typescript
const K = 8.99e9; // Constante de Coulomb
const scale = Math.min(width, height) / (2.5 * maxDistance); // Escala
```


## 🙏 Agradecimientos

- **React Team** - Por el excelente framework
- **Tailwind CSS** - Por el sistema de diseño utility-first
- **Radix UI** - Por los componentes accesibles
- **Vite** - Por la herramienta de build increíblemente rápida
- **Nuestro equipo de trabajo** - Por prestar sus conocimientos previos para la realizacion de este proyecto posible

---
- **Sitio: https://jevg7.github.io/FuerzasFisicas/

<div align="center">

**⚡ Hecho con pasión por la física educativa ⚡**

[Reportar Issue](https://github.com/tu-usuario/fuerzas-fisicas/issues) • [Sugerir Mejora](https://github.com/tu-usuario/fuerzas-fisicas/discussions)

</div>
