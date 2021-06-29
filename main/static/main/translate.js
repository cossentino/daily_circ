
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
    this.rotate = false
  }

  center() {
    return [this.centerX, this.centerY]
  }

  markCenter() {
    const container = document.getElementsByClassName('headlines-container')[0]
    const div2 = document.createElement('div')
    const svg = document.getElementById('center')
    svg.style.width = '15px'
    svg.style.height = '15px'
    svg.style.backgroundColor = 'red'
    svg.style.display='inline'
    // div2.style.backgroundColor = 'red'
    // div2.style.transform = `translate(${elemCenter(container)[0]}em, ${elemCenter(container)[1]}em)`
    svg.style.transform = `translate(${elemCenter(container)[0]}em, ${elemCenter(container)[1]}em)`
    // container.appendChild(div2)
  }


  // Place DOM elements on circle at a given theta, using standard unit circle
  // Ensure thetas and elements lists are same size; theta[i] corresponds to elements[i]
  addElementsByTheta(thetas, elements) {
    const container = document.getElementsByClassName('headlines-container')[0]
    for (let i = 0; i < thetas.length; i += 1) {
      const el = elements[i]
      const theta = thetas[i]
      el.style.transform = `translate(${elemCenter(container)[0] - elemCenter(el)[0] + this.radius * Math.cos(theta)}em, ${elemCenter(container)[1] - elemCenter(el)[1] - this.radius * Math.sin(theta)}em)`
      this.objects.push([el, theta])
    }
  }

  async rotateStart() {
    let theta = 0
    const container = document.getElementsByClassName('headlines-container')[0]
    const containerCenter = elemCenter(container)
    while (this.rotate === true) {
      for (let card of this.objects) {
        const newY = containerCenter[1] - this.radius * (Math.sin(theta + card[1])) - elemCenter(card[0])[1]
        const newX = containerCenter[0] + this.radius * (Math.cos(theta + card[1])) - elemCenter(card[0])[0]
        card[0].style.transform = `translate(${newX}em, ${newY}em)`
      }
      theta += Math.PI / 360
      await sleep(10)
    }
  }

  // p1 and p2 are 2-elem lists/tuples with x, y coords
  getThetaFromZero(p1) {
    return Math.atan(p1[1] / p1[0])
  }

  extractPointFromTransform(transformString) {
    let re = /[^\.1-9](\d+)/g
    let nums = [...transformString.matchAll(re, '$1')].map(n => parseInt(n[1]))
  }

}

function elemCenter(el) {
  const rect = el.getBoundingClientRect()
  return [(rect.width / 2) / 16, (rect.height / 2) / 16]
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('headlines-container')[0]
  const containerCenter = elemCenter(container)
  const circ = new Circle(30, containerCenter[0], containerCenter[1])
  circ.markCenter()
  const cards = document.getElementsByClassName('headline-card')
  circ.addElementsByTheta([Math.PI / 4, Math.PI / 2], cards)



  document.getElementById('start').addEventListener('click', () => {
    circ.rotate = true
    circ.rotateStart()
  })



  document.getElementById('stop').addEventListener('click', () => {
    circ.rotate = false
    // store current thetas here
  })
})




