// JSON init -- Basic data shared for the same JSON
// JSON with the information regarding the authorization data to request the token
const dataAuth = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE,
    account_id: process.env.ACCOUNT_ID,
}

// JSON with the information regarding the data to trigger the journey
var dataJourney = {
    EventDefinitionKey: process.env.EVENT_DEF_KEY
}

// JSON config
var config = {
    method: 'post',    
    headers: {
        'Content-Type': 'application/json'
    }
}

module.exports = {
    dataAuth,
    config,
    dataJourney
}