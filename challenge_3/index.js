const fs = require('fs')

function findSafeNodes(connections) {
  const graph = new Map()

  // Crear la lista de adyacencia
  connections.forEach(([a, b]) => {
    if (!graph.has(a)) graph.set(a, [])
    if (!graph.has(b)) graph.set(b, [])
    graph.get(a).push(b)
    graph.get(b).push(a)
  })

  const visited = new Set()
  const safeNodes = []

  function dfs(node, component) {
    visited.add(node)
    component.push(node)
    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component)
      }
    }
  }

  // Encontrar las componentes conexas
  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      const component = []
      dfs(node, component)
      if (component.length < 3) {
        safeNodes.push(...component)
      }
    }
  }

  return safeNodes.sort((a, b) => a - b) // Ordenar de forma ascendente
}

function analyzeDocument(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const connections = JSON.parse(content)
    const safeNodes = findSafeNodes(connections)
    console.log(`submit ${safeNodes.join(',')}`)
  } catch (error) {
    console.error('Error al leer el archivo:', error.message)
    process.exit(1)
  }
}

// Ruta del archivo
const filePath = process.argv[2]
if (!filePath) {
  console.error('Por favor, proporciona la ruta del archivo a analizar.')
  process.exit(1)
}

analyzeDocument(filePath)
