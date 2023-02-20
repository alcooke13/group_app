#  Group App

<br>

## Contents

* [Demo](#demo)
* [Meet The Team](#meet-the-team)
* [Technologies](#technologies)
* [Background](#background)
* [Installation](#installation)
* [What's next](#whats-next)

<br>

##  Demo 

<br>

https://user-images.githubusercontent.com/99486978/220124658-036b8064-e949-4591-b461-39a3b6eba0a2.mp4

<br>

## Meet the team

<br>

![team](https://user-images.githubusercontent.com/99486978/220127034-83eaa12c-407e-42d0-a601-9a0fcaab2ca9.jpeg)

<br>

- Alistair (github: [alcooke13](https://github.com/alcooke13))
- Edward (github: [edwardjanson](https://github.com/edwardjanson))
- Jenna (github: [Jennahowieson](https://github.com/Jennahowieson))
- Rory (github: [RAnderson96](https://github.com/RAnderson96))

<br>

## Technologies

This app was built using the below technologies:
- Java
- Spring Boot
- React Native
- TypeScript
- PostgreSQL

<br>

## Background

We developed this app to make planning an event with your friends easier and more convenient. We found that often it can be difficult to organise and plan an event using traditional messenger applications. Our app allows for a centralised planning platform, where users can see their upcoming events and arrange an event with ease. 

In the space of two weeks, we created brand guidelines to have a clear vision of the brand from the start, mapped class diagrams and user flows and agreed on ways of working. This included 3-day sprints, daily stand-ups, taking turns with scrum master responsibilities, pair/mob programming, Trello board and GitHub conventions, etc. We also created detailed wireframes in Figma for the app's 23 screens and views and dedicated two learning days for React Native and TypeScript.

The app allows users to:
- Easily view upcoming events and polls that are still open for votes on the homepage
- View their groups in a screen with notifications to indicate an open poll
- Create a new group and add members from the user’s Group contact list
- View a group’s details including the next upcoming event and open poll
- Create a new event, with the option to predefine information. If no information is provided polls are created in the following order of priority:  Date > Activity > Location. 
- Add options to a poll and vote once per option
- Use a calendar to find upcoming events by date (a dot below a date notifies the user that an event exists for that date) or use the list view to view all upcoming events
- Ability to:
  - update user details
  - update and remove groups and events
  - remove friends
<br>

## Installation

Node.js, PostgreSQL, and a Java IDE such as IntelliJ are required to run the app. The process is divided into four steps.

To setup the backend of the app, first navigate to the CLI and run the below, updating the name to give to the database:

```
createdb update_this
```

Open the Java IDE and update the first three lines in the ‘application.properties’ file found in the resources folder. Update the following:
- Line 1, update with the above-chosen database name
- Line 2, update with database username (commonly admin)
- Line 3, keep empty if no password is required

```
spring.datasource.url=jdbc:postgresql://localhost:5432/update_this
spring.datasource.username=update_this
spring.datasource.password=update_this
```

In the Java IDE, run the GroupApplication runner file to start up Spring and populate the database with the DataLoader. To start the app with an empty database, navigate to the DataLoader file and comment out ‘@Component’ on line 15.

To install the dependencies for the app’s frontend, open the frontend folder in the CLI and run the below command:

```
npm i
```

To run the app, run the below command and follow the instructions shown in the terminal.

```
npx expo start
```

<br>

## What's next

- Phone authentication
- Embed Google Maps to find common meeting points
- Show remaining time for a poll in the single group view
- Phone calendar sync
- Add friends by importing phone contacts
- Tailor event to be ‘hosted’ (one user’s address) or ‘at external location’ (bar/restaurant etc.)
- Generate list of suggested bars/activities within a certain radius
- Additional notifications for Birthdays and special events
- Image sharing of past event
- Chat messaging, including push notifications
