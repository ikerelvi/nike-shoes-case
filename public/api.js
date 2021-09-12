// The Api module is designed to handle all interactions with the server
const Api = (function () {
  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest
  };

  // Send a message request to the server
  function sendRequest(json, endpoint, callback) {
    // Build request payload
    let payloadToServer = {};
    if (json) {
      payloadToServer = json;
    }

    // Built http request
    let http = new XMLHttpRequest();
    http.open('POST', endpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        callback(http.responseText);
      }
      else if (http.readyState === 4 && http.status !== 200) { 
        callback(http.responseText);
      }
    };

    let params = JSON.stringify(payloadToServer);
    // Send request
    http.send(params);
  }
}());