function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;        
    }
    var regvideos = /(\[{ad_client_token:null,)(.*?)(videoData)(.*?)(,hd_tag)/g, m='', videos=[];
    do{
        videoData = regvideos.exec(html);
        videos.push(getVideo(videoData));        
    }while(videoData);
    videos = videos.filter(val => typeof val != 'object');
    if(videos.length > 0) return videos; 
    else return false;
}

chrome.runtime.sendMessage({
    action: "getMeTheFuckingVideos",
    source: DOMtoString(document)
});

function getVideo(html){
    var regexhdnl = new RegExp('(?<=hd_src_no_ratelimit:")https[^"]+\.mp4\?[^"]+(?=")');
    var output = regexhdnl.exec(html);
    if (output) return String(output);
    var regexhd = new RegExp('(?<=hd_src:")https[^"]+\.mp4\?[^"]+(?=")');
    var output = regexhd.exec(html);
    if (output) return String(output);
    
    var regexsdnl = new RegExp('(?<=sd_src_no_ratelimit:")https[^"]+\.mp4\?[^"]+(?=")');
    var output = regexsdnl.exec(html);
    if (output) return String(output);
    var regexsd = new RegExp('(?<=sd_src:")https[^"]+\.mp4\?[^"]+(?=")');
    var output = regexsd.exec(html);
    if (output) return String(output);
    return [];
};
