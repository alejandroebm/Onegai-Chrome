(() => {
  let videos = [];
  document.querySelectorAll("video").forEach((info) => {
    videos.push({
      type: "video",
      video: {
        url: info.src,
        type: "video/mp4",
      },
    });
  });

  chrome.runtime.sendMessage({
    scrapingDone: true,
    data: videos,
  });
})();
