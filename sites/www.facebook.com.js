function extract() {
    let videos = [],
        data = getSource().match(/videoData:\[(.*?)(?=,hd_tag)/g)

    if (data == null) return null

    for (let d of data) {
        if (d != null)
            videos.push(getVideo(d))
    }

    return videos

    function getVideo(d) {
        let o = null
        o = (/(?<=hd_src_no_ratelimit:")https[^"]+(?=")/).exec(d)
        if (o) return String(o)
        o = (/(?<=hd_src:")https[^"]+(?=")/).exec(d)
        if (o) return String(o)
        o = (/(?<=sd_src_no_ratelimit:")https[^"]+(?=")/).exec(d)
        if (o) return String(o)
        o = (/(?<=sd_src:")https[^"]+(?=")/).exec(d)
        if (o) return String(o)
        return null
    }

    function getSource() {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", document.URL, false)
        xmlHttp.send(null)
        return xmlHttp.responseText
    }
}

chrome.runtime.sendMessage({
    action: "data",
    source: extract()
})