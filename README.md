# Nike Shoes Use Case by Iker Elorza Vidal

Nike wants to have a web page where customers can submit a
survey (Customer Satisfaction). By submitting the form, the
customer will receive a discount of 10%. When the form is
successfully submitted, the contact (customer) should enter the
Customer Journey with an auto-generated and unique discount
voucher code. The email that will be sent out via the journey
contains that auto-generated voucher.


### Steps for using the repo:

#### 1. Clone the repository or download it
  - [Download](https://github.com/ikerelvi/nike-shoes-case)

#### 2. Run the command npm install and the required packages will be installed:
  -  "express": "^4.17.1",
  -  "axios": "^0.21.4",
  -  "dotenv": "^10.0.0",
  -  "pg": "^8.7.1",
  -  "voucher-code-generator": "^1.1.1"

#### 3. Run the command `npm start` to start your server
- `Use http://localhost:3000/monitor/liveness on the browser to check if the server is working`

#### 4. From Postman or your API dev tool in order to test the endpoint
 - POST to /urlShortenerService with "entryURL" parameter filled with a URL

`CURL Request Example`
```curl
    curl --location --request POST 'localhost:3000/urlShortenerService' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "entryURL": "https://www.koahealth.com/"
    }'
```
`NodeJS Request Example`
```javascript
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'localhost:3000/urlShortenerService',
        'headers': {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "entryURL": "https://www.koahealth.com/"
    })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
```
