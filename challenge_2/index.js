const fs = require('fs')

function analyzeDocument(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    let totalSteps = 0
    let lastSteps = 0

    function calculateSteps(instructions) {
      let position = 0
      let steps = 0

      while (position >= 0 && position < instructions.length) {
        let jump = instructions[position]
        instructions[position]++
        position += jump
        steps++
      }

      return steps
    }

    // Procesar cada línea
    lines.forEach((line) => {
      let instructions = line.split(' ').map(Number)
      const stepsForLine = calculateSteps(instructions)
      totalSteps += stepsForLine
      lastSteps = stepsForLine
    })

    console.log(`submit ${totalSteps}-${lastSteps}`)
  } catch (error) {
    console.error('Error al leer el archivo:', error.message)
    process.exit(1)
  }
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Por favor, proporciona la ruta del archivo a analizar.')
  process.exit(1)
}

analyzeDocument(filePath)
