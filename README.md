# SERVER-K - Personal Finance API

## Description

SERVER-K is a RESTful API built with Node.js, Express, and MongoDB for managing personal finances. It provides endpoints for user authentication, expense and income tracking, and transaction categorization. User roles are implemented to restrict access to data.

## Features

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Token) for authentication.
*   **Expense Tracking:** CRUD (Create, Read, Update, Delete) operations for expense records.
*   **Income Tracking:** CRUD operations for income records.
*   **Transaction Categorization:** Define and manage categories for expenses and income (e.g., "Food," "Salary").
*   **Role-Based Access Control (RBAC):**
    *   **Admin Users:** Access to all data and operations.
    *   **Regular Users:**  Access only to their own data.
*   **Secure Password Storage:**  Uses `bcryptjs` for secure password hashing.
*   **MongoDB Database:**  Data persistence using MongoDB.
*   **CORS Enabled:**  Cross-Origin Resource Sharing enabled for secure communication with front-end applications.
*   **Environment Variables:**  Sensitive configuration data managed via `.env` files.
*   **Logging:** HTTP request logging with `morgan`.

## Technologies

*   **Node.js:**  JavaScript runtime environment.
*   **Express.js:**  Web application framework for Node.js.
*   **MongoDB:**  NoSQL database.
*   **Mongoose:**  MongoDB object modeling tool.
*   **JSON Web Tokens (JWT):**  Standard for securely transmitting information as a JSON object.
*   **bcryptjs:**  Library for hashing passwords.
*   **cors:**  Middleware for enabling CORS.
*   **dotenv:**  Module for loading environment variables from `.env` files.
*   **morgan:**  HTTP request logger middleware for Node.js.
*   **cookie-parser:** Middleware for parsing cookies attached to the client request object.

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

    *   Create a `.env` file in the root directory.  (If it doesn't already exist)
    *   Add the following environment variables:

        ```
        TOKEN_SECRET=your_secret_key_for_jwt  # Use a strong, random key!
        PORT=5006
        MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
        CORS_URI=http://localhost:3000  # Or your front-end's origin
        ```

        **Important:** Replace `your_secret_key_for_jwt`, `your_username`, `your_password`, `your_cluster.mongodb.net`, `your_database_name`, and `http://localhost:3000` with your actual values. **Never commit your `.env` file to version control.** Add it to your `.gitignore` file.

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

Consult the [API Documentation](api_documentation.html) for a detailed list of available endpoints and usage instructions. Ensure the `api_documentation.html` file is in the same directory as this `README.md` file.

## Authentication

Most API endpoints require a valid JWT (JSON Web Token) for authentication. Include the token in the `Authorization` header of the request using the following format:


Obtain a JWT by registering a new user or logging in with an existing user via the `/auth/signup` and `/auth/login` endpoints.

## Role-Based Access Control

*   **Admin Users:** Full access to all data and can perform all operations.
*   **Regular Users:**  Restricted access to only their own data.

User roles are defined in the `roles` array of the user object.

## Error Handling

The API employs standard HTTP status codes to indicate success or failure. Error responses generally include a JSON payload with a `message` field providing specific error details.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write unit tests for your changes.
5.  Ensure tests pass.
6.  Commit your changes with a clear and descriptive message.
7.  Push your branch to your forked repository.
8.  Submit a pull request.

## License

[MIT License](LICENSE)

---

**Notes:**

*   This `README.md` provides a foundational overview. Enhance it with specific project details.
*   Detailed instructions on database setup.
*   API usage examples in different programming languages.
*   Deployment guide for production environments.
*   Project license details.
*   Contact information for maintainers.
*   Consider adding a diagram showing the data model or architecture.

```json
{
  "name": "server-k",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js" // Added a 'dev' script
  },
  "keywords": [
    "server"  // Removed quotes around "server" in keywords
  ],
  "author": "Kelvin Familia",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.9"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.11.0",
    "morgan": "^1.10.0"
  }
}