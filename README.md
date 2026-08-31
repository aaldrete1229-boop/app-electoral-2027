# app-electoral-2027

## Conexión con Supabase

El proyecto incluye un cliente de Supabase listo para usarse en el navegador en
`src/lib/supabase.ts`. La configuración usa variables de entorno de Vite para
evitar almacenar credenciales en el repositorio. No se incluye ningún valor de
configuración en este repositorio.

### 1. Instalar la dependencia

```bash
npm install
```

### 2. Datos necesarios de Supabase

Para terminar la conexión necesito estos dos valores de **tu proyecto**:

1. **Project URL**: en el panel de Supabase, abre tu proyecto y ve a
   **Project Settings → API**. Copia el valor mostrado como **Project URL**.
2. **Publishable key**: en esa misma pantalla, copia la clave marcada como
   **Publishable key**. En proyectos creados con la interfaz anterior puede
   aparecer como **anon key**; también es la clave adecuada para el navegador.

No compartas en el chat ni añadas al repositorio la clave `service_role`, la
contraseña de la base de datos, tokens personales de Supabase ni secretos de
proveedores de autenticación. No son necesarios para esta integración de
cliente.

### 3. Guardar los datos solo en tu equipo

Crea manualmente `.env.local` en la raíz del proyecto y pega los dos valores
obtenidos, sin comillas adicionales:

```bash
touch .env.local
```

El archivo debe contener únicamente estas dos asignaciones con tus valores
reales:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

`.env.local` está excluido por `.gitignore`; verifica antes de confirmar cambios
que Git no lo muestre en `git status`.

### 4. Consultar datos

Importa el cliente compartido donde lo necesites:

```ts
import { supabase } from './lib/supabase'

const { data, error } = await supabase.from('candidaturas').select('*')

if (error) throw error
```

Antes de exponer una tabla en el navegador, activa **Row Level Security (RLS)**
y crea políticas que limiten qué filas puede leer o modificar cada usuario.

### Vista de comprobación

Para abrir una vista local que comprueba la conexión y muestra los recuentos de
`casillas` y `resultados` mediante peticiones `HEAD` que sólo solicitan `id` y no
descargan registros, ejecuta:

```bash
npm run preview
```

Abre `http://localhost:4173` en el navegador. El comando genera localmente el
archivo de configuración del navegador a partir de `.env.local`; ese archivo
también está excluido de Git.
