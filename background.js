// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.blacklist)
    {
      sendResponse(
        {
          blacklist: getBlacklist()
        });
      }
  }
);


function getBlacklist(){
  var blacklist = 
  {
    ".reddit.com":"This website has been disabled to raise awareness about CISPA. For more info, check out <a href='http://cyberspying.eff.org/'> the EFF </a>"
  };
  //might want to ask our webservice for a blacklist every day, and save that blacklist in localstorage.
  //Our "webservice" could be something simple, like a jekyll/node.js site that ONLY serves the static blacklist, and updates 
  //are done by hand.
  //Could also be a json file served by github. :)
  return blacklist;
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
