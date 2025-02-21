
# Timetable Backend

This is the backend repository for the Timetable application. It provides the necessary APIs and services to manage schedules, events, and user data for the Timetable app.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user login and registration.
- **Schedule Management**: Create, update, and delete schedules.
- **Event Management**: Add, modify, and remove events.
- **RESTful APIs**: Well-structured APIs for frontend integration.
- **Database Integration**: Persistent storage for schedules and user data.

## Technologies Used

- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for user authentication.
- **Docker**: Containerization for easy deployment.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KabiraEttalbi/timetable-backend.git
   cd timetable-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Access the API**:
   The server will be running at `http://localhost:3001`.
   

### Example Endpoints

- **User Registration**:
  ```
  POST /auth/register
  ```

- **User Login**:
  ```
  POST /auth/login
  ```

- **Create Schedule**:
  ```
  POST /emploi-du-temps
  ```

- **Get All Schedules**:
  ```
  GET /emploi-du-temps
  ```

For more details, refer to the Swagger documentation.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

