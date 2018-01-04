//Global variables
var videosSize;
var currentVideo;
var paused;
// Useful functions
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}
///////////////////
// Chrome listener
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getMeTheFuckingVideos") {
    //Check if we get videos 
    if(request.source){
      cleanBody();
      currentVideo = '#01';
      paused = true;
      copyTextToClipboard(request.source[0]);      
      for(var video in request.source){        
        appendVideoToBody(video+1,request.source[video],false);
      }
    }else tryAgainAnimation();
  }else tryAgainAnimation();
});

function appendVideoToBody(id,source, autoplay){
  var v = document.createElement('video');
  v.id = id;
  v.src = source;
  v.type = 'video/mp4';
  v.width = videosSize;
  v.controls = false;
  v.autoplay = autoplay;
  v.loop = autoplay;
  v.volume = 0;
  document.body.appendChild(v);
};

function cleanBody(){
  if ($('video').length){
    currentVideo = "#0";
    $('video').get(0).pause();
    $('video').remove();    
  }
};

function tryAgainAnimation(){
  cleanBody();
  if(Math.round(Math.random())){
    appendVideoToBody(0,'content/nothing1.mp4',true);
  } else{
    appendVideoToBody(0,'content/nothing2.mp4',true);
  }  
};

function lookingAnimation(){
  cleanBody();
  if(Math.round(Math.random())){
    appendVideoToBody(0,'content/lookingfor1.mp4',true);
  } else{
    appendVideoToBody(0,'content/lookingfor2.mp4',true);
  }  
};

//TODO: Check page and more sites
function lookforvideos(){
  //Injecting Script
  chrome.tabs.executeScript(null, {
    file: "getMeTheFuckingVideos.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) tryAgainAnimation();
  });
};

// Key functions
document.addEventListener('keydown', function(event) {
    //R reload tab
  if (event.keyCode == 82) {
      chrome.tabs.executeScript(null, {code: 'location.reload();'} ,function(){if (chrome.runtime.lastError) tryAgainAnimation();});      
  } //Space toggle play
  else if (event.keyCode == 32) {
    if ($(currentVideo).length){
      if (paused) $(currentVideo).get(0).play();
      else $(currentVideo).get(0).pause();
      paused = !paused;
    }
  }
}, true);

function onWindowLoad() {
  videosSize = "240";
  currentVideo = "#0";
  paused = false;
  lookingAnimation(); 
  lookforvideos();
};

window.onload = onWindowLoad;