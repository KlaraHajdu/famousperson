
## Guess!

An application created for playing a guessing game online by a group of 4-12 people. It enables to play this game with friends even within quarantine, with the additional use of a videoconferencing app. 

It is built with React, Redux, Bootstrap and styled components, using Firebase Realtime Database. 

## Project status

This project is currently in beta testing. Players can play the game with all major functionalities from the beginning to the end. Basic tests are developed. 

The app is deployed at: https://famous-person-guessing-game.web.app/ 

## Project Screenshots

![Play game phase](/../screenshots/src/static/screenShot2.jpg?raw=true "Play game")

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

To Install:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`

## Reflection
      
The main project goal was to deepen my knowledge in React, gaining experience with a NOSQL database and in deployment. Kicking it off with a team mate in the first two weeks, I delivered the project to the completion. 

I intended to deliver a stable application, which after deployment can be used for fun by anybody all over the world. Adding extra features, like simple animations was part of the learning process. The biggest challenges included managing a complex set of states in different players' browsers and restoring from session storage if needed in different game phases. Changing to Redux for state management greatly helped to cope with these difficulties. Another challenge is testing the application with complex state management involving different users. 

