const fs = require('fs')
function isValidKey(key) {
  let hasLetters = false

  for (let i = 0; i < key.length; i++) {
    const char = key[i]

    // Sólo se permiten letras minúsculas y dígitos
    if (!/[a-z0-9]/.test(char)) {
      return false
    }

    // Si aparece una letra, los caracteres posteriores deben ser solo letras
    if (/[a-z]/.test(char)) {
      hasLetters = true
    } else if (hasLetters && /\d/.test(char)) {
      return false
    }

    // Si hay dígitos, deben ser iguales o crecientes
    if (i > 0 && /\d/.test(key[i - 1]) && /\d/.test(char)) {
      if (key[i] < key[i - 1]) {
        return false
      }
    }

    // Si hay letras, deben estar en orden alfabético igual o creciente
    if (i > 0 && /[a-z]/.test(key[i - 1]) && /[a-z]/.test(char)) {
      if (key[i] < key[i - 1]) {
        return false
      }
    }
  }

  return true
}

function analyzeDocument(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const keys = content.split('\n')

    let validCount = 0
    let invalidCount = 0

    keys.forEach((key, index) => {
      key = key.trim()
      if (key) {
        const isValid = isValidKey(key)
        if (isValid) {
          validCount++
        } else {
          invalidCount++
        }
        console.log(
          `Clave ${index + 1}: ${key} - ${isValid ? 'Válida' : 'Inválida'}`
        )
      }
    })

    console.log(`\nResumen:`)
    console.log(`Claves válidas: ${validCount}`)
    console.log(`Claves inválidas: ${invalidCount}`)
    console.log(`\nsubmit ${validCount}true${invalidCount}false`)
  } catch (error) {
    console.error('Error al leer el archivo:', error.message)
  }
}

// Ejecución del programa principal
const filePath = process.argv[2]
if (!filePath) {
  console.error('Por favor, proporciona la ruta del archivo a analizar.')
  process.exit(1)
}

analyzeDocument(filePath)
