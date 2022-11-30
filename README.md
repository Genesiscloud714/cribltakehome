# Take home

## Node
- Node Version v18.12.1

## Npm Packages
- Express
- cors
- axios
- mocha
- chai
- chai-http

## Description
Allows a customer to have the ability to issue a REST request to a machine 
in order to retrieve logs from /var/log on the machine receiving the REST request.

## Getting Started
1. `git clone https://github.com/Genesiscloud714/cribltakehome` 
2. navigate to directory /cribltakehome
3. `npm install`
4. Run these commands to start the services.
```
    node sys_webserverapis/webserverapis.js 
    node server01/server01.js 
    node server02/server02.js
```
5. On Postman make sure **GET** is selected then copy and paste these urls. After being ran the response should include a message and the data
```
    localhost:3000/apis/getLogs?serverName=server01&fileName=test4&text=Error&numOfMatches=30
    localhost:3000/apis/getLogs?serverName=server02&fileName=test3&text=response&numOfMatches=15
```

6. For using the testing tool in a terminal in /cribltakehome run the command `npm test` it should return the output of 2
   passing test case messages to verify that the api request works properly