const express = require("express");
const cors = require('cors');

// DB Service
const databaseService = require('./database/database.js'); 
// Auth Service
const authenticationService = require('./authentication/AuthService.js');

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// POST request to /login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const isAuthenticated = await authenticationService.authenticate(username, password);

    if (isAuthenticated) {
        res.status(200).send('Authenticated');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// POST request to /register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const isRegistered = await authenticationService.register(username, password);

    if (isRegistered) {
        res.status(200).send('Registered');
    } else {
        res.status(409).send('Conflict');
    }
});



// Set up function
async function setup() {
    try {
        await databaseService.setup({ force: true }); // Set up the database from migrations
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`); // Log the server's listening status
        });
    } catch (error) {
        console.error("Error during setup:", error);
    }
}

setup();
