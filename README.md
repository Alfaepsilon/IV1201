# Group 9 Project

This is the project in the course IV1201 for Group 9. Client-Side Rendering with a Monolithic Architecture. 

## Tools

The following software development tools are used.

- Version control (Git)
- Project management (npm)
- Automatic restart (nodemon)

## Frameworks

The following frameworks are used.

- express
- sequelize
- mariadb
- mysql
- jsonwebtoken
- body-parser
- cookie-parser
- dotenv-safe
- express-validator
- verror

## Installation

Install node.js, clone this git repository and install all required npm packages by giving the command `npm install` in the root directory.

## Start the Application

The repository contains only a REST api, no client. The API can be tried by using for example *insomnia*, [https://insomnia.rest/]

1. Copy the file `.env.example` to a file called `.env` and specify values for all settings.
1. Create the database. You do not have to create any tables in the database, they will be created by the application.
1. Start the application by giving the command `npm run start-dev` in the `server` directory.
1. Start insomnia
1. Import the file `insomnia-chat-api-requests.json`, which will populate insomnia with all requests that can be made to tha chat api.
 