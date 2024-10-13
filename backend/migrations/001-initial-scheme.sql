-- Up
-- INTAKE FORM -------------------------------------------------------------------------------------------------------
CREATE TABLE species (
    sID INTEGER PRIMARY KEY,
    sType TEXT NOT NULL UNIQUE
);

CREATE TABLE rescuers (
    rID INTEGER PRIMARY KEY,
    rName TEXT NOT NULL,
    rPhoneNumber INTEGER
);

CREATE TABLE rescuedAnimals (
    ID INTEGER PRIMARY KEY,
    gender TEXT NOT NULL,
    speciesID INTEGER,
    breed TEXT,
    colorization TEXT NOT NULL,
    injury TEXT NOT NULL,
    rescuerID INTEGER NOT NULL,
    isActive BOOLEAN NOT NULL,
    FOREIGN KEY (rescuerID) REFERENCES rescuers(rID),
    FOREIGN KEY (SpeciesID) REFERENCES species(sID)
);

CREATE TABLE medias (
    mediaID INTEGER PRIMARY KEY,   -- Unique identifier for each media entry
    mediaType TEXT NOT NULL,       -- Type of media (e.g., 'photo', 'video')
    mediaURL TEXT NOT NULL,        -- URL or path to the media file
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the media was added
);

-- ADOPTION FORM -----------------------------------------------------------------------------------------------------
CREATE TABLE adopters (
    ID INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    age TEXT NOT NULL,
    ajob TEXT NOT NULL,
    speciesID INTEGER, -- preferred species
    FOREIGN KEY (speciesID) REFERENCES species(sID)
);

CREATE TABLE adoptees (
    ID INTEGER PRIMARY KEY,
    speciesID INTEGER,
    breed TEXT NOT NULL, 
    gender TEXT NOT NULL, 
    age INTEGER,
    isActive BOOLEAN NOT NULL,
    FOREIGN KEY (speciesID) REFERENCES species(sID)
);

-- User --------------------------------------------------------------------------------------------------------------
CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    passwordHashed VARCHAR(255) NOT NULL
);

-- Down
DROP TABLE species;
DROP TABLE rescuers;
DROP TABLE rescuedAnimals;
DROP TABLE medias;
DROP TABLE adopters;
DROP TABLE adoptees;
DROP TABLE users;
