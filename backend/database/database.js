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
    
    // Get ALL Adopters
    async getAllAdopters() {
        const db = await this.dbPromise;
        const adopters = await db.all('SELECT * FROM adopters');
        return adopters;
    }

    // Get ALL Adoptees
    async getAllAdoptees() {
        const db = await this.dbPromise;
        const adoptees = await db.all('SELECT * FROM adoptees and isActive = 1')
        return adoptees;
    }

    // Get Adopter by ID
    async getAdopterByID(aID) {
        const db = await this.dbPromise;
        const adopter = await db.get('SELECT * FROM adopters WHERE aID = ?', [aID]);
        // return adopter object
        return adopter;
    }   

    // Insert Adoptee
    async insertAdoptee({aName, aBreed, aGender, aAge}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adopters (aName, aBreed, aGender, aAge) VALUES (?, ?, ?, ?)', 
            [aName, aBreed, aGender, aAge]
        );
        // return true if insertion is successful. Else return false. 
        return result.changes > 0
    }

    // Get All Rescued Animals
    async getAllRescuedAnimals() {
        const db = await this.dbPromise;
        const allRescuedAnimals = await db.all('SELECT * FROM rescuedAnimals and isActive = 1');
        // return adopter object
        return allRescuedAnimals;
    }   

      // Get Adoptee by ID
    async getAllRescuedAnimalsID(aID) {
        const db = await this.dbPromise;
        const aRescuedAnimals = await db.get('SELECT * FROM rescuedAnimals WHERE aID = ? and isActive = 1', [aID]);
        // return adopter object
        return aRescuedAnimals;
    }   

  // Soft delete: Set isActive = 0 for the rescued animal with the given ID
    async deleteRescuedAnimal(anID) {
        const db = await this.dbPromise;
        const result = await db.run(
            'UPDATE adoptees SET isActive = 0 WHERE anID = ?', 
            [anID]
        );
        // Return true if the update affected any rows, otherwise false
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
