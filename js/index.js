const bodyDiv = document.createElement('div')
bodyDiv.setAttribute('id', 'bodyDiv')
document.body.appendChild(bodyDiv)

const Paint = {}

Paint.colors = ['red', 'green', 'blue', 'yellow', 'black']

Paint.start = () => {
  Paint.generateColorPallet()
  Paint.generateCanvas()
  Paint.generateColorsList()
  Paint.generateColors()
  Paint.showCurrentColor()
  Paint.penSize()
  Paint.draw()
}
Paint.generateColorPallet = () => {
  Paint.colorPallet = document.createElement('div')
  Paint.colorPallet.setAttribute('id', 'colorPallet')
  bodyDiv.appendChild(Paint.colorPallet)
}

Paint.generateCanvas = () => {
  Paint.canvas = document.createElement('div')
  Paint.canvas.setAttribute('id', 'canvas')
  bodyDiv.appendChild(Paint.canvas)
  Paint.setCanvasHeight()
  Paint.setCanvasWidth()
  Paint.canvas.style.height = Paint.height + 'px'
  Paint.canvas.style.width = Paint.width + 'px'
}

Paint.generateColorsList = () => {
  Paint.colorsList = document.createElement('ul')
  Paint.colorsList.setAttribute('id', 'colorsList')
  Paint.colorPallet.appendChild(Paint.colorsList)
}

Paint.generateColors = () => {
  for (i = 0; i < Paint.colors.length; i++) {
    Paint.color = document.createElement('li')
    Paint.color.setAttribute('id', Paint.colors[i])
    Paint.colorsList.appendChild(Paint.color)
  }
}

Paint.showCurrentColor = () => {
  Paint.currentColorDiv = document.createElement('div')
  Paint.currentColorDiv.setAttribute('id', 'currentColorDiv')
  Paint.colorPallet.appendChild(Paint.currentColorDiv)
  document.getElementById('black').classList.add('selected')
  Paint.colorsList.addEventListener('click', (e) => {
    if (Paint.selectedColor !== undefined) {
      document.getElementById(Paint.selectedColor).classList.remove('selected')
    }
    const clickedColor = e.target
    Paint.selectedColor = clickedColor.id
    clickedColor.classList.add('selected')
    Paint.currentColorDiv.style.backgroundColor = document.getElementsByClassName('selected')[0].id
  })
}

Paint.draw = () => {
  Paint.canvas.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) {
      const x = e.clientX
      const y = e.clientY
      let color = ''
      if (Paint.currentColorDiv.style.backgroundColor === '') {
        color = 'black'
      } else {
        color = Paint.currentColorDiv.style.backgroundColor
      }
      Paint.colorCanvas(x, y, color)
    }
  })
  Paint.canvas.addEventListener('click', (e) => {
    const x = e.clientX
    const y = e.clientY
    let color = ''
    if (Paint.currentColorDiv.style.backgroundColor === '') {
      color = 'black'
    } else {
      color = Paint.currentColorDiv.style.backgroundColor
    }
    Paint.colorCanvas(x, y, color)
  })
}

Paint.colorCanvas = (x, y, color) => {
  Paint.clickedArea = document.createElement('div')
  bodyDiv.appendChild(Paint.clickedArea)
  Paint.clickedArea.style.position = 'absolute'
  Paint.clickedArea.style.left = x + 'px'
  Paint.clickedArea.style.top = y + 'px'
  Paint.clickedArea.style.height = Paint.penSize + 'px'
  Paint.clickedArea.style.width = Paint.penSize + 'px'
  Paint.clickedArea.style.backgroundColor = color
  Paint.clickedArea.style.borderRadius = '50%'
}

Paint.penSize = () => {
  const userInput = document.createElement('input')
  userInput.setAttribute('type', 'number')
  userInput.setAttribute('id', 'userInput')
  userInput.value = 10

  const inputLabel = document.createElement('label')
  inputLabel.setAttribute('for', 'userInput')
  inputLabel.innerHTML = 'Pen Size: '

  Paint.colorPallet.appendChild(inputLabel)
  Paint.colorPallet.appendChild(userInput)

  Paint.penSize = parseInt(userInput.value)
  userInput.addEventListener('change', () => {
    Paint.penSize = parseInt(userInput.value)
  })

  return Paint.penSize
}

Paint.setCanvasHeight = () => {
  const setCanvasHeight = document.createElement('input')
  setCanvasHeight.setAttribute('type', 'number')
  setCanvasHeight.setAttribute('id', 'setCanvasHeight')
  setCanvasHeight.value = 500
  const heightLabel = document.createElement('label')
  heightLabel.setAttribute('for', 'setCanvasHeight')
  heightLabel.innerHTML = 'Set Height: '

  Paint.colorPallet.appendChild(heightLabel)
  Paint.colorPallet.appendChild(setCanvasHeight)
  Paint.height = parseInt(setCanvasHeight.value)
  setCanvasHeight.addEventListener('change', () => {
    Paint.height = parseInt(setCanvasHeight.value)
    Paint.canvas.style.height = Paint.height + 'px'
  })
}
Paint.setCanvasWidth = () => {
  const setCanvasWidth = document.createElement('input')
  setCanvasWidth.setAttribute('type', 'number')
  setCanvasWidth.setAttribute('id', 'setCanvasWidth')
  setCanvasWidth.value = 500
  const widthLabel = document.createElement('label')
  widthLabel.setAttribute('for', 'setCanvasWidth')
  widthLabel.innerHTML = 'Set Width: '

  Paint.colorPallet.appendChild(widthLabel)
  Paint.colorPallet.appendChild(setCanvasWidth)

  Paint.width = parseInt(setCanvasWidth.value)
  setCanvasWidth.addEventListener('change', () => {
    Paint.width = parseInt(setCanvasWidth.value)
    Paint.canvas.style.width = Paint.width + 'px'
  })
}

Paint.start()
