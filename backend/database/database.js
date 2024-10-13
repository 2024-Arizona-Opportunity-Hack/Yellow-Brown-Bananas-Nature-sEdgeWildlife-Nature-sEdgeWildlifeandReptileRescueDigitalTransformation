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

    // Insert Adopter 
    async insertAdopter({aName, aEmail, aPhone, aAddress, aAge, aJob}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adopter (aName, aEmail, aPhone, aAddress, aAge, aJob) VALUES (?, ?, ?, ?, ?, ?)', 
            [aName, aEmail, aPhone, aAddress, aAge, aJob]
        );
        // return true if insertion is successful. Else return false. 
        return result.changes > 0
    }
    
    // Get ALL Adopters
    async getAllAdopters() {
        const db = await this.dbPromise;
        const adopters = await db.all('SELECT * FROM adopter');
        return adopters;
    }

    // Get ALL Adoptees
    async getAllAdoptees() {
        const db = await this.dbPromise;
        const adoptees = await db.all('SELECT * FROM adoptees')
        return adoptees;
    }

    // Get Adoptee by ID
    async getAdopterByID(aID) {
        const db = await this.dbPromise;
        const adopter = await db.get('SELECT * FROM adopter WHERE aID = ?', [aID]);
        // return adopter object
        return adopter;
    }   

    // Insert Adoptee
    async insertAdoptee({aName, aBreed, aGender, aAge}) {
        const db = await this.dbPromise;
        const result = await db.run(
            'INSERT INTO adopter (aName, aBreed, aGender, aAge) VALUES (?, ?, ?, ?)', 
            [aName, aBreed, aGender, aAge]
        );
        // return true if insertion is successful. Else return false. 
        return result.changes > 0
    }
}

module.exports = new Database();
