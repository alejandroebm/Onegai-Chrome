(() => {
  let videos = [];
  let source = document.getElementsByTagName("html")[0].innerHTML;
  let data = source.match(/(?<="prefetch_dash_segments":)(.+?)(?=,"is_final)/g);
  if (data == null) return [];

  data = JSON.parse(data[0]);

  for (let info of data) {
    videos.push({
      type: "both",
      video: {
        url: info.video[1].url,
        type: info.video[1].mime_codec.split(";")[0],
      },
      audio: {
        url: info.audio[0].url,
        type: info.audio[0].mime_codec.split(";")[0],
      },
    });
  }

  chrome.runtime.sendMessage({
    scrapingDone: true,
    data: videos,
  });
})();
