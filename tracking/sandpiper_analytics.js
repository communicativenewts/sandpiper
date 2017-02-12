document.addEventListener("DOMContentLoaded", function(event) {
  var siteId = window.sandpiperid;

// ************************************************

  //sends events by type to endpoint
  var sandpiperMetrics = {}
  var event;
  var request;
  var eventType;

  //set Sandpiper Session
  sessionStorage.setItem("sandpiperSession", true);

  var api = 'https://sandpiperanalytics.herokuapp.com/api/sites/' + siteId;
  var clickEndpoint = api + '/clicks';
  var viewEndpoint = api + '/views';

// *************************************************

  //Generic Tracking Mechanism
  sandpiperMetrics.report = function(eventData, eventType, endpoint, metaData) {
    event = {};
    event[eventType] = eventData;
    console.log('EVENT BEING SENT TO ENDPOINT', event, endpoint);
    request = new XMLHttpRequest();
    request.open("POST", endpoint, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(event));
  };

  //click events
  document.body.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    console.log('event target', event.target);
    console.log('event target inner text', event.target.text);
    if (event.target.text) {
      sandpiperMetrics.report(event.target.text, "url", clickEndpoint);
    }
  };

  //hash change events (VIEWS)
  if ("onhashchange" in window) {
    function currentHash() {
      console.log('location hash', location.hash);
      if (!location.hash) {
        sandpiperMetrics.report(document.title, "title", viewEndpoint);
      } else {
        var locationNoHash = location.hash.replace(/[^\w\s]/gi, '');
        console.log('locationNoHash', locationNoHash);
        sandpiperMetrics.report(locationNoHash, "title", viewEndpoint);
      }
    }
  }

  //listen for hash change events
  window.onhashchange = currentHash;

  //send initial pageview data on load
  sandpiperMetrics.report(document.title, "title", viewEndpoint);
});