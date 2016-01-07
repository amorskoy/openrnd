// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));


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

// Create one test item for each context type.
var context = "selection"
var title = "Send to OpenRnD";
var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
console.log("'" + context + "' item:" + id);


