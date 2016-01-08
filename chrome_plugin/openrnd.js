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


chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "selectDOMParent") {
        selectDOMParent();
    }
});