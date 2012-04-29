// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SHOULD_LIMIT_REQUEST_FREQUENCY=true;
var self=this;
self.blacklist=undefined;

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

function getBlacklist(callback){

  if(self.blacklist)
  {
    callback(self.blacklist);
    return;
  }
  $.ajax({
    url: "http://ssebro.github.com/lobby-together/blacklist.json",
success: function(data) 
      { 
        callback(data);
        if(SHOULD_LIMIT_REQUEST_FREQUENCY)
        {
          //essentially rate-limiting these requests, so we only do 1 every 10 hours
          self.blacklist=data;
          setTimeout(function(){
            self.blacklist=undefined;
          },600000);
        }
      }
  });
}

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  if(self.blacklist)
  {
    //This should really check for whether or not the url is blacklisted, but that doesn't matter for now.

    // if (tab.url.indexOf('reddit.com') > -1) {
    //   // ... show the page action.
    //   chrome.pageAction.show(tabId);
    // }
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
