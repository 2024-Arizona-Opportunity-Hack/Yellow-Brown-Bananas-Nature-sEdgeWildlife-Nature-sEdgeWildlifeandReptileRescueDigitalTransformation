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
    }

    getDB() {
        return this.dbPromise;
    }

    // ADOPTER
    // Insert Adopter 
    async insertAdopter({aName, aEmail, aPhone, aAddress, aAge, aJob}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adopters (aName, aEmail, aPhone, aAddress, aAge, aJob) VALUES (?, ?, ?, ?, ?, ?)', 
            [aName, aEmail, aPhone, aAddress, aAge, aJob]
        );
        // return true if insertion is successful. Else return false. 
        return result.changes > 0
    }

    // Get Adopter by ID
    async getAdopterByID(aID) {
        const db = await this.dbPromise;
        const adopter = await db.get('SELECT * FROM adopters WHERE aID = ?', [aID]);
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
    async insertAdoptee({aName, aBreed, aGender, aAge}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adoptees (aName, aBreed, aGender, aAge, isActive) VALUES (?, ?, ?, ?, ?)', 
            [aName, aBreed, aGender, aAge, true]
        );
        // return true if insertion is successful. Else return false. 
        return result.changes > 0;
    }

    // Get Adoptee by ID
    async getAdopteeByID(aID) {
        const db = await this.dbPromise;
        const adoptee = await db.get('SELECT * FROM adoptees WHERE aID = ? AND isActive = ?', [aID, true]);
        return adoptee; 
    }

    // Get ALL Adoptees
    async getAllAdoptees() {
        const db = await this.dbPromise;
        const adoptees = await db.all('SELECT * FROM adoptees and isActive = 1')
        return adoptees;
    }

    // Soft delete: Set isActive = 0 for the adoptee with the given ID
    async deleteAdoptee(anID) {
        const db = await this.dbPromise;
        const result = await db.run(
            'UPDATE adoptees SET isActive = 0 WHERE aID = ?', 
            [anID]
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
    async getRescuedAnimalsByID(aID) {
        const db = await this.dbPromise;
        const aRescuedAnimal = await db.get('SELECT * FROM rescuedAnimals WHERE aID = ? and isActive = ?', [aID, true]);
        return aRescuedAnimal;
    }

    // Insert Rescued Animal
    async insertRescuedAnimal({aName, aBreed, aGender, aAge, aRescuer, aDateRescued}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO rescuedAnimals (aName, aBreed, aGender, aAge, aRescuer, aDateRescued, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [aName, aBreed, aGender, aAge, aRescuer, aDateRescued, true]
        );
        return result.changes > 0;
    }

    // Soft delete: Set isActive = 0 for the rescued animal with the given ID
    async deleteRescuedAnimal(aID) {
        const db = await this.dbPromise;
        const result = await db.run(
            'UPDATE rescuedAnimals SET isActive = 0 WHERE aID = ?', 
            [aID]
        );
        return result.changes > 0;
    }

    // Get ALL species
    async getSpecies() {
        const db = await this.dbPromise;
        const species = await db.all('SELECT * FROM species');
        return species;
    }
}

module.exports = new Database();
