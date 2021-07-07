
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

}

function elemCenter(el) {
  const rect = el.getBoundingClientRect()
  return [(rect.width / 2) / 16, (rect.height / 2) / 16]
}

function toggleCardMask() {
  const masks = document.getElementsByClassName('card-mask')
  for (mask of masks) {
    if (!mask.style.display || mask.style.display === "none") {
      mask.style.display = "flex"
    } else {
      mask.style.display = "none"
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('headlines-container')[0]
  const containerCenter = elemCenter(container)
  const circ = new Circle(25, containerCenter[0], containerCenter[1])
  const cards = document.getElementsByClassName('headline-card')
  circ.addElementsByTheta([Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4], cards)


  document.getElementById('start').addEventListener('click', () => {
    circ.rotate = true
    circ.rotateStart()
    toggleCardMask()
  })

  document.getElementById('stop').addEventListener('click', () => {
    circ.rotate = false
    toggleCardMask()
    // store current thetas here
  })

})




