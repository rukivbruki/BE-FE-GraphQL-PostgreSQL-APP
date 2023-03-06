### Project Description
The project is a script for reading data from CSV files and loading that data into a `PostgreSQL` database. The script reads files containing information about categories, accounts, and transactions, and loads this data into tables of the corresponding types in the `PostgreSQL` database.

### Deployment Instructions
1. Install `Docker` and `docker-compose` if they are not already installed on your machine.
2. Clone the repository from GitHub.
3. Open the terminal and navigate to the Client folder using the command `cd PostgresqlDbGenerator`.
4. Create a `.env` file, in which you specify the parameters for connecting to the PostgreSQL database:
```
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
```

_Replace `<username>` with the username of your database, `<password>` with the user's password, and `<database_name>` with the name of the database._

5. Navigate to the `PostgreSQL` application folder and run the command docker-compose up.

_After the containers are started and the application is initialized, the data will be loaded into the database. In addition to connecting to the `PostgreSQL` database, you can also connect to Apollo Studio directly to execute GraphQL queries at `http://localhost:4001/graphql`._

### Project Limitations
- The project does not support automatic tracking of changes in CSV files. To update the data in the database, you need to stop all containers with the command `docker-compose down` and restart the project with new versions of the files.
- The project does not have a mechanism for deleting data from the database. You can use third-party applications such as `pgAdmin` to make changes to an existing database.
- Any changes to the application logic will require prior stopping and removing of containers, as well as deleting the `postgresql-app` image and performing the entire application launch cycle again.
### Recommendations for Error Correction
- If errors occur when starting the project, you should check for all necessary dependencies and ensure that the `.env` file is filled in correctly.
- If errors occur when starting the project related to connecting to the database, you can try to restart the project or increase the value of the `sleep` parameter in the `docker-compose.yaml` file to give the database more time to initialize.
