const dataAuth = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE,
    account_id: process.env.ACCOUNT_ID,
}

var dataJourney = {
    EventDefinitionKey: process.env.EVENT_DEF_KEY
}

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