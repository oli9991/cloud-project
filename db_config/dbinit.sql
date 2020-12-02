CREATE TABLE IF NOT EXISTS countries (
    id SERIAL UNIQUE PRIMARY KEY,
    nume varchar(30) NOT NULL UNIQUE,
    lat double precision NOT NULL,
    lon double precision NOT NULL
);
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL UNIQUE PRIMARY KEY,
    idTara int NOT NULL UNIQUE,
    nume varchar(30) NOT NULL UNIQUE,
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    FOREIGN KEY (idTara) REFERENCES countries(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS temperatures (
    id SERIAL UNIQUE PRIMARY KEY,
    valoare double precision NOT NULL,
    timestamp_t timestamp NOT NULL UNIQUE,
    idOras int NOT NULL UNIQUE,
    FOREIGN KEY (idOras) REFERENCES cities(id) ON DELETE CASCADE
);
