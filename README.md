# Wolf - Arte en cuero v1.0
Backend App made with 💖 by [Hy-An](https://github.com/nathan-hyan)

## Introduction

This is a marketplace app for a small leather company based in Tucumán, Argentina.

Made with Node.js, Express & MongoDB + Mongoose
This Readme is courtesy of [StackEdit](https://stackedit.io/).

*First commit: june 22, 2021*

## Libraries used:

|Library|Link|
|--|--|
|bcryptjs|https://www.npmjs.com/package/bcryptjs|
|connect-mongodb-session|https://github.com/mongodb-js/connect-mongodb-session|
|dotenv|https://github.com/motdotla/dotenv|
|express|https://expressjs.com/es/|
|express-session|https://github.com/expressjs/session|
|imgur|https://github.com/kaimallea/node-imgur|
|mongoose|https://mongoosejs.com/|
|morgan|https://github.com/expressjs/morgan|
|multer|https://github.com/expressjs/multer|

## Routes

    BASELINE_URL = /api/v1
---

 - `{BASELINE_URL}/users`
 - `{BASELINE_URL}/products`
 - `{BASELINE_URL}/sells`
 - `{BASELINE_URL}/upload`

USERS Path
---
This is not meant to be exposed to the front-end, but to be used with the backoffice side of the app. 

 - POST - `/create` 
	 - `{
	"name": string,
	"email": string,
	"password": string
}`
 - POST - `/auth/login` 
	 - `{
	"email": string,
	"password": string
}`
 - POST - `/auth/logout`
	 - no body required

-	GET - `/auth/check`
-	PUT - `/edit/:id`
	-	`{
	"name": string,
	"email": string,
	"password": string
}`
- DELETE - `/delete/:id`

PRODUCTS Path
---
Some parts of this endpoint has to be admin restricted, and can only be accessed by the backoffice app.

-	GET - `/get`
-	GET - `/getSingle/:id`
-	POST - `/create`
	-	`{
	"price": number,
	"stock": number,
	"category": string[],
	"image": string[],
	"name": string,
	"description": string
}`
-	PUT - `/edit/:id`
	-	`{
	"price": number,
	"stock": number,
	"category": string[],
	"image": string[],
	"name": string,
	"description": string
}`
-	PUT - `/rate/:id`
	-	`{ "rating": number }`
-	PUT - `/comment/add/:id`
	-	`{ "comment": string }`
-	PUT - `/toggleFinished/:id`
	-	no body
- DELETE - `/comment/delete/:id/:comment_id`
-	DELETE - `/delete/:id`
	
SALES Path
---
Only accessible via the backoffice app, except for /create.

-	GET - `/get`
-	GET - `/getSingle/:id`
-	POST - `/create`
	-	`{
	"products": [
		{
			"id": ProductID,
			"name": string,
			"price": number,
			"stock": number,
			"quantity": number
		}],
	"userInfo": {
		"name": string,
		"whatsApp": string
	},
	"amount": number
}`
-	PUT - `/edit/:id`
	-	`{
	"products": [
		{
			"id": ProductID,
			"name": string,
			"price": number,
			"stock": number,
			"quantity": number
		}],
	"userInfo": {
		"name": string,
		"whatsApp": string
	},
	"amount": number
}`
-	DELETE - `/delete/:id`

UPLOAD Path
---

- POST - `/`
	- FormData

## Requirements
This project uses enviroment variables in order to connect to the database. You can add the following line to an .env file in order to make this connection

    DB_URI=Your MongoDB URI
    KEY=Your MongoDB Key
    IMGUR_CLIENT_API_KEY=Imgur client API
    BACKOFFICE=Backoffice URL
    FRONTEND=Frontend URL
    TEST_ENV=Localhost env
    MAIL_RECEIVER=Mail address to send the mails
    MAIL_SENDER=Where the mails are sended from
    MAIL_SENDER_PASSWORD=Password for the before mentioned account
