const clearVideos = () => {
  const body = document.body;
  while (body.firstChild) {
    body.removeChild(body.lastChild);
  }
};

const tryAgainVideo = () => {
  clear();
  let videoElement = getMediaElement({
    type: "video",
    data: {
      url: "./assets/nothing.webm",
      tye: "video/webm",
      loop: true,
      controls: false,
      autoplay: true,
    },
    copyOnClick: false,
  });
  document.body.appendChild(videoElement);
};

const getMediaElement = ({ type, data, copyOnClick = true }) => {
  let mediaElement = Object.assign(document.createElement(type), {
    src: data.url,
    type: data.type,
    controls: "controls" in data ? data.controls : true,
    loop: "loop" in data ? data.loop : false,
    autoplay: "autoplay" in data ? data.autoplay : false,
  });
  if (copyOnClick) {
    mediaElement.addEventListener("click", (e) =>
      navigator.clipboard.writeText(e.target.src)
    );
  }
  return mediaElement;
};

const showData = (data) => {
  clearVideos();

  if (data == null) {
    tryAgainVideo();
    return;
  }

  for (let info of data) {
    let content = null;
    switch (info.type) {
      case "both":
        let audioElement = getMediaElement({
          type: "audio",
          data: info.audio,
          copyOnclick: false,
        });
        let videoElement = getMediaElement({ type: "video", data: info.video });
        videoElement.onplay = () => audioElement.play();
        videoElement.onpause = () => audioElement.pause();
        videoElement.onseeking = () =>
          (audioElement.currentTime = videoElement.currentTime);
        videoElement.appendChild(audioElement);
        content = videoElement;
        break;
      case "video":
        content = getMediaElement({ type: "video", data: info.video });
        break;
      case "audio":
        content = getMediaElement({ type: "audio", data: info.audio });
        break;
    }
    if (content) document.body.appendChild(content);
  }
};

export { clearVideos, tryAgainVideo, showData };
