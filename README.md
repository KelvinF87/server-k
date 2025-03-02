# SERVER-K - Personal Finance API

## Description

SERVER-K is a RESTful API built with Node.js, Express, and MongoDB, designed for managing personal finances. It provides endpoints for user authentication, tracking expenses and income, and categorizing financial transactions.

## Features

*   **User Authentication:** Secure user registration and login with JWT (JSON Web Token) authentication.
*   **Expense Tracking:** Create, read, update, and delete expense records.
*   **Income Tracking:** Create, read, update, and delete income records.
*   **Transaction Categorization:** Define and manage categories for expenses and income (e.g., "Food," "Salary").
*   **Role-Based Access Control (RBAC):** Admin users can access all data; regular users can only access their own data.
*   **Secure Password Storage:**  Uses `bcryptjs` for secure password hashing.
*   **MongoDB Database:** Data is stored in a MongoDB database.
*   **CORS Enabled:** Cross-Origin Resource Sharing (CORS) is enabled for secure communication with front-end applications.
*   **Environment Variables:** Uses `.env` files to manage sensitive configuration data.

## Technologies

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   JSON Web Tokens (JWT)
*   bcryptjs
*   cors
*   dotenv
*   morgan

## Prerequisites

*   Node.js (version 16 or higher)
*   npm (Node Package Manager)
*   MongoDB (installed and running)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KelvinF87/server-k.git
    cd server-k
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    *   Create a `.env` file in the root directory of the project.
    *   Add the following environment variables:

        ```
        TOKEN_SECRET=your_secret_key_for_jwt (Use a strong, random key!)
        PORT=5006
        MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
        CORS_URI=http://localhost:3000 (or your front-end's origin)
        ```

        **Important:** Replace `your_secret_key_for_jwt`, `your_username`, `your_password`, `your_cluster.mongodb.net`, `your_database_name`, and `http://localhost:3000` with your actual values.  **Never commit your `.env` file to version control.**  Add it to your `.gitignore`.

4.  **Start the server:**

    ```bash
    npm run dev  # (If you have a "dev" script defined in package.json using nodemon)
    # OR
    npm start  # (If you have a "start" script defined in package.json)
    # OR
    node index.js  # (If you don't have a start script)
    ```

    The server will start listening on the port specified in your `.env` file (default: 5006).

## API Endpoints

See the [API Documentation](api_documentation.html) for a complete list of available endpoints and how to use them.  (Make sure the `api_documentation.html` file you created earlier is in the same directory as this `README.md` file.)

## Authentication

Most API endpoints require authentication using a valid JWT (JSON Web Token).  The token must be included in the `Authorization` header of the request in the following format:


You can obtain a JWT token by registering a new user or logging in with an existing user using the `/auth/signup` and `/auth/login` endpoints.

## Role-Based Access Control

*   **Admin Users:** Admin users have access to all data and can perform all operations.
*   **Regular Users:** Regular users can only access their own data.

The `roles` array in the user object determines the user's roles.

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request.  Error responses typically include a JSON payload with a `message` field providing more details about the error.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Write tests for your changes.
5.  Run the tests to ensure they pass.
6.  Commit your changes with a clear and descriptive message.
7.  Push your branch to your forked repository.
8.  Submit a pull request.

## License

[MIT License](LICENSE)

---

**Note:** This `README.md` is a starting point.  You should customize it with more specific information about your project, such as:

*   Detailed instructions on how to set up the database.
*   Examples of how to use the API with different programming languages.
*   Information about how to deploy the API to a production environment.
*   Your project's license.
*   Contact information for the project maintainers.