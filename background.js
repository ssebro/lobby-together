// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SHOULD_LIMIT_REQUESTS=true;
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.blacklist)
    {
      getBlacklist(function(blacklist)
      {
        sendResponse(
          {
            blacklist: blacklist
          });
      });
    }
  }
);

var self=this;
function getBlacklist(callback){

  if(self.blacklist)
    callback(self.blacklist);

  $.ajax({
    url: "http://ssebro.github.com/lobby-together/blacklist.json",
success: function(data) 
      { 
        callback(data);
        if(SHOULD_LIMIT_REQUESTS)
        {
          //essentially rate-limiting these requests.
          self.blacklist=data;
          setTimeout(function(){
            self.blacklist=undefined;
          },60000000);
        }
      }
  });
  //might want to ask our webservice for a blacklist every day, and save that blacklist in localstorage, since the current approach is ... costly.
}
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  console.log(tab);
  console.log(changeInfo);

  if (tab.url.indexOf('reddit.com') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
