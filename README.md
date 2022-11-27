# Amplication

This is a simple todo list built with ReactJS and Amplication. This demo shows us how to use amplication to build our backend app.

## PREREQUISITES

- NPM 
- At least NodeJS 16 installed on your machine
- Docker

## FIRE UP THE SERVER

Follow the process below to fire up your server

```
npm i
npm run docker:db
npm run db:init
npm start
```
  
If Docker fails to load the database, install **postgresql** on your machine and configure it by following the process below;

- Create a new database in pgAdmin (An Admin UI for managing Postgresql databases)
- Set up a user with a username and password for authentication.

### CONFIGURE THE ENV FILE

Cd into the `server` directory and open the `.env` file.

Within this file;

- You can change the Database Username `DB_USER` and Database user password `DB_PASSWORD` 
  
- You can change the Database URL to point to the recent database which you just created `postgres://DB_USER:DB_PASSWORD@localhost:5432/DB_NAME`

Once you are done, use the command below to fire up your server (still within the server folder)

```
npm run db:init
npm start
```
## DEBUGGING

When you try to authorize and you encounter an "Internal server error", go back to your terminal and check the error that was logged there. 

- If it is anything related to not being able to connect to the database, verify your connection settings and try to make the request again.

- If you see "Unique constraint failed on the fields ...", it means that the field was marked as a unique field when you were creating the entity and this means you can't submit a value that already exists in the database
- If you change or update an entity in your Amplication dashboard, make sure to pull your code locally and rebuild the migrations file by running the command

```
npm run db:init
```

If it fails to run successfully, delete the migrations folder in `/prisma/` and try the command again

Thank You.