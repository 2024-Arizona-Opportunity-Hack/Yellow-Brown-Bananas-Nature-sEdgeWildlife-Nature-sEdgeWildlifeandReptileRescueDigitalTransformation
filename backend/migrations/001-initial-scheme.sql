-- Up

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    passwordHashed VARCHAR(255) NOT NULL
);

-- Down
DROP TABLE users;
