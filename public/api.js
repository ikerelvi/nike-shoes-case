// The Api module is designed to handle all interactions with the server
const Api = (function () {
  let requestPayload;
  let responsePayload;

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest,

    // The request/response getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getRequestPayload: function () {
      return requestPayload;
    },
    setRequestPayload: function (newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function () {
      return responsePayload;
    },
    setResponsePayload: function (newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
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
        Api.setResponsePayload(http.responseText);
        callback(http.responseText);
      }
      else if (http.readyState === 4 && http.status !== 200) { 
        callback(http.responseText);
      }
    };

    let params = JSON.stringify(payloadToServer);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    if (Object.getOwnPropertyNames(payloadToServer).length !== 0) {
      Api.setRequestPayload(JSON.stringify(payloadToServer));
    }
    // Send request
    http.send(params);
  }
}());