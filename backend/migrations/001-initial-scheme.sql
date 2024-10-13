-- Up
-- INTAKE FORM -------------------------------------------------------------------------------------------------------
CREATE TABLE species (
    sID INTEGER PRIMARY KEY,
    sType TEXT NOT NULL  
);

CREATE TABLE breed (
    bID INTEGER PRIMARY KEY,
    bType TEXT NOT NULL,
    speciesID INTEGER
);

CREATE TABLE rescuer (
    rID INTEGER PRIMARY KEY,
    rName TEXT NOT NULL,
    rPhoneNumber INTEGER
);

CREATE TABLE animalInfo (
    aID INTEGER PRIMARY KEY,
    gender TEXT NOT NULL,
    aSpeciesID INTEGER,
    aBreedID INTEGER,
    colorization TEXT NOT NULL,
    injury TEXT NOT NULL
);

CREATE TABLE media (
    mediaID INTEGER PRIMARY KEY,   -- Unique identifier for each media entry
    mediaType TEXT NOT NULL,       -- Type of media (e.g., 'photo', 'video')
    mediaURL TEXT NOT NULL,        -- URL or path to the media file
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the media was added
);

-- INTAKE FORM -------------------------------------------------------------------------------------------------------

-- ADOPTION FORM -----------------------------------------------------------------------------------------------------
CREATE TABLE adopter (
    aID INTEGER PRIMARY KEY,
    aName TEXT NOT NULL,
    aEmail TEXT NOT NULL,
    aPhone TEXT NOT NULL,
    aAddress TEXT NOT NULL,
    aAGE TEXT NOT NULL,
    aJob TEXT NOT NULL,
    aPrevAdoptees TEXT NOT NULL
);


CREATE TABLE animal (
    anID INTEGER PRIMARY KEY, -- This ID will link to Species ID
    aName TEXT NOT NULL,
    aBreed TEXT NOT NULL, 
    aGender TEXT NOT NULL, 
    aAge INTEGER 
);
-- ADOPTION FORM -----------------------------------------------------------------------------------------------------


-- User --------------------------------------------------------------------------------------------------------------
CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    passwordHashed VARCHAR(255) NOT NULL
);
-- User --------------------------------------------------------------------------------------------------------------

-- Down
DROP TABLE species;
DROP TABLE breed;
DROP TABLE animalInfo;
DROP TABLE media;
DROP TABLE adopter;
DROP TABLE animal;
DROP TABLE users;


