function getSelectedNode()
{
    if (document.selection)
	return document.selection.createRange().parentElement();
    else
    {
	var selection = window.getSelection();
	if (selection.rangeCount > 0)
	    return selection.getRangeAt(0).startContainer.parentNode;
    }
}

function selectDOMParent(info, tab){
    var sel = getSelectedNode();
    var parent = sel
    
    var range = document.createRange();
    range.selectNodeContents(parent);

    var s = window.getSelection()
    s.removeAllRanges();
    s.addRange(range);
}


function clickSend() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:9000', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  var s = window.getSelection()
  xhr.send(JSON.stringify({url:s.baseNode.baseURI, text:s.toString()}));

 xhr.onload = function () {
    if(this.status != 200){
        alert('Unable to send selection to Open R&D');
    }else{
        alert('Selection sent to Open R&D')
    }
  }
}


chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "selectDOMParent") {
        selectDOMParent();
    }else if (message.functiontoInvoke == "clickSend") {
        clickSend();
    }
});