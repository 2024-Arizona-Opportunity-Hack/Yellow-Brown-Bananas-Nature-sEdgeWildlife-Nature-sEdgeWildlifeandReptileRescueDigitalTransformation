-- Up
-- INTAKE FORM -------------------------------------------------------------------------------------------------------
CREATE TABLE species (
    speciesID INTEGER PRIMARY KEY,
    sType TEXT NOT NULL  
);

CREATE TABLE breed (
    breedID INTEGER PRIMARY KEY,
    bType TEXT NOT NULL
);

CREATE TABLE gender (
    gID INTEGER PRIMARY KEY,
    gType TEXT NOT NULL
);

CREATE TABLE coloration (
    cID INTEGER PRIMARY KEY,
    cColor TEXT NOT NULL
);

CREATE TABLE injury (
    iID INTEGER PRIMARY KEY,
    iType TEXT NOT NULL
);

CREATE TABLE media (
    mediaID INTEGER PRIMARY KEY,   -- Unique identifier for each media entry
    mediaType TEXT NOT NULL,       -- Type of media (e.g., 'photo', 'video')
    mediaURL TEXT NOT NULL,        -- URL or path to the media file
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the media was added
);

-- INTAKE FORM -------------------------------------------------------------------------------------------------------

-- ADOPTION FORM -----------------------------------------------------------------------------------------------------
CREATE TABLE animal (
    sAnimalID INTEGER PRIMARY KEY,
    aName TEXT NOT NULL,  
    breed TEXT NOT NULL, 
    gender TEXT NOT NULL, 
    age INTEGER 
);

CREATE TABLE email (
    eID INTEGER PRIMARY KEY,
    email TEXT NOT NULL  
);

CREATE TABLE phone (
    pID INTEGER PRIMARY KEY,
    phone TEXT NOT NULL  
);

CREATE TABLE address (
    aID INTEGER PRIMARY KEY,
    aAddress TEXT NOT NULL  
);

CREATE TABLE age (
    ageID INTEGER PRIMARY KEY,
    age TEXT NOT NULL  
);

CREATE TABLE job (
    jID INTEGER PRIMARY KEY,
    job TEXT NOT NULL  
);

CREATE TABLE prevAdoptions (
    pID INTEGER PRIMARY KEY,
    prevAdopt TEXT NOT NULL  
);

-- species is already declared in INTAKE area

-- ADOPTION FORM -----------------------------------------------------------------------------------------------------


-- User --------------------------------------------------------------------------------------------------------------

-- User --------------------------------------------------------------------------------------------------------------


-- Down
DROP TABLE species;
DROP TABLE breed;
DROP TABLE gender;
DROP TABLE coloration;
DROP TABLE injury;
DROP TABLE media;



