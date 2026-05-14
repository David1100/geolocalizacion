# Mapas de Calor - Colombia DIU

## Datos de Usuarios por Municipio y Empresa

### PEREIRA-CARTAGO

| Municipio | Total Usuarios | Cumplen FIU | Cumplen DIU | %FIU | %DIU |
|-----------|-----------------|-------------|-------------|------|------|
| CARTAGO | 50557 | 49794 | 50102 | 98.5% | 99.1% |
| PEREIRA | 2052 | 2046 | 2026 | 99.7% | 98.7% |
| ANSERMANUEVO | 23 | 23 | 5 | 100.0% | 21.7% |
| OBANDO | 150 | 143 | 141 | 95.3% | 94.0% |

### PEREIRA - EEPD

| Municipio | Total Usuarios | Cumplen FIU | Cumplen DIU | %FIU | %DIU |
|-----------|-----------------|-------------|-------------|------|------|
| PEREIRA | 205977 | 203320 | 199803 | 98.7% | 97.0% |
| SANTA ROSA DE CABAL | 585 | 585 | 585 | 100.0% | 100.0% |
| FILANDIA | 207 | 206 | 207 | 99.5% | 100.0% |
| DOSQUEBRADAS | 6468 | 6376 | 6375 | 98.6% | 98.6% |
| MARSELLA | 416 | 218 | 267 | 52.4% | 64.2% |
| ALCALÁ | 14 | 4 | 4 | 28.6% | 28.6% |
| LA VIRGINIA | 10 | 2 | 9 | 20.0% | 90.0% |
| BALBOA | 17 | 0 | 4 | 0.0% | 23.5% |

### EMCALI

| Municipio | Total Usuarios | Cumplen FIU | Cumplen DIU | %FIU | %DIU |
|-----------|-----------------|-------------|-------------|------|------|
| CALI | 772953 | 631627 | 732276 | 81.7% | 94.7% |
| PUERTO TEJADA | 7688 | 6977 | 7584 | 90.8% | 98.6% |
| YUMBO | 37256 | 28614 | 33613 | 76.8% | 90.2% |
| JAMUNDÍ | 661 | 654 | 658 | 98.9% | 99.5% |

### CETSA

| Municipio | Total Usuarios | Cumplen FIU | Cumplen DIU | %FIU | %DIU |
|-----------|-----------------|-------------|-------------|------|------|
| TULUÁ | 66985 | 64109 | 55840 | 95.7% | 83.4% |
| SAN PEDRO | 4964 | 3934 | 4215 | 79.3% | 84.9% |
| RIOFRÍO | 18 | 13 | 18 | 72.2% | 100.0% |
| YOTOCO | 1 | 1 | 1 | 100.0% | 100.0% |
| ZARZAL | 2 | 2 | 2 | 100.0% | 100.0% |
| ANDALUCÍA | 1 | 1 | 1 | 100.0% | 100.0% |

---

## Especificaciones del Proyecto

### Objetivo
Crear un mapa de calor de Colombia mostrando el cumplimiento de usuarios de los servicios DIU (Dirección de Instrumentos y Usuarios) por municipio, con colores según el porcentaje de cumplimiento.

### Stack Tecnológico
- **Frontend**: Astro
- **Estilos**: Tailwind CSS
- **Base de datos**: SQLite (data.db)
- **Mapa**: GeoJSON de Colombia con municipios

### Estructura de la Base de Datos

```sql
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "total_usuarios" INTEGER NOT NULL,
    "cumplen_fiu" INTEGER NOT NULL,
    "cumplen_diu" INTEGER NOT NULL,
    "porcentaje_fiu" REAL NOT NULL,
    "porcentaje_diu" REAL NOT NULL,
    PRIMARY KEY("id")
);
```

### Esquema de Colores para el Mapa
- **Verde oscuro (90-100%)**: Cumplimiento excelente
- **Verde claro (70-89%)**: Cumplimiento bueno
- **Amarillo (50-69%)**: Cumplimiento medio
- **Naranja (30-49%)**: Cumplimiento bajo
- **Rojo (0-29%)**: Cumplimiento crítico

### Tareas
1. [x] Inicializar proyecto Astro
2. [x] Configurar Tailwind CSS
3. [x] Crear base de datos SQLite con estructura
4. [x] Insertar datos de usuarios desde AGENTS.md
5. [x] Obtener GeoJSON de municipios de Colombia
6. [x] Implementar componente de mapa de calor
7. [x] Conectar datos SQLite con el mapa
8. [x] Aplicar escala de colores según % DIU
9. [x] Agregar tooltips con información por municipio
10. [x] Verificar y probar la aplicación

---

## Contexto Regulatorio - DIUG y FIUG

### Definiciones
- **DIUG** (Indicador de cumplimiento DIU): Porcentaje de usuarios que cumplen con la Dirección de Instrumentos y Usuarios
- **FIUG** (Factor de uso del instrumento): Indicador complementario relacionado con el uso de instrumentos de medición
- **OR**: Operador de Red (distribuidor de gas)

### Regla del Año 5+
Según el numeral 5.2.5 del marco regulatorio:
> "Después del año 5 del periodo tarifario, los indicadores DIUG y FIUG para cada OR que se usarán para aplicar el esquema de compensaciones corresponderán al **80%** de los DIUG y FIUG estimados"

Esto significa que para el cálculo de compensaciones después del año 5:
- **DIUG_Aplicado = 0.80 × DIUG_Estimado**
- **FIUG_Aplicado = 0.80 × FIUG_Estimado**

### Esquema de Compensaciones
El mapa muestra los valores reales de DIU. La aplicación del factor del 80% se utiliza para determinar el porcentaje final aplicable al esquema de compensaciones económicas entre operadores de red.