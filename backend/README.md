# TODO App Backend

This is the backend application for a TODO app. It is written in JavaScript, using Node.js and Express.js.

## Installation

To run the backend locally, follow these steps:

1. Create a `.env.local` file and set the following variables:

    - `DB_DIALECT`: The database dialect. In this case, it's `mariadb`.
    - `DB_USER`: The database user.
    - `DB_PW`: The database password.
    - `DB_HOST`: The database host and port.
    - `DB_NAME`: The database name.
    - `TOKEN_SECRET`: A 64-character string used to sign JSON Web Tokens.

2. Create a MariaDB database (e.g. using Docker) and set the following variables:

    - `MARIADB_ROOT_PASSWORD`: The root password for the MariaDB instance.
    - `MARIADB_DATABASE`: The name of the database to create.
    - `MARIADB_USER`: The username to create for the database.
    - `MARIADB_PASSWORD`: The password for the database user.

3. Install dependencies:

    ```
    npm install
    ```

4. Run the app:

    ```
    npm run start
    ```

## Running with Docker

To run the database and backend on Docker, run the following command in the backend folder:

```bash
docker compose up
```
