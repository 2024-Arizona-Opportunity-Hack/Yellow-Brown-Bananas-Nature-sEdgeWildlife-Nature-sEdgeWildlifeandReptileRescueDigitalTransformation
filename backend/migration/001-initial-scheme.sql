-- Up

CREATE TABLE tasks (
    taskID      INTEGER PRIMARY KEY AUTOINCREMENT
                UNIQUE,
    userID      INTEGER,
    taskDesc    TEXT,
    isComplete BOOLEAN,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

CREATE TABLE users (
    userID      INTEGER PRIMARY KEY AUTOINCREMENT
                UNIQUE,
    username STRING NOT NULL UNIQUE,
    passwordHash STRING
);

CREATE TABLE AuthTokens (
    token       STRING NOT NULL UNIQUE,
    userID      INTEGER NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(id) 
);

-- Down
DROP TABLE tasks;
DROP TABLE users;
DROP TABLE AuthTokens;

