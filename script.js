let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let ResetScreen = false

const numberB = document.querySelectorAll('[number]')
const operatorB = document.querySelectorAll('[operator]')
const equalsB = document.getElementById('equalsBtn')
const clearB = document.getElementById('clearBtn')
const deleteB = document.getElementById('deleteBtn')
const pointB = document.getElementById('pointBtn')
const firstScreen = document.getElementById('firstScreen')
const secondScreen = document.getElementById('secondScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsB.addEventListener('click', evaluate)
clearB.addEventListener('click', clear)
deleteB.addEventListener('click', deleteNumber)
pointB.addEventListener('click', addPoint)

numberB.forEach((button) =>
  button.addEventListener('click', () => addNumber(button.textContent))
)

operatorB.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function addNumber(number) {
  if (secondScreen.textContent === '0' || ResetScreen)
    resetScreen()
  secondScreen.textContent += number
}

function resetScreen() {
  secondScreen.textContent = ''
  ResetScreen = false
}

function clear() {
  secondScreen.textContent = '0'
  firstScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}


function addPoint() {
  if (ResetScreen) resetScreen()
  if (secondScreen.textContent === '')
    secondScreen.textContent = '0'
  if (secondScreen.textContent.includes('.')) return
  secondScreen.textContent += '.'
}

function deleteNumber() {
 secondScreen.textContent = secondScreen.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = secondScreen.textContent
  currentOperation = operator
  firstScreen.textContent = `${firstOperand} ${currentOperation}`
  ResetScreen = true
}

function evaluate() {
  if (currentOperation === null || ResetScreen) return
  if (currentOperation === '÷' && secondScreen.textContent === '0') {
    alert("La division par 0 est impossible!")
    return
  }

  secondOperand = secondScreen.textContent
  secondScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )


   firstScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}


function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) addNumber(e.key)
  if (e.key === '.') addPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}