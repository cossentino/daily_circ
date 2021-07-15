
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('headlines-container')[0]
  const containerCenter = elemCenter(container)
  const circ = new Circle(15, containerCenter[0], containerCenter[1])
  const cards = document.getElementsByClassName('headline-card')
  circ.add(cards)


  document.getElementById('start').addEventListener('click', () => {
    circ.rotateOn = true
    circ.rotate()
    toggleCardMask(circ)
  })

  document.getElementById('stop').addEventListener('click', () => {
    circ.rotateOn = false
    toggleCardMask(circ, false)
  })

})

function toggleCardMask(circ, start=true) {
  const masks = document.getElementsByClassName('card-mask')
  for (mask of masks) {
    if (start === true) {
      mask.style.display = "flex"
    }
  }
  if (start === false) {
    const el = circ.getTopmostElement()
    const mask = el.querySelector('div.card-mask')
    mask.style.display = "none"
  }

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function elemCenter(el) {
  const rect = el.getBoundingClientRect()
  return [(rect.width / 2) / 16, (rect.height / 2) / 16]
}

class Circle {

  constructor(radius, centerX = null, centerY = null) {
    this.radius = radius
    this.centerX = centerX
    this.centerY = centerY
    this.objects = []
    this.rotateOn = false
  }

  center() {
    return [this.centerX, this.centerY]
  }

  // Place DOM elements on circle at a given theta, using standard unit circle
  // Ensure thetas and elements lists are same size; theta[i] corresponds to elements[i]
  add(elements) {
    const container = document.getElementsByClassName('headlines-container')[0]
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i]
      const theta = (2 * Math.PI / elements.length) * i
      el.style.transform = `translate(${elemCenter(container)[0] - elemCenter(el)[0] + this.radius * Math.cos(theta)}em, ${elemCenter(container)[1] - elemCenter(el)[1] - this.radius * Math.sin(theta)}em)`
      this.objects.push([el, theta])
    }
  }

  myTheta(localTheta, globalTheta) {
    return localTheta + globalTheta
  }

  // All objects on the circle stored in objects property in form [dom_element, theta]. On 5ms delay, theta is increased by 1 radian
  // until circle's rotate property is turned off. 
  async rotate() {
    let globalTheta = 0
    const container = document.getElementsByClassName('headlines-container')[0]
    const containerCenter = elemCenter(container)
    while (this.rotateOn === true) {
      for (let card of this.objects) {
        const newY = containerCenter[1] - this.radius * (Math.sin(this.myTheta(card[1], globalTheta))) - elemCenter(card[0])[1]
        const newX = containerCenter[0] + this.radius * (Math.cos(this.myTheta(card[1], globalTheta))) - elemCenter(card[0])[0]
        card[0].style.transform = `translate(${newX}em, ${newY}em)`
      }
      globalTheta += Math.PI / 360
      await sleep(5)
    }
    // Store current theta as starting point for future rotation
    this.objects = this.objects.map(el => [el[0], this.myTheta(el[1], globalTheta)])
  }

  // Returns closest element to top of circle. This element will be the only one uncovered
  // when wheel stops
  getTopmostElement() {

    // Map this.objects to array of 2-tuples containing element and absolute distance from pi/2 rads
    const distancesFromTop = this.objects.map(el => {
      return [el[0], Math.abs((Math.PI / 2) - (el[1] % (2 * Math.PI)))]
    })
    
    // Sort array by distances from top and return first element
    distancesFromTop.sort((a,b) => a[1] - b[1])
    return distancesFromTop[0][0]
  }

}

