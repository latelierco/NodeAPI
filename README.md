# TypeScript Express API

This is a simple Restfull API using [Express](http://expressjs.com/fr/), [TypeScript](http://definitelytyped.org/), [MongoDB](https://www.mongodb.com/), and [Mongoose](http://mongoosejs.com/docs/).



### Getting Started

Install MongoDB and run it. After, just run  `npm i ` to install packages, and then run  `npm start` or `npm run dev`. 



### API Usage

After authenticate, the server will give you a `x-access-token`. You have to put `x-access-token` in your header request, or an attribute `token` in the body of the request to communicate with users endpoint. You also have to put `Content-Type: application/application/json` in the headers. 

The API will create a default admin user, the model is in [config file](./src/config/config.ts).

```json
"defaultUser": {
	"email": "admin@admin.admin",
	"firstName": "admin",
	"lastName": "admin",
	"password": "admin",
	"username": "admin",
},
```

### API Endpoint


| TYPE   | ENDPOINT                            | DESCRIPTION         | BODY                                                                    |
| ------ | ----------------------------------- | ------------------- | ----------------------------------------------------------------------- |
| POST   | `www.yourdomain.com/authenticate/`  | Authenticate a user | username & password                                                     |
| GET    | `www.yourdomain.com/users/`         | Get all users       | none                                                                    |
| GET    | `www.yourdomain.com/users/{userId}` | get a user          | none                                                                    |
| POST   | `www.yourdomain.com/users/`         | Create a user       | email, username, password, firstName & lastName                         |
| PUT    | `www.yourdomain.com/users/{userId}` | update a user       | One of theses property: email, username, password, firstName & lastName |
| DELETE | `www.yourdomain.com/users/{userId}` | delete a user       | none                                                                    |
