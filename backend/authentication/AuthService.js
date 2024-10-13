const bcrypt = require('bcrypt');
const database = require('../database/database.js');

const salt = 10;

class AuthService {
    async authenticate(username, password) {
        const db = await database.getDB();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) return false; // if no user found, return false
        // if the hashed password matches the password in the database, return true
        if (await bcrypt.compare(password, user.passwordHashed)) return true;
        // otherwise, return false
        return false;
    }

    async register(username, password) {
        const db = await database.getDB();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        const passwordHashed = await bcrypt.hash(password, salt);

        if (user) return false; // if user already exists, return false

        await db.run('INSERT INTO users (username, passwordHashed) VALUES (?, ?)', [username, passwordHashed]);
        return true;
    }
}

module.exports = new AuthService();
