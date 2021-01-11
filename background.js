'use strict';

function sendQuery() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0].url != null) {
      let urlLowerCase = tabs[0].url.toLowerCase();
      if (urlLowerCase.includes("twitter.com/realdonaldtrump/status/")) {
        // Re-direct to tweet picture
        let tweetId = urlLowerCase.split("twitter.com/realdonaldtrump/status/")[1].split("?")[0];
        let newUrl = "https://raw.githubusercontent.com/TrumpTweetViewer/trump-tweet-images/master/img/"+tweetId+".jpg";
        chrome.tabs.update({url: newUrl});
      } else if (urlLowerCase.includes("twitter.com/realdonaldtrump")) {
        // Re-direct to tweet database
        chrome.tabs.update({url: "https://factba.se/topic/twitter"});
      }
    }
  }); 
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
  sendQuery();
});

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  sendQuery();
});