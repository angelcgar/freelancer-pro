# Módulo de Contratos - Documentación Completa

## 📋 Descripción General

El módulo de Contratos proporciona una solución completa para la gestión de
contratos y propuestas dentro de la plataforma freelance-pro. Permite crear,
editar, visualizar y eliminar contratos con persistencia simulada mediante
`localStorage`.

## 🗂️ Estructura de Archivos

```
src/
├── mocks/
│   └── contracts.ts                    # Datos mock de contratos (5 contratos de ejemplo)
├── app/(freelancer)/dashboard/contracts/
│   ├── page.tsx                        # Página principal (listado de contratos)
│   ├── ContractsTable.tsx              # Tabla de contratos con acciones
│   ├── contractsStore.ts               # Store CRUD con localStorage
│   └── [id]/
│       └── page.tsx                    # Página dinámica de detalle/edición
└── components/contract/
    └── AddContractDialog.tsx           # Diálogo para crear contratos
```

## 📦 Archivos Creados

### 1. `/src/mocks/contracts.ts`

Contiene la interfaz `MockContract` y 5 contratos de ejemplo con datos
realistas.

**Interfaz MockContract:**

```typescript
export interface MockContract {
  id: string; // Formato: ct-001, ct-002, etc.
  user_id: string; // ID del usuario propietario
  client_id: string; // ID del cliente asociado
  project_id: string; // ID del proyecto asociado (opcional)
  title: string; // Título del contrato
  description: string; // Descripción detallada
  status: "active" | "expired" | "pending" | "draft";
  start_date: string; // Fecha de inicio (ISO string)
  end_date: string; // Fecha de fin (ISO string)
  value: string; // Valor monetario del contrato
  terms: string; // Términos y condiciones
  created_at: Date; // Fecha de creación
  updated_at: string; // Última actualización
}
```

**Contratos mock incluidos:**

- `ct-001`: Website Redesign Contract ($15,000, activo)
- `ct-002`: Mobile App Development Agreement ($50,000, activo)
- `ct-003`: Brand Identity Package ($8,500, expirado)
- `ct-004`: E-commerce Platform ($35,000, activo)
- `ct-005`: SEO Optimization Services ($4,500, pendiente)

### 2. `/src/app/(freelancer)/dashboard/contracts/contractsStore.ts`

Store completo con funciones CRUD y gestión de `localStorage`.

**Funciones disponibles:**

#### `getContracts(): MockContract[]`

Obtiene todos los contratos (desde localStorage + mocks).

#### `getContractById(id: string): MockContract | null`

Obtiene un contrato específico por ID.

#### `createContract(data): MockContract`

Crea un nuevo contrato con ID autogenerado (`ct-{timestamp}`).

**Parámetros:**

```typescript
{
  title: string;
  client_id: string;
  project_id?: string;
  description?: string;
  status: 'active' | 'expired' | 'pending' | 'draft';
  start_date: string;
  end_date: string;
  value: string;
  terms?: string;
}
```

#### `updateContract(id: string, data: Partial<MockContract>): MockContract | null`

Actualiza un contrato existente.

#### `deleteContract(id: string): boolean`

Elimina un contrato de localStorage. Retorna `true` si fue exitoso.

#### `resetContracts(): void`

Resetea todos los contratos a los valores mock originales.

**Claves localStorage:**

- `freelance-pro-contracts`: Lista de IDs de contratos
- `contract-override-{id}`: Datos del contrato individual

### 3. `/src/app/(freelancer)/dashboard/contracts/page.tsx`

Página principal del módulo con:

- Listado completo de contratos
- Estado vacío con llamado a acción
- Integración con `contractsStore`
- Escucha de eventos `contracts-updated`
- Callbacks para sincronización de estado

**Características:**

- ✅ Client Component (`'use client'`)
- ✅ useState para gestión de contratos
- ✅ useEffect para cargar contratos y escuchar eventos
- ✅ Handlers: `handleContractCreated`, `handleContractDeleted`
- ✅ Estado vacío con ilustración y botón

### 4. `/src/app/(freelancer)/dashboard/contracts/ContractsTable.tsx`

Tabla de contratos con `@tanstack/react-table`.

**Columnas:**

1. **Título** - Con icono de documento
2. **Estado** - Badge con colores según estado
3. **Valor** - Formateado como moneda
4. **Fecha de inicio** - Formato localizado (español)
5. **Fecha de fin** - Formato localizado (español)
6. **Acciones** - Ver, Editar, Eliminar

**Características:**

- ✅ Búsqueda global con input
- ✅ Paginación con botones prev/next
- ✅ Ordenamiento en columnas
- ✅ Filtrado en tiempo real
- ✅ AlertDialog para confirmación de eliminación
- ✅ Toast notifications (Sonner)
- ✅ Navegación a página de detalle con Link
- ✅ Estados de Badge: active, expired, pending, draft
- ✅ Formateo de fechas con `date-fns` (locale: es)

**Variantes de Badge:**

```typescript
active: "default"; // Verde
expired: "secondary"; // Gris
pending: "outline"; // Borde
draft: "destructive"; // Rojo
```

### 5. `/src/app/(freelancer)/dashboard/contracts/[id]/page.tsx`

Página dinámica para ver y editar contratos individuales.

**Secciones:**

#### Header

- Botón de regreso a `/dashboard/contracts`
- Título del contrato
- Badge de estado
- Información del cliente

#### Quick Info Cards

Tres cards con información clave:

1. **Valor del contrato** - Con icono de DollarSign
2. **Fecha de inicio** - Con icono de Calendar
3. **Fecha de fin** - Con icono de FileText

#### Formulario de Edición

Campos incluidos:

- Título del contrato (Input)
- Cliente (Select con `mockClientsSimple`)
- Estado (Select: active, pending, expired, draft)
- Valor del contrato (Input type="number")
- Fecha de inicio (Input type="date")
- Fecha de fin (Input type="date")
- Descripción (Textarea)
- Términos y condiciones (Textarea)

**Características:**

- ✅ Validación con `react-hook-form` + `zod`
- ✅ Carga desde `getContractById`
- ✅ Actualización con `updateContract`
- ✅ Toast notifications
- ✅ Estado de loading con Loader2
- ✅ Estado "Contrato no encontrado" con card informativa
- ✅ Botones: Cancelar (outline), Guardar (primary)
- ✅ Emit evento `contracts-updated` al guardar

### 6. `/src/components/contract/AddContractDialog.tsx`

Diálogo modal para crear nuevos contratos.

**Campos del formulario:**

- Título del contrato \* (Input)
- Cliente \* (Select con `mockClientsSimple`)
- Estado \* (Select: draft, pending, active, expired)
- Valor del contrato \* (Input number)
- Fecha de inicio \* (Input date)
- Fecha de fin \* (Input date)
- Descripción (Textarea opcional)
- Términos y condiciones (Textarea opcional)

**Características:**

- ✅ Validación con `zod`
- ✅ Estado de submitting con Loader2
- ✅ Callback `onContractCreated` para sincronización
- ✅ Emit evento `contracts-updated`
- ✅ Reset automático del formulario al cerrar
- ✅ Toast notifications
- ✅ Layout responsive con grid de 2 columnas

**Props:**

```typescript
interface AddContractDialogProps {
  onContractCreated?: (contract: MockContract) => void;
}
```

## 🔄 Flujo de Datos

### Crear un Contrato

```
Usuario hace clic en "Nuevo Contrato"
       ↓
AddContractDialog se abre
       ↓
Usuario completa el formulario
       ↓
Validación con zod
       ↓
createContract() en contractsStore
       ↓
Guardar en localStorage
       ↓
Emit evento 'contracts-updated'
       ↓
Callback onContractCreated
       ↓
Actualizar UI + Toast success
       ↓
Cerrar diálogo
```

### Editar un Contrato

```
Usuario hace clic en botón "Editar" (o "Ver")
       ↓
Navegación a /dashboard/contracts/[id]
       ↓
getContractById() desde store
       ↓
Cargar datos en el formulario
       ↓
Usuario edita campos
       ↓
Submit del formulario
       ↓
Validación con zod
       ↓
updateContract() en contractsStore
       ↓
Actualizar localStorage override
       ↓
Emit evento 'contracts-updated'
       ↓
Toast success
       ↓
Actualizar estado local
```

### Eliminar un Contrato

```
Usuario hace clic en botón "Eliminar" (Trash2)
       ↓
AlertDialog se abre
       ↓
Usuario confirma eliminación
       ↓
deleteContract() en contractsStore
       ↓
Eliminar de localStorage
       ↓
Emit evento 'contracts-updated'
       ↓
Callback onContractDeleted
       ↓
Actualizar UI + Toast success
       ↓
Cerrar AlertDialog
```

## 🎨 Componentes UI Utilizados

- `Button` - Botones de acción
- `Card` - Contenedores visuales
- `Dialog` - Modal para crear contratos
- `AlertDialog` - Confirmación de eliminación
- `Table` - Tabla de datos con `@tanstack/react-table`
- `Input` - Campos de texto y números
- `Textarea` - Campos de texto multilínea
- `Select` - Selectores de cliente y estado
- `Badge` - Indicadores de estado
- `Form` - Wrapper de react-hook-form
- `Sonner` - Toast notifications

## 🌐 Rutas

### Página Principal

```
/dashboard/contracts
```

Lista todos los contratos con búsqueda, filtros y acciones.

### Página de Detalle

```
/dashboard/contracts/[id]
```

Ejemplos:

- `/dashboard/contracts/ct-001`
- `/dashboard/contracts/ct-1234567890`

## 🔑 localStorage Keys

```typescript
// Lista de IDs de contratos
'freelance-pro-contracts': string[]

// Override individual de un contrato
'contract-override-ct-001': MockContract
'contract-override-ct-002': MockContract
```

## 📝 Validación con Zod

Schema de validación:

```typescript
const contractFormSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede exceder 100 caracteres"),
  client_id: z.string().min(1, "Debe seleccionar un cliente"),
  project_id: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "expired", "pending", "draft"]),
  start_date: z.string().min(1, "La fecha de inicio es obligatoria"),
  end_date: z.string().min(1, "La fecha de fin es obligatoria"),
  value: z.string().min(1, "El valor del contrato es obligatorio"),
  terms: z.string().optional(),
});
```

## 🎯 Características Implementadas

### Core Functionality

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Persistencia con localStorage
- ✅ Datos mock para demostración
- ✅ Routing dinámico con Next.js 15 App Router

### UI/UX

- ✅ Tabla con búsqueda y paginación
- ✅ Formularios con validación
- ✅ Toast notifications para feedback
- ✅ AlertDialog para confirmaciones
- ✅ Estados de loading
- ✅ Estado vacío con ilustración
- ✅ Responsive design

### Data Management

- ✅ Store pattern con funciones CRUD
- ✅ Override pattern para ediciones
- ✅ Event-driven updates (`contracts-updated`)
- ✅ SSR-safe con window checks
- ✅ Error handling completo

### Integration

- ✅ Integración con módulo de Clients
- ✅ Selects poblados con `mockClientsSimple`
- ✅ Formateo de fechas con `date-fns` (locale: es)
- ✅ Formateo de moneda

## 🚀 Uso del Módulo

### Obtener todos los contratos

```typescript
import { getContracts } from "@/app/(freelancer)/dashboard/contracts/contractsStore";

const contracts = getContracts();
```

### Crear un contrato

```typescript
import { createContract } from "@/app/(freelancer)/dashboard/contracts/contractsStore";

const newContract = createContract({
  title: "Nuevo Contrato",
  client_id: "client-1",
  status: "draft",
  start_date: "2024-01-01",
  end_date: "2024-12-31",
  value: "25000",
});
```

### Actualizar un contrato

```typescript
import { updateContract } from "@/app/(freelancer)/dashboard/contracts/contractsStore";

const updated = updateContract("ct-001", {
  status: "active",
  value: "30000",
});
```

### Eliminar un contrato

```typescript
import { deleteContract } from "@/app/(freelancer)/dashboard/contracts/contractsStore";

const success = deleteContract("ct-001");
```

### Escuchar cambios

```typescript
useEffect(() => {
  const handleUpdate = () => {
    // Recargar contratos
    const contracts = getContracts();
    setContracts(contracts);
  };

  window.addEventListener("contracts-updated", handleUpdate);

  return () => {
    window.removeEventListener("contracts-updated", handleUpdate);
  };
}, []);
```

## 📚 Dependencias Utilizadas

- `next` - Framework React
- `react` - Biblioteca UI
- `react-hook-form` - Gestión de formularios
- `zod` - Validación de schemas
- `@tanstack/react-table` - Tabla de datos
- `date-fns` - Formateo de fechas
- `lucide-react` - Iconos
- `sonner` - Toast notifications
- Componentes Radix UI (Dialog, AlertDialog, Select, etc.)

## 🎨 Paleta de Estados

| Estado  | Variant     | Color | Uso                  |
| ------- | ----------- | ----- | -------------------- |
| active  | default     | Verde | Contratos activos    |
| expired | secondary   | Gris  | Contratos expirados  |
| pending | outline     | Borde | Contratos pendientes |
| draft   | destructive | Rojo  | Borradores           |

## 🔮 Mejoras Futuras Sugeridas

1. **Backend Integration**

   - Conectar con API real de Supabase
   - Autenticación y autorización
   - Validación server-side

2. **Features Avanzadas**

   - Firmas electrónicas
   - Versionado de contratos
   - Plantillas de contratos
   - Exportación a PDF
   - Notificaciones de vencimiento
   - Historial de cambios

3. **UI Enhancements**

   - Vista de calendario de contratos
   - Dashboard con métricas
   - Filtros avanzados (por cliente, estado, fecha)
   - Ordenamiento múltiple en tabla

4. **Performance**
   - Paginación server-side
   - Infinite scroll
   - Caching con React Query

## 📖 Patrones Aplicados

### Store Pattern

Funciones centralizadas para gestión de datos con localStorage como persistencia
temporal.

### Event-Driven Updates

Uso de eventos personalizados para sincronización entre componentes sin prop
drilling.

### Override Pattern

Los cambios se guardan como overrides sobre los mocks, permitiendo resetear
fácilmente.

### Callback Pattern

Comunicación padre-hijo mediante callbacks opcionales.

## ✅ Testing Checklist

- [ ] Crear un nuevo contrato
- [ ] Ver detalles de un contrato
- [ ] Editar un contrato existente
- [ ] Eliminar un contrato con confirmación
- [ ] Buscar contratos en la tabla
- [ ] Navegar entre páginas de la tabla
- [ ] Verificar persistencia en localStorage
- [ ] Validar formularios con datos inválidos
- [ ] Probar estado vacío sin contratos
- [ ] Verificar toast notifications
- [ ] Verificar formateo de fechas y moneda
- [ ] Probar navegación entre rutas

## 🏁 Conclusión

El módulo de Contratos está **completamente implementado** siguiendo los mismos
patrones y estándares de calidad de los módulos de Proyectos y Clientes.
Incluye:

✅ CRUD completo ✅ Store con localStorage ✅ Tabla con acciones ✅ Routing
dinámico ✅ Validación de formularios ✅ Toast notifications ✅ AlertDialog para
confirmaciones ✅ Mock data realista ✅ TypeScript con tipos estrictos ✅
Componentes reutilizables ✅ Event-driven updates ✅ Estados de loading y vacío

---

**Última actualización:** Enero 2024 **Versión:** 1.0.0 **Autor:** GitHub
Copilot
