## Todomessage

  * [What is Todomessage](#what-is-todomessage)
  * [Motivation](#motivation)
    + [Idea](#idea)
    + [Limitations](#limitations)
    + [Live demo](#live-demo)
  * [Getting Started](#getting-started)
    + [Prerequisites](#prerequisites)
    + [Installing](#installing)
    + [Dev environment](#dev-environment)
    + [Deployment](#deployment)
  * [Contributing](#contributing)
  * [Authors](#authors)
  * [License](#license)
  * [Built With](#built-with)
  * [Demo](#demo)
    + [Sign in using demo board](#sign-in-using-demo-board)
    + [Create a new board and receive a to-do notification message](#create-a-new-board-and-receive-a-to-do-notification-message)
    + [Change board name time zone or application theme](#change-board-name-time-zone-or-application-theme)
    
------------

### What is Todomessage

Todomessage is an example application built with the Spring Boot framework, React.js (Hooks) library and Material UI React framework.

------------

### Motivation

The main purpose of this project is to demonstrate what and how could be built with the modern Java/JS frameworks and libraries. They allow you to quickly build a production ready solution which will fulfill most of the basic needs such as being a mobile-friendly and have the modern user experience. 

The project could be as a template for similar solutions or could be customized and hosted as a complete solution.

The backend is built using the Spring Boot framework which allows you to built a reliable REST API with minimal configuration code. This gives you time to focus on your business logic and build great applications.

The frontend is a React based application with the use of the Material UI framework for user experience (UX). All React components are functional and use React Hooks. For the application state management React Context is used which gives you a lot of flexibility in building complex flows with minimal setup.

#### Idea

Receive group email notifications about your to-do things. You and your friends are working on some projects after some discussion you agreed on a list of things you need to do. Create a board, add your emails to the board list and create the to-dos to be reminded about them.

Todomeasge has three basic concepts Board, Card and Todo.

The board is basically is a user account. You need to have a board to sign in. When you sign in you see the cards that are a representation of the particular day.

The card has a list of todos. Each todo has its name and due time. When the due time of the todo approaches an email will be sent to all the email addresses which are assigned to the board.

#### Limitations
This is a demo project so a few limitations were applied.

- The board can have 8 cards at a time.
- The card can have 10 todos at a time.
- There is a cleaning service that deletes boards unused for 30 days and any card older than 1 day.
- New cards are generated automatically to maintain 8 cards at a time - yesterday and 7 cards in the future.

#### Live demo

#### [Todomesage on Heroku](https://todomessage.herokuapp.com/) 
**demo credentials:  demo/key**

The project is deployed on Heroku as part of the free plan. This means you can create a board there and other data however the application will go in a sleep mode after 30 minutes of inactivity, thus it can not be used for actual notification messages.

You can deploy the application on some other hosting platforms configure the SMTP server details and receive the email notifications.

------------

### Getting Started

These instructions will help to set up the project on your local machine for development and prepare it for the deployment.

#### Prerequisites

```
installed - Git
installed  - Java 11 
installed  - Node.js 
available - PostgreSQL server
created - PostgreSQL database with name "todomsg"
```

#### Installing

Follow the below steps to run the application on your local env.

```
git clone https://github.com/vzhemevko/todomessage.git
```

Navigate to frontend directory install node modules. Then to the root directory and run a production build command

```
cd todomessage/frontend
npm install
cd todomessage
gradlew buildProduction
```

Setup run/debug configuration in your IDE to start a java application with the main class

```java 
org.todomessage.TodomessageApplication
```

Or run the application from the build directory

```
java  -jar todomessage/build/libs/todomessage-0.0.1-SNAPSHOT.jar
```

After the application start go to - http://localhost:8080 default credentials - demo/key

#### Dev environment

After cloning the repository navigate to the root directory and build the project. 

```
cd todomessage
gradlew build
```

Then create run/debug configuration in your IDE with the main class

```java 
org.todomessage.TodomessageApplication
```

Navigate to the frontend root directory and run

```
npm install
npm start
```

A new tab in your browser should be opened - http://localhost:3000 default credentials - demo/key

#### Deployment

The first step should be to specify the backend server URI. Default is http://localhost:8080
The URI could be changed in  `todomessage/frontend/src/hooks/api/useApi.jsx`

```javascript
const SERVER_BASE = 'http://localhost:8080';
```

The next step is to configure application configuration such as PostgreSQL database location and SMTP server. These can be configured in the

`todomessage/src/main/resources/application.yml` 

For instance
```
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://${PGSERVER:localhost}:5432/todomsg
    username: postgres
    password: postgres
```

The next step would be to create a production build

```
cd todomessage
gradlew buildProduction
```

After that, the production build could be found in the `todomessage/build/libs` and could be run with the below command.

```
java  -jar todomessage/build/libs/todomessage-0.0.1-SNAPSHOT.jar
```

------------


### Contributing

Feel free to submit pull requests

------------

### Authors

* **Vasyl Zhemevko** - *Initial work* - [vzhemevko](https://github.com/vzhemevko)

------------

### License

This project is licensed under the MIT License

------------

### Built With

* [Spring Boot](https://spring.io/projects/spring-boot) 
* [React.js](https://reactjs.org) 
* [Material UI](https://material-ui.com) 

------------

### Demo

[Live demo](#live-demo)

#### Sign in using demo board


![alt text](https://github.com/vzhemevko/todomessage/blob/master/demo/sign-in-demo-board.gif?raw=true)


#### Create a new board and receive a to-do notification message


![alt text](https://github.com/vzhemevko/todomessage/blob/master/demo/create-new-board-and-todo.gif?raw=true)


#### Change board name time zone or application theme


![alt text](https://github.com/vzhemevko/todomessage/blob/master/demo/settings-and-theme.gif?raw=true)

------------