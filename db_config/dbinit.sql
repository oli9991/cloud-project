CREATE TABLE IF NOT EXISTS countries (
    id SERIAL UNIQUE PRIMARY KEY,
    nume varchar(30) NOT NULL UNIQUE,
    lat double precision NOT NULL,
    lon double precision NOT NULL
);
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL UNIQUE PRIMARY KEY,
    idTara int NOT NULL,
    nume varchar(30) NOT NULL,
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    FOREIGN KEY (idTara) REFERENCES countries(id) ON DELETE CASCADE,
    CONSTRAINT idTara_nume UNIQUE (idTara, nume)
);
CREATE TABLE IF NOT EXISTS temperatures (
    id SERIAL UNIQUE PRIMARY KEY,
    valoare double precision NOT NULL,
    timestamp_t timestamp NOT NULL,
    idOras int NOT NULL,
    FOREIGN KEY (idOras) REFERENCES cities(id) ON DELETE CASCADE,
    CONSTRAINT idOras_time UNIQUE (idOras, timestamp_t)
);
