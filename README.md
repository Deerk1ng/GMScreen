# Guild Meet
Guild Meet is a website designed to make planning for your nerdy events easy. Schedule events that your group mates can sign up to attend. In the future, campaign groups will be implemented, allowing for a more exclusive membership status and for private usage of the schedule feature.

## Links:

Github Repo: [GM Screen GitHub](https://github.com/Deerk1ng/GMScreen)

Live Link: [Live Link](https://guild-meet.onrender.com/)

## Technology Used
This website uses a combination of many languages, frameworks, and packages to create a working backend API and frontend website. Some of these technologies include
* Python
* Flask
* SQL Alchemy
* React
* Redux
* AWS

## Set Up
### Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Features

### Events

![image](https://github.com/user-attachments/assets/55f34428-4489-49cc-8d9b-d4289d12821a)

Users are automatically navigated to the events page once they've logged in. This page shows all upcoming events from any user on the site currently. A future campaigns feature will allow users to join groups and only see events those events

---

![image](https://github.com/user-attachments/assets/e6c2532c-3cc4-40dc-8006-c125abeb7f47)

Creating an event requires a chosen title/reason, the date(s) and times the event is running for, a brief description, and capacity which in the future will affect how many users can attend.

---
![image](https://github.com/user-attachments/assets/d3fe268c-235c-4ed7-9425-4fe0a0595ff4)

Creating an event will automatically list you as the Owner and you will be unable to update your attendance. Users are also able to edit and delete any events they have created.

## Attend Event
 ![image](https://github.com/user-attachments/assets/91eb569e-d59b-47a9-be4a-b3f200fa9476)

Users can choose to attend any event or even place themselves as a maybe to try to save a spot

---
![image](https://github.com/user-attachments/assets/46c1ec7b-156c-4ba0-af2e-7603ab7a8c1c)

Any user already attending can choose to rescind their RSVP. Unless they are an Owner of course!

---
![image](https://github.com/user-attachments/assets/b69412fe-1d37-459a-8b63-88655a1b4402)

### Character Sheet
Users have the ability to create a character. There are a few characters already provided for the demo account. Each character has a unique ability score set. In the future, users will be able to choose personalized equipment and spells to create a truly unique character. For now all equipment and many stats are preset based on class recommendations

![image](https://github.com/user-attachments/assets/62db3d7d-90df-40ef-bb12-94e6bfa512dc)

The character creation is split up into three separate pages. Navigating back and forth is possible between pages however the site wont let you move to the next page until all information is filled in and valid.

![image](https://github.com/user-attachments/assets/c934fa39-3534-4411-973f-774d7d5cf0d8)
![image](https://github.com/user-attachments/assets/85474def-1f67-4e94-bbf2-74ce68e9036a)
![image](https://github.com/user-attachments/assets/549ffcb7-d558-40ba-a842-e85942b6f3b9)

Once a character has been created, the page will navigate to the characters page with your newly created character selectable in the drop down menu.

## Future Features
* Campaign creation and invitations
* GM Reference tables
* Loot Tables and Encounter Tables
* Wiki style World Atlas
