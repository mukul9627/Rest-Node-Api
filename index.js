const express = require('express');
const userRoutes = require('./Routes/userRoutes'); // Ensure this is correctly exported

// Middleware function
const logRequestDetails = (req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next(); // Pass control to the next middleware or route handler
};

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(logRequestDetails); // Global middleware

// Use routes for /users endpoint
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
