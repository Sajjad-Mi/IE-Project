# IE-Project
This is my project for internet engineering course a web based messenger
## Setup and Requirements

For running this code you need [node.js](https://nodejs.org/en/download) and [mongodb](https://www.mongodb.com/try/download/community) <br />
Then run the following commands

```
git clone https://github.com/Sajjad-Mi/IE-Project.git
```
go to the created directory and run:
```
npm install 
npm run client-install
```
Then create a .env file in the root directory of project with following variables.
```
DB_URL=your mongodb url for example mongodb://localhost/messenger
JWT_SECRET=your jwt secret
```
After that you can use following commands for running
```
npm run start 
```
```
npm run client
```
