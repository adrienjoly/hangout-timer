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
      var img = document.getElementById("img");
      var ctx = img.getContext("2d");
      var x = 20, y = 20;
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 20);
      ctx.lineTo(x + 20, y + 20);
      ctx.moveTo(x + 20, y - 20);
      ctx.lineTo(x - 20, y + 20);
      ctx.stroke();
      console.log("ready", gapi.hangout);
      gapi.hangout.hideApp();
      //var overlay = gapi.hangout.av.effects.createOverlay();
      var imgRsc = gapi.hangout.av.effects.createImageResource(img.toDataUrl());
      imgRsc.showOverlay();
    }
  });
}

// Wait for gadget to load.                                                       
gadgets.util.registerOnLoadHandler(init);
