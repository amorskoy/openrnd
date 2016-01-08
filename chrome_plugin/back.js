// A generic onclick callback function.
function genericOnClick(info, tab) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:9000', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send(JSON.stringify({url:info.pageUrl, text:info.selectionText}));

 xhr.onload = function () {
    if(this.status != 200){
        alert('Unable to send selection to Open R&D');
    }
  }
}


function selectByCS(){
    //Add all you functional Logic here
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "selectDOMParent"
        });
    });
}

// Create one test item for each context type.
var context = "selection"
var title = "Send to OpenRnD";
chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});

chrome.contextMenus.create({"title": "Select DOM parent", "contexts":[context],
                                       "onclick": selectByCS});


