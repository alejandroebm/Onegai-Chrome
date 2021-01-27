import { showData, tryAgainVideo } from "./lib/utils.js";

const SITE_SCRIPT_PATH = {
  "www.facebook.com": "./sites/facebook.js",
  "www.instagram.com": "./sites/instagram.js",
  "www.tiktok.com": "./sites/tiktok.js",
};

chrome.runtime.onMessage.addListener(function (request) {
  if (request.scrapingDone) showData(request.data);
});

function extractor(url) {
  let siteScriptPath = SITE_SCRIPT_PATH[url.match(/(?<=\/\/)(.*?)(?=\/)/g)];
  if (siteScriptPath) {
    chrome.tabs.executeScript(
      null,
      {
        file: siteScriptPath,
      },
      function (e) {
        if (e == undefined) retry();
      }
    );
  } else tryAgainVideo();
}

window.onload = chrome.tabs.query(
  { active: true, currentWindow: true },
  function (tabs) {
    extractor(tabs[0].url);
  }
);
