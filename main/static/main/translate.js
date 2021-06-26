
// x and y are coordinates relative to the center of the circle. To test, center of circle is center of viewport


class Circle {

  constructor(radius) {
    this.radius = radius
  }

  center() {
    return [centerX, centerY]
  }


  markCenter() {
    const container = document.getElementsByClassName('headlines-container')[0]
    const centerArray = containerCenter()
    const div2 = document.createElement('div')
    div2.style.width = '5px'
    div2.style.height = '5px'
    div2.style.backgroundColor = 'red'
    div2.style.transform = `translate(${centerArray[0]}px, ${centerArray[1]}px)`
    container.appendChild(div2)
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function containerCenter() {
  const myDiv = document.getElementsByClassName('headlines-container')[0]
  return elemCenter(myDiv)
}

function elemCenter(el) {
  const rect = el.getBoundingClientRect()
  return [rect.width / 2, rect.height / 2]
}

function positionCardCenter() {
  const card = document.getElementsByClassName('headline-card')[0]
  const center = containerCenter()
  const circ = new Circle(400)
  card.style.transform = `translate(${center[0] + circ.radius - elemCenter(card)[0]}px, ${center[1] - elemCenter(card)[1]}px)`
}


async function changePosition() {
  const circ = new Circle(400)
  const card = document.getElementsByClassName('headline-card')[0]
  for (let theta=0; theta < 2 * Math.PI; theta += Math.PI / 360) {
    newY = containerCenter()[1] - circ.radius * (Math.sin(theta)) - elemCenter(card)[1]
    newX = containerCenter()[0] + circ.radius * (Math.cos(theta)) - elemCenter(card)[0]
    card.style.transform = `translate(${newX}px, ${newY}px)`
    await sleep(10)
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const circ = new Circle(400)
  circ.markCenter()
  positionCardCenter()
  const card = document.getElementsByClassName('headline-card')[0]
  card.addEventListener('click', () => {
    changePosition()
})
})




