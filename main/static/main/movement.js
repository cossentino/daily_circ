
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// document.addEventListener('DOMContentLoaded', () => startTranslate())

let rotate = true

async function startTranslate(tx=0, ty=0) {
  let box = document.getElementsByClassName('headline-card')[0]
  while (rotate === true) {
    if (box.style.transform) {
      tx = parseInt(box.style.transform.match(/\d+/g)[0])
      ty = parseInt(box.style.transform.match(/\d+/g)[1])
    } else if (!box.style.transform) {
      box.style.transform = `translate(${tx}%, ${ty}%)`
    } else {
      tx += 1
      ty += 1
      box.style.transform = box.style.transform.replace(/(\d+)/, `${tx}`)
      box.style.transform = box.style.transform.replace(/(\d+)(%\))/, `${ty}$2`)
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