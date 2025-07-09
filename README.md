# Bookmark Saver

A full-stack web application for saving and managing bookmarks with user authentication, built with Node.js, Express, React, and MySQL.

## Features

- **User Authentication**: Register and login with JWT-based authentication
- **Bookmark Management**: Add, view, edit, and delete bookmarks
- **Search & Filter**: Search bookmarks by title or description
- **Tagging System**: Organize bookmarks with custom tags
- **Responsive Design**: Works on desktop and mobile devices
- **Secure**: Password hashing with bcrypt, JWT tokens, and input validation

## Tech Stack

### Backend
- Node.js & Express.js
- MySQL database
- Sequelize ORM
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation
- Helmet for security headers
- CORS for cross-origin requests

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Project Structure

```
bookmark-saver/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookmarkController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Bookmark.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── bookmarks.js
│   ├── validators/
│   │   └── validation.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookmarkForm.js
│   │   │   └── BookmarkList.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- MySQL Workbench or MySQL CLI

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd bookmark-saver
```

2. **Set up MySQL database:**

Open MySQL Workbench or MySQL CLI and run:
```sql
CREATE DATABASE bookmark_saver;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON bookmark_saver.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
```

3. **Configure backend environment:**
```bash
cd backend
```

Create a `.env` file with:
```env
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bookmark_saver
DB_USER=admin
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

4. **Install backend dependencies:**
```bash
npm install
```

5. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start the backend server:**
```bash
cd backend
node server.js
```

The backend will run on http://localhost:5001

2. **Start the frontend (in a new terminal):**
```bash
cd frontend
npm start
```

The frontend will run on http://localhost:3000

3. **Access the application:**
- Open your browser and go to http://localhost:3000
- Register a new account or login
- Start saving your bookmarks!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Bookmarks
- `GET /api/bookmarks` - Get user's bookmarks (protected)
- `GET /api/bookmarks/:id` - Get specific bookmark (protected)
- `POST /api/bookmarks` - Create new bookmark (protected)
- `PUT /api/bookmarks/:id` - Update bookmark (protected)
- `DELETE /api/bookmarks/:id` - Delete bookmark (protected)

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `createdAt`
- `updatedAt`

### Bookmarks Table
- `id` (Primary Key)
- `url`
- `title`
- `description`
- `tags` (Comma-separated)
- `userId` (Foreign Key)
- `createdAt`
- `updatedAt`

## Development Notes

- The backend uses Sequelize ORM which will automatically create tables on first run
- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- Input validation is implemented using express-validator
- CORS is configured to allow frontend-backend communication

## Troubleshooting

### Common Issues

1. **Database connection error:**
   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database and user exist

2. **Port conflicts:**
   - Backend default port: 5001
   - Frontend default port: 3000
   - Change ports in `.env` (backend) or package.json (frontend) if needed

3. **CORS errors:**
   - Ensure backend is running before starting frontend
   - Check API URL in frontend/src/services/api.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.
