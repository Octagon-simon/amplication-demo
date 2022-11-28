# Amplication

This is a simple **to-do list** built with ReactJS and Amplication. 

This demo shows us how to use amplication to build our backend app.

[Check out Amplication here](https://amplication.com)

![image](https://user-images.githubusercontent.com/68190998/204152536-0d5acb42-4b79-492c-b108-0e90a7775f2f.png)

![image](https://user-images.githubusercontent.com/68190998/204152536-0d5acb42-4b79-492c-b108-0e90a7775f2f.png)

## PREREQUISITES

- NPM 
- At least NodeJS 16 installed on your machine
- Docker

## FIRE UP THE SERVER

Follow the process below to fire up your server

Open a terminal and `cd` into the `server` folder then run the commands below
```
npm i
npm run docker:db
npm run db:init
npm start
```
  
If the database fails to load on Docker, install **postgresql** on your machine and configure it for this project like so;

- Create a new database in pgAdmin (An Admin UI for managing Postgresql databases)

- Set up a user with a username and password for authentication.

Now Cd into the `server` directory and open the `.env` file.


- Change the Database Username `DB_USER` and Database User Password `DB_PASSWORD` to the one you used in **pgAdmin**
  
- Change the Database URL to point to the recent database which you created in **pgAdmin**. A Database connection URL is of the format below
  
  `postgres://DB_USER:DB_PASSWORD@localhost:5432/DB_NAME`

Just replace DB_USER, DB_PASSWORD & DB_NAME with the Database Username, Database Password and Database Name respectively.

Once you are finished, use the command below to fire up the server

```
npm i
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
    Then fire up your server by running the command

    ```
    npm run start
    ```

If the first command fails, navigate to the folder `/server/prisma/` and delete the migrations folder there. Then try the command again

Thank You.
