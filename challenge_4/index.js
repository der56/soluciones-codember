const nodes = [
  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 71, 72,
  73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 155, 156, 157,
  158, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 195, 196,
]

// Función para comprobar si un número es primo
function esPrimo(num) {
  if (num < 2) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

// Función para calcular la suma de los dígitos de un número
function sumaDigitos(num) {
  return num
    .toString()
    .split('')
    .reduce((suma, digito) => suma + Number(digito), 0)
}

// Filtrar los números que son primos y cuya suma de dígitos también es primo
const nodesPrimosYSumaPrimos = nodes.filter(
  (num) => esPrimo(num) && esPrimo(sumaDigitos(num))
)

console.log(nodesPrimosYSumaPrimos)
