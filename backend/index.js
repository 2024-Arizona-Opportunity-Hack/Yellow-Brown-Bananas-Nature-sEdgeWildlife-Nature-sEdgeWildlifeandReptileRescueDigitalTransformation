const express = require("express"); // Import Express.js web framework

// Call to DB service
const databaseService = require('./database/database.js'); 

const app = express();
const port = 3000;

// Set up function
async function setup() {
    databaseService.setup({ force: true }); // Set up the database from migrations
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`); // Log the server's listening status
    });
}

setup();
