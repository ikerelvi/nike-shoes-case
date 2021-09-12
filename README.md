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
  - [Download](https://github.com/ikerelvi/nike-shoes-case.git)

#### 2. Run the command npm install and the required packages will be installed:
  -  "express": "^4.17.1",
  -  "axios": "^0.21.4",
  -  "dotenv": "^10.0.0",
  -  "pg": "^8.7.1",
  -  "voucher-code-generator": "^1.1.1"

#### 3. Add Postgresql to the backend
  - Install [docker](https://www.docker.com/) on your computer.
  - Build a postgresql-db docker container via the `docker build -t postgresql-db .` command in the `docker/postgresql-db` folder.
  - Start the docker container via the `docker run --name dbsrv -p 5432:5432 -d postgresql-db` command.

#### 4. Run the command `npm start` to start your server
- `Go to http://localhost:3000/monitor/liveness on the browser to check if the server is working`

#### 5. Go to the main page and fulfill the Survey
- `Go to http://localhost:3000/ on the browser`