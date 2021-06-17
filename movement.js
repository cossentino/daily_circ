
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const regexp = "/"

document.addEventListener('DOMContentLoaded', () => startTranslate())

let rotate = true

async function startTranslate(tx=0, ty=0) {
  let p = document.getElementById('test')
  while (rotate === true) {
    if (p.style.transform) {
      tx = parseInt(p.style.transform.match(/\d+/g)[0])
      ty = parseInt(p.style.transform.match(/\d+/g)[1])
    } else {
      tx = 1
      ty = 1
    }
    if (!p.style.transform) {
      p.style.transform = `translate(${tx}%, ${ty}%)`
    } else {
      tx += 1
      ty += 1
      p.style.transform = p.style.transform.replace(/(\d+)/, `${tx}`)
      p.style.transform = p.style.transform.replace(/(\d+)(%\))/, `${ty}$2`)
      // debugger
      await sleep(100)
    }
  }
}

function toggleTranslate() {
  rotate = !rotate
  if (rotate === true) {
    startTranslate()
  }
}