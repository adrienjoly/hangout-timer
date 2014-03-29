//onStateChanged.add(callback);

/*
function showParticipants() {
  var participants = gapi.hangout.getParticipants();

  var retVal = '<p>Participants: </p><ul>';

  for (var index in participants) {
    var participant = participants[index];

    if (!participant.person) {
      retVal += '<li>A participant not running this app</li>';
    }
    retVal += '<li>' + participant.person.displayName + '</li>';
  }

  retVal += '</ul>';

  var div = document.getElementById('participantsDiv');

  div.innerHTML = retVal;
}
*/
function init() {
  // When API is ready...                                                         
  gapi.hangout.onApiReady.add(function(eventObj) {
    if (eventObj.isApiReady) {
      console.log("ready");
      document.getElementById('showParticipants').style.visibility = 'visible';
      var overlay = gapi.hangout.av.effects.createOverlay();
      gapi.hangout.hideApp();
    }
  });
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
