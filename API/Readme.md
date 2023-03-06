### Project Description
The project is an API server built using `GraphQL` with `Apollo Server` and `Express.js` framework, providing methods for querying the `Postgresql` database and extracting transaction information based on various filters and search queries using the `Prisma ORM`.

### Deployment Instructions
To deploy the project, follow these steps:

1. Run the docker containers from the `PostgreSQL` project (see instructions within the project).
2. Install `Node.js` and npm on your computer if they are not already installed.
3. Clone the repository from GitHub.
4. Open the terminal and navigate to the Client folder using the command `cd API`.
5. Install dependencies with the command `npm install`.
Create a `.env` file in the root folder of the project and set the following environment variables:

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
```
_Replace `<username>` with the username of your database, `<password>` with the user's password, and `<database_name>` with the name of the database._

5. Start the server with the command `npm start` from the API project folder.

### Project Limitations
- The project does not have an authentication and authorization system, so all data is accessible without restrictions.
- The project does not have functionality for creating new transactions, only reading existing ones.

### Troubleshooting Recommendations
- If the project fails to start, ensure that all dependencies are installed correctly and that all environment variables are set in the `.env` file.
- If you receive an error when accessing the database, ensure that you have set the correct values for the `DATABASE_URL` environment variable.
- If you receive GraphQL schema errors, ensure that you have correctly defined all data types and fields in the `schema.ts` file and that you have correctly defined all resolver functions in the `resolvers` folder.
- In some cases, data may stop being returned from the database after multiple stops and starts of the application container. If this occurs, it is recommended to perform a fresh restart of the PostgresqlDbGenerator application to reindex the entire database.
