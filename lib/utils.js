NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function toClipboard(text) {
    let textArea = document.createElement("textarea")
    textArea.style.position = 'fixed'
    textArea.style.top = 0
    textArea.style.left = 0
    textArea.style.width = '2em'
    textArea.style.height = '2em'
    textArea.style.padding = 0
    textArea.style.border = 'none'
    textArea.style.outline = 'none'
    textArea.style.boxShadow = 'none'
    textArea.style.background = 'transparent'
    textArea.value = text
    document.body.appendChild(textArea)

    textArea.select()

    try {
        document.execCommand('copy')
    } catch (err) {
        console.log('Oops, unable to copy')
    }

    document.body.removeChild(textArea)
}

function appendVideo(source, copy = false) {
    let v = document.createElement('video')
    v.src = source
    v.type = 'video/mp4'
    v.width = 240
    v.controls = false
    v.autoplay = !copy
    v.loop = !copy
    v.volume = 0
    if (copy) {
        v.classList.add("found")
        v.addEventListener('click', function () { toClipboard(source) })
    }
    document.body.appendChild(v)
}

function retry() {
    clear()
    appendVideo('./assets/nothing.webm')
}

function clear() {
    document.getElementsByTagName("video").remove()
}

export { clear, toClipboard, appendVideo, retry }
