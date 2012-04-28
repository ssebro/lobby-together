//Ask background.js for blacklist then see if this url is ok or not.
chrome.extension.sendRequest({blacklist: true}, function(response) {
  var blacklist = response.blacklist;
  var blacklistKeys = Object.keys(blacklist);

  function urlIsBlacklisted(url){
    for(var i=0;i<blacklistKeys.length;i++)
    {
      if(url.indexOf(blacklistKeys[i]) !=-1)
      {
        return blacklistKeys[i];
      }
    }
    return false;
  }
  var key;
  if(key = urlIsBlacklisted(window.location.href,blacklist))
  {
    $("html").html(blacklist[key]);
    //might also want to ping an analytics site everytime we block someone, so there's a counter of the "voices" asking the company to participate. (This is really just the damage from each blacklist)
  }

});