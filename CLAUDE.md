## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


# SalesAutomationTool — Guía del proyecto

Herramienta interna de automatización de ventas Upselling. Permite a operadores registrar ventas mediante un formulario web con autenticación JWT. Los datos se persisten en un archivo Excel y está planificada la integración con WhatsApp vía Twilio.

---

## Instrucciones para Claude

- Todo el código, comentarios y nombres van en **español**
- Respetar estrictamente el patrón Smart/Dumb en Angular
- Usar `inject()` funcional, nunca constructor injection
- No usar NgModules — solo standalone components
- Al implementar algo nuevo, actualizar la tabla de Estado actual
- No modificar `appsettings.json` con credenciales reales

---

## Próxima tarea prioritaria

Conectar `SalesService.submitSale()` al endpoint `POST /api/sales`.
Ver sección "Pendiente crítico" para el código base.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 21 (standalone components), TailwindCSS v3, RxJS 7, TypeScript 5.9 |
| Backend | ASP.NET Core Web API, .NET 10, C# |
| Persistencia | ClosedXML 0.105.0 → archivo `ventas.xlsx` (sin base de datos relacional) |
| Autenticación | JWT Bearer (Microsoft.AspNetCore.Authentication.JwtBearer 10.0.8) |
| Tests Frontend | Vitest + jsdom |
| Formato | Prettier (singleQuote, printWidth 100), EditorConfig (2 espacios, UTF-8) |

---

## Arquitectura

```
SalesAutomationTool/
├── Backend/      → API REST en .NET 10 (puerto 5044)
└── Frontend/     → SPA Angular 21 (puerto 4200)
```

Los dos proyectos son completamente independientes y se comunican por HTTP. El frontend llama a `http://localhost:4200` y el backend corre en `http://localhost:5044`.

### Backend — Clean Architecture en capas

```
Controllers/   → endpoints HTTP (AuthController, SalesController)
Models/        → entidades y DTOs (RegistroVenta, LoginRequest)
Repositories/  → interfaz IRepository<T> + implementación ExcelRepository
Program.cs     → configuración de DI, CORS, JWT y pipeline HTTP
```

### Frontend — Feature-driven + patrón Smart/Dumb

```
src/app/
├── core/
│   ├── guards/          → authGuard (protege /ventas)
│   └── interceptors/    → authInterceptor (agrega Bearer token a cada request)
├── features/
│   ├── auth/
│   │   ├── components/login/   → formulario de login
│   │   └── services/           → AuthService (login, logout, token)
│   └── sales/
│       ├── components/
│       │   ├── sales-shell/    → componente Smart (orquesta lógica)
│       │   └── sales-form/     → componente Dumb (solo UI y eventos)
│       └── services/           → SalesService (pendiente: conectar al backend)
├── app.routes.ts   → rutas: /login (eager) y /ventas (lazy + guard)
├── app.config.ts   → provideRouter + provideHttpClient con interceptor
└── app.ts          → componente raíz con <router-outlet>
```

---

## Comandos

### Backend

```bash
# Desde la carpeta Backend/
cd Backend

dotnet run              # Arranca la API en http://localhost:5044
dotnet build            # Compila sin arrancar
dotnet publish          # Genera build de producción
```

### Frontend

```bash
# Desde la carpeta Frontend/
cd Frontend

ng serve                # Dev server en http://localhost:4200 (hot reload)
ng build                # Build de producción → dist/Frontend/browser/
ng test                 # Corre los tests con Vitest
npm run watch           # Build en modo watch (desarrollo sin servidor)
```

> Para desarrollo se necesitan **dos terminales simultáneas**: una para el backend y otra para el frontend.

---

## Configuración importante

### Backend — `appsettings.json`

```json
{
  "Excel": { "RutaArchivo": "ventas.xlsx" },
  "Jwt": {
    "Clave": "SalesAutomationTool-Llave-Super-Secreta-Para-JWT-2024",
    "Emisor": "SalesAutomationTool",
    "Audiencia": "SalesAutomationTool"
  }
}
```

El archivo `ventas.xlsx` se crea automáticamente en la raíz de `Backend/` la primera vez que se registra una venta. No hay que crearlo manualmente.

### Frontend — URL del backend

Definida en `auth.service.ts`:
```typescript
private readonly apiUrl = 'http://localhost:5044/api';
```

**Importante:** para deploy en producción esta URL debe apuntar al servidor real, no a localhost.

### Assets — `angular.json`

Los assets se sirven desde dos fuentes:
- `public/` → raíz del servidor (favicon, etc.)
- `src/assets/` → mapeado a `/assets/` (imágenes del proyecto)

---

## Autenticación

- El token JWT se guarda en `sessionStorage` (se borra al cerrar el tab)
- Expira en **8 horas**
- El `authInterceptor` lo inyecta automáticamente en cada petición HTTP
- El `authGuard` protege la ruta `/ventas` — redirige a `/login` si no hay token

### Operadores habilitados (hardcodeados en `AuthController.cs`)

```
Los operadores están hardcodeados en `AuthController.cs` → lista `_operadores`.
```

Para agregar operadores, editar la lista `_operadores` en `AuthController.cs` y reiniciar el backend.

---

## Convenciones de código

### General
- **Idioma:** todo el código (comentarios, variables, métodos, mensajes) está en **español**
- **Commits:** Conventional Commits en español → `feat(scope): descripción`, `fix(scope): descripción`, `chore(scope): descripción`

### C# (Backend)
- PascalCase para clases, métodos y propiedades públicas
- `_camelCase` para campos privados
- Nombres de variables y métodos en español (`GuardarAsync`, `_rutaArchivo`, `GenerarToken`)
- Un archivo por clase
- - Inyección de dependencias vía **constructor** (estándar de .NET)
- Logs estructurados con `ILogger<T>` en cada controller y repository

### TypeScript (Frontend)
- Comillas simples (`'`)
- 2 espacios de indentación
- `inject()` funcional — **nunca** constructor injection
- `getRawValue()` en lugar de `.value` en formularios reactivos (evita tipos `null`)
- Componentes standalone (sin NgModules)
- `NgIf` importado explícitamente en cada componente que lo usa
- Separación estricta Smart/Dumb: el componente Shell orquesta, el Form solo emite eventos

### CSS / Estilos
- TailwindCSS v3 para todo el layout y utilitarios
- Estilos con `url()` definidos en archivos `.css` del componente (no en `style=""` inline — Angular los sanitiza)
- Rutas relativas en CSS de componentes: `../../../../../assets/images/...`

---

## Estado actual del proyecto

| Funcionalidad | Estado |
|--------------|--------|
| Login con JWT | ✅ Completo |
| Formulario de ventas (UI) | ✅ Completo |
| Guardar venta en Excel | ✅ Completo |
| Persistencia de operadores en Excel (`Operadores.xlsx`) | ✅ Completo |
| Panel Admin: CRUD de operadores (backend) | ✅ Completo |
| Panel Admin: UI con tabla, modal y guard (frontend) | ✅ Completo |
| Conexión frontend → backend (ventas) | ✅ Completo |
| Historial de ventas por operador (`GET /api/sales/me`) | ✅ Completo |
| Vista global de ventas para admin (`GET /api/admin/ventas`) | ✅ Completo |
| Método de pago en Excel (columna 7) | ✅ Completo |
| Selección múltiple de dispositivos (lista oficial) | ✅ Completo |
| Integración WhatsApp (Twilio) | ⏳ Planificado |
| Deploy / hosting producción | ⏳ Pendiente |

---

## Seguridad — notas importantes

- La clave JWT está en `appsettings.json` en texto plano. En producción debe moverse a variables de entorno o un gestor de secretos.
- Los operadores están hardcodeados en el controller. En producción deberían estar en base de datos con contraseñas hasheadas.
- CORS configurado solo para `http://localhost:4200`. Actualizar en producción.

---