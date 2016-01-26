function clickSend() {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "clickSend"
        });
    });

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
chrome.contextMenus.create({"title": "Send to OpenRnD (Alt+Shift+O)", "contexts":[context],
                                       "onclick": clickSend});

chrome.contextMenus.create({"title": "Select DOM parent (Alt+Shift+Up)", "contexts":[context],
                                       "onclick": selectByCS});


chrome.commands.onCommand.addListener(function(command) {
    switch(command){
        case "select-parent":
            selectByCS()
            break;
        case "send-openrnd":
            clickSend()
            break;

        default:
            break;
    }
});

