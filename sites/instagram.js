(() => {
  let videos = [];
  let data = [];

  if (document.URL.includes("/stories/")) {
    document
      .querySelectorAll("video")
      .forEach((video) => data.push(video.currentSrc));
  } else {
    let source = document.getElementsByTagName("html")[0].innerHTML;
    data = source.match(/(?<=video_url":").+?[^"]+/g);
    if (data == null) return [];

    data = data.map((url) => {
      return url.replace(/\\u0026/g, "&");
    });
  }

  for (let url of data) {
    videos.push({
      type: "video",
      video: {
        url: url,
        type: "video/mp4",
      },
    });
  }

  chrome.runtime.sendMessage({
    scrapingDone: true,
    data: videos,
  });
})();
