const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const dbPath = "./database.sqlite";

class Database {
    constructor() {
        this.dbPromise = sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
    }
    
    async setup(args) {
        const db = await this.dbPromise; // Await the resolved database promise to get the database connection
        await db.migrate({
            force: args.force,
            // migrationsPath: "./migrations",
        }); // Run the migration function to create the database tables
        console.log("Database service is running.");

        // Insert initial species data if the table is empty
        const speciesCount = await db.get('SELECT COUNT(*) as count FROM species');
        if (speciesCount.count === 0) {
            const initialSpecies = [
                { sType: 'Snake' },
                { sType: 'Lizard' },
                { sType: 'Turtle' },
                { sType: 'Tortoise' },
                { sType: 'Owl' },
                { sType: 'Bird' },
                { sType: 'Crocodile' },
                { sType: 'Alligator' }
            ];
            for (const species of initialSpecies) {
                await db.run('INSERT INTO species (sType) VALUES (?)', [species.sType]);
            }
            console.log("Initial species data inserted.");
        }
    }

    getDB() {
        return this.dbPromise;
    }

    // ADOPTER
    // Insert Adopter 
    async insertAdopter({name, email, phone, address, age, ajob, speciesID}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adopters (name, email, phone, address, age, ajob, speciesID) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, email, phone, address, age, ajob, speciesID]
        );
        // return true if insertion is successful. Else return false. 
        return result.lastID || null;
    }

    // Get Adopter by ID
    async getAdopterByID(ID) {
        const db = await this.dbPromise;
        const adopter = await db.get('SELECT * FROM adopters WHERE ID = ?', [ID]);
        // return adopter object
        return adopter;
    }

    // Get ALL Adopters
    async getAllAdopters() {
        const db = await this.dbPromise;
        const adopters = await db.all('SELECT * FROM adopters');
        return adopters;
    }

    // ADOPTEE
    // Insert Adoptee
    async insertAdoptee({speciesID, breed, gender, age}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adoptees (speciesID, breed, gender, age, isActive) VALUES (?, ?, ?, ?, ?)', 
            [speciesID, breed, gender, age, true]
        );
        // return true if insertion is successful. Else return false. 
        return result.lastID || null;
    }

    // Get Adoptee by ID
    async getAdopteeByID(ID) {
        const db = await this.dbPromise;
        const adoptee = await db.get('SELECT * FROM adoptees WHERE ID = ? AND isActive = ?', [ID, true]);
        return adoptee; 
    }

    // Get ALL Adoptees
    async getAllAdoptees() {
        const db = await this.dbPromise;
        const adoptees = await db.all('SELECT * FROM adoptees WHERE isActive = 1');
        return adoptees;
    }

    // Soft delete: Set isActive = 0 for the adoptee with the given ID
    async deleteAdoptee(ID) {
        const db = await this.dbPromise;
        const result = await db.run(
            'UPDATE adoptees SET isActive = 0 WHERE ID = ?', 
            [ID]
        );
        return result.changes > 0;
    }

    // RESCUED ANIMAL
    // Get All Rescued Animals
    async getAllRescuedAnimals() {
        const db = await this.dbPromise;
        const allRescuedAnimals = await db.all('SELECT * FROM rescuedAnimals WHERE isActive = 1');
        return allRescuedAnimals;
    }   

    // Get Rescued Animal by ID
    async getRescuedAnimalsByID(ID) {
        const db = await this.dbPromise;
        const aRescuedAnimal = await db.get('SELECT * FROM rescuedAnimals WHERE ID = ? AND isActive = ?', [ID, true]);
        return aRescuedAnimal;
    }

    // Insert Rescued Animal
    async insertRescuedAnimal({ breed, gender, colorization, injury, rescuerID, speciesID}) {
        const db = await this.dbPromise;
        
        const result = await db.run(
            'INSERT INTO rescuedAnimals (breed, gender, speciesID, colorization, injury, rescuerID, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [breed, gender, speciesID, colorization, injury, rescuerID, true]
        );
        
        return result.lastID || null;
    }

    // Soft delete: Set isActive = 0 for the rescued animal with the given ID
    async deleteRescuedAnimal(ID) {
        const db = await this.dbPromise;
        const result = await db.run(
            'UPDATE rescuedAnimals SET isActive = 0 WHERE ID = ?', 
            [ID]
        );
        return result.changes > 0;
    }

    // RESCUER
    // Insert Rescuer
    async insertRescuer({name, phone}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO rescuers (rName, rPhoneNumber) VALUES (?, ?)', 
            [name, phone]
        );
        return result.lastID || null;
    }

    // Get ALL species
    async getSpecies() {
        const db = await this.dbPromise;
        const species = await db.all('SELECT * FROM species');
        return species;
    }
}

module.exports = new Database();
