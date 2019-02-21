import { clear, toClipboard, appendVideo, retry } from './utils.js'

function procesor(data) {
    clear()

    if (data == null) {
        retry()
        return
    }

    toClipboard(data[0])

    for (let e of data) {
        if (e.includes(".mp4")) appendVideo(e, true)
    }
}

export default procesor