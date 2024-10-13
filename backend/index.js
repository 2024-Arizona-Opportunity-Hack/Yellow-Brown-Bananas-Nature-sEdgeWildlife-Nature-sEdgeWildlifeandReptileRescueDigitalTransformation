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

// POST request to /intake-response
app.post('/intake-response', async (req, res) => {
    try {
        const { breed, colorization, gender, injury, speciesID, rescuerName, rescuerPhone } = req.body;
        const rescuerID = await databaseService.insertRescuer({ name: rescuerName, phone: rescuerPhone });
        await databaseService.insertRescuedAnimal({ breed, gender, colorization, injury, speciesID, rescuerID });

        res.json({ message: 'Intake response recorded successfully' });
    } catch (error) {
        console.error('Error processing intake response:', error);
        res.status(500).json({ error: 'An error occurred while processing the intake response' });
    }
});

// GET request to /intake-response
app.get('/intake-response', async (req, res) => {
    const intakeResponses = await databaseService.getIntakeResponses();
    res.json(intakeResponses);
});

// GET request to /rescued-animals
app.get('/rescued-animals', async (req, res) => {
    const rescuedAnimals = await databaseService.getAllRescuedAnimals();
    res.json(rescuedAnimals);
});

// DELETE request to /rescued-animals/:id
app.delete('/rescued-animals/:id', async (req, res) => {
    const { id } = req.params;
    const animal = await databaseService.getRescuedAnimalsByID(id);
    if (!animal) {
        res.status(404).json({ error: 'Rescued animal not found' });
        return;
    }

    const isDeleted = await databaseService.deleteRescuedAnimal(id);
    await databaseService.insertAdoptee(animal);

    if (isDeleted) {
        res.json({ message: 'Rescued animal deleted successfully' });
    } else {
        res.status(404).json({ error: 'Rescued animal not found' });
    }
});

// GET request to /intake-response/:id
app.get('/intake-response/:id', async (req, res) => {
    const { id } = req.params;
    const intakeResponse = await databaseService.getRescuedAnimalsByID(id);
    res.json(intakeResponse);
});

// POST request to /adoption-response
app.post('/adoption-response', async (req, res) => {
    try {
        const { address, age, email, job, name, phone, speciesID } = req.body;
        await databaseService.insertAdopter({ address, age, email, job, name, phone, speciesID });

        res.json({ message: 'Adoption response recorded successfully' });
    } catch (error) {
        console.error('Error processing adoption response:', error);
        res.status(500).json({ error: 'An error occurred while processing the adoption response' });
    }
});

// GET request to /species
app.get('/species', async (req, res) => {
    const species = await databaseService.getSpecies();
    res.json(species);
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
