
// x and y are coordinates relative to the center of the circle. To test, center of circle is center of viewport


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Circle {

  constructor(radius, centerX = null, centerY = null) {
    this.radius = radius
    this.centerX = centerX
    this.centerY = centerY
    this.objects = []
  }

  center() {
    return [this.centerX, this.centerY]
  }

  markCenter() {
    const container = document.getElementsByClassName('headlines-container')[0]
    const centerArray = this.center()
    const div2 = document.createElement('div')
    div2.style.width = '5px'
    div2.style.height = '5px'
    div2.style.backgroundColor = 'red'
    div2.style.transform = `translate(${centerArray[0]}px, ${centerArray[1]}px)`
    container.appendChild(div2)
  }


  // Place DOM elements on circle at a given theta, using standard unit circle
  // Ensure thetas and elements lists are same size; theta[i] corresponds to elements[i]
  addElementsByTheta(thetas, elements) {
    for (let i = 0; i < thetas.length; i += 1) {
      const el = elements[i]
      const theta = thetas[i]
      el.style.transform = `translate(${this.center()[0] - elemCenter(el)[0] + this.radius * Math.cos(theta)}px, ${this.center()[1] - elemCenter(el)[1] - this.radius * Math.sin(theta)}px)`
      this.objects.push([el, theta])
    }
  }

  async changePosition() {
    for (let theta=0; theta < 2 * Math.PI; theta += Math.PI / 360) {
      for (let card of this.objects) {
        const newY = this.center()[1] - this.radius * (Math.sin(theta + card[1])) - elemCenter(card[0])[1]
        const newX = this.center()[0] + this.radius * (Math.cos(theta + card[1])) - elemCenter(card[0])[0]
        card[0].style.transform = `translate(${newX}px, ${newY}px)`
      }
      await sleep(10)
    }
  }

}



function containerCenter() {
  const myDiv = document.getElementsByClassName('headlines-container')[0]
  return elemCenter(myDiv)
}

function elemCenter(el) {
  const rect = el.getBoundingClientRect()
  return [rect.width / 2, rect.height / 2]
}




document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('headlines-container')[0]
  const containerCenter = elemCenter(container)
  const circ = new Circle(400, containerCenter[0], containerCenter[1])
  circ.markCenter()
  const card1 = document.getElementsByClassName('headline-card')[0]
  const card2 = document.getElementsByClassName('headline-card')[1]
  circ.addElementsByTheta([Math.PI / 4, Math.PI / 2], [card1, card2])
  container.addEventListener('click', () => circ.changePosition())
})




