# Sistema de Navegación y Edición de Proyectos

Este documento explica cómo funciona el sistema de navegación a proyectos
individuales y el sistema de persistencia simulada implementado.

## 📋 Resumen

Se ha implementado un sistema completo para:

1. Ver la lista de proyectos en una tabla
2. Navegar a la página de detalle de cada proyecto
3. Editar proyectos (simulado con localStorage)
4. Reflejar los cambios en la tabla principal

## 🗂️ Estructura de Archivos

```
src/app/(freelancer)/dashboard/projects/
├── page.tsx                          # Página principal con tabla de proyectos
├── ProjectsTable.tsx                 # Componente de tabla con columna "Acciones"
└── [id]/
    └── page.tsx                      # Página dinámica de detalle/edición de proyecto
```

## 🔄 Flujo de Navegación

### 1. Tabla de Proyectos (ProjectsTable.tsx)

**Nueva columna "Acciones":**

```tsx
{
  id: 'actions',
  header: 'Acciones',
  cell: ({ row }) => {
    const projectId = row.original.id;
    return (
      <Link href={`/dashboard/projects/${projectId}`}>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
          Ver Proyecto
        </Button>
      </Link>
    );
  },
}
```

- Cada fila tiene un botón "Ver Proyecto"
- Al hacer clic, navega a `/dashboard/projects/project-1` (por ejemplo)
- Usa `next/link` para navegación del lado del cliente

### 2. Página de Detalle ([id]/page.tsx)

**Ruta dinámica:** `/dashboard/projects/[id]`

**Características:**

- Lee el `id` desde `params`
- Busca el proyecto en `mockProjects` o en localStorage
- Muestra todos los detalles del proyecto
- Permite editar: nombre, cliente, categoría, estado, tarifas, descripción
- Guarda cambios en localStorage (simulado)

## 💾 Sistema de Persistencia Simulada

### Cómo Funciona

#### En la página de detalle ([id]/page.tsx):

1. **Al cargar:**

   ```tsx
   const storageKey = `project-override-${projectId}`;
   const savedOverride = localStorage.getItem(storageKey);

   if (savedOverride) {
     // Usar el proyecto editado
     loadedProject = JSON.parse(savedOverride);
   } else {
     // Usar el proyecto del mock
     loadedProject = mockProjects.find((p) => p.id === projectId);
   }
   ```

2. **Al guardar cambios:**

   ```tsx
   const updatedProject = {
     ...project,
     ...formData,
     updated_at: new Date(),
   };

   localStorage.setItem(
     `project-override-${projectId}`,
     JSON.stringify(updatedProject)
   );
   ```

#### En la página principal (page.tsx):

1. **Al cargar la tabla:**

   ```tsx
   const projectsWithOverrides = mockProjects.map((project) => {
     const storageKey = `project-override-${project.id}`;
     const savedOverride = localStorage.getItem(storageKey);

     return savedOverride ? JSON.parse(savedOverride) : project;
   });
   ```

2. **Escucha cambios en storage:**
   ```tsx
   window.addEventListener("storage", handleStorageChange);
   ```

### Keys de localStorage Usadas

- `project-override-project-1` → Override para proyecto con ID "project-1"
- `project-override-project-2` → Override para proyecto con ID "project-2"
- etc.

## 🎯 Casos de Uso

### Caso 1: Ver un proyecto

1. Usuario ve la tabla de proyectos
2. Hace clic en "Ver Proyecto"
3. Navega a `/dashboard/projects/project-1`
4. Ve todos los detalles del proyecto

### Caso 2: Editar un proyecto

1. En la página de detalle, edita campos
2. Hace clic en "Guardar cambios"
3. Los cambios se guardan en localStorage
4. Aparece notificación: "Cambios guardados (simulado)"
5. Al volver a la tabla, los cambios se reflejan

### Caso 3: Crear un proyecto nuevo

1. Hace clic en "Nuevo Proyecto"
2. Llena el formulario
3. El proyecto se agrega a la lista en memoria
4. Aparece en la tabla inmediatamente

## 🔍 Notas Técnicas

### Por qué localStorage

- ✅ No requiere backend
- ✅ Persiste entre recargas de página
- ✅ Ideal para demostraciones
- ✅ Fácil de limpiar (borrar datos del navegador)
- ⚠️ No es para producción (datos solo en el navegador del usuario)

### Limitaciones

- Los datos solo existen en el navegador local
- No se sincronizan entre dispositivos
- Se pierden si se limpia el caché del navegador
- No hay validación de conflictos

### URLs Generadas

El formato de URL es exactamente como se solicitó:

- `/dashboard/projects/project-1`
- `/dashboard/projects/project-2`
- `/dashboard/projects/project-123`

## 🚀 Cómo Probarlo

1. **Ver la tabla:**

   - Ve a `/dashboard/projects`
   - Verás 6 proyectos mock

2. **Navegar a un proyecto:**

   - Haz clic en "Ver Proyecto" en cualquier fila
   - Se abrirá la página de detalle

3. **Editar un proyecto:**

   - Cambia el nombre, categoría o estado
   - Haz clic en "Guardar cambios"
   - Verás un toast de confirmación

4. **Ver los cambios:**

   - Haz clic en "Volver"
   - La tabla mostrará los valores actualizados

5. **Recargar la página:**
   - Los cambios persisten (están en localStorage)

## 🧹 Limpiar Datos Simulados

Para resetear todos los proyectos a su estado original:

```javascript
// En la consola del navegador:
Object.keys(localStorage)
  .filter((key) => key.startsWith("project-override-"))
  .forEach((key) => localStorage.removeItem(key));

// Luego recarga la página
location.reload();
```

## 📝 Próximos Pasos (Opcional)

Si en el futuro quieres conectar con un backend real:

1. Reemplaza las llamadas a localStorage con llamadas API
2. Descomenta el código de `createProjectAction` y `getProjectsAction`
3. Implementa endpoints REST o GraphQL
4. Agrega optimistic updates con TanStack Query
5. Implementa real-time updates con WebSockets

---

**Implementado el:** 19 de noviembre de 2025 **Stack:** Next.js 15 + React 19 +
TypeScript + TanStack Table
