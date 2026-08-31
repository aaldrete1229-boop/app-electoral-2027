const { url, publishableKey } = window.SUPABASE_CONFIG ?? {}
const status = document.querySelector('#connection-status')
const indicator = document.querySelector('#connection-indicator')
const details = document.querySelector('#details')

function setStatus(state, message) {
  indicator.className = `indicator ${state}`
  status.textContent = message
}

async function countRows(table) {
  const response = await fetch(`${url}/rest/v1/${table}?select=id`, {
    method: 'HEAD',
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
      Prefer: 'count=exact',
      Range: '0-0',
    },
  })

  if (!response.ok) {
    throw new Error(`No se pudo consultar ${table} (HTTP ${response.status}).`)
  }

  const count = response.headers.get('content-range')?.match(/\/(\d+)$/)?.[1]
  if (!count) throw new Error(`Supabase no devolvió el recuento de ${table}.`)
  return count
}

async function checkConnection() {
  if (!url || !publishableKey) {
    setStatus('error', 'Falta la configuración local de Supabase.')
    return
  }

  try {
    const [casillas, resultados] = await Promise.all([
      countRows('casillas'),
      countRows('resultados'),
    ])
    document.querySelector('#casillas-count').textContent = casillas
    document.querySelector('#resultados-count').textContent = resultados
    setStatus('success', 'Conexión establecida con Supabase.')
    details.textContent = 'Los recuentos se obtuvieron sin descargar registros.'
  } catch (error) {
    setStatus('error', 'No fue posible conectar con Supabase.')
    details.textContent = error instanceof Error ? error.message : 'Error de conexión desconocido.'
  }
}

checkConnection()
