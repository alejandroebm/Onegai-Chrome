import procesor from './procesor.js'
import { retry } from './utils.js'

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "data")
        procesor(request.source)
});

function extractor(url) {
    let site = url.match(/(?<=\/\/)(.*?)(?=\/)/g)
    chrome.tabs.executeScript(null, {
        file: `./sites/${site}.js`
    }, function (e) {
        if (e == undefined) retry()
    })
}

window.onload = chrome.tabs.query(
    { 'active': true, 'currentWindow': true },
    function (tabs) { extractor(tabs[0].url) }
)