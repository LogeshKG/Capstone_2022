// import test from './content'



chrome.tabs.onUpdated.addListener( function() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { msg: "Button clicked"}, (response) => {
        if (response) {
          //Dummy
        }
  });
});
});

// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.update(tab.id, {
//       url: url
//   });
// });
