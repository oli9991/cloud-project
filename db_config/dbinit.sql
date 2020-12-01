CREATE TABLE IF NOT EXISTS countries (
    id serial PRIMARY KEY,
    name_country varchar(15) NOT NULL UNIQUE,
    lat double precision NOT NULL,
    long double precision NOT NULL
);
CREATE TABLE IF NOT EXISTS cities (
    id serial PRIMARY KEY,
    id_country int NOT NULL UNIQUE,
    name_city varchar(15) NOT NULL UNIQUE,
    lat double precision NOT NULL,
    long double precision NOT NULL,
    FOREIGN KEY (id_country) REFERENCES countries(id)
);
CREATE TABLE IF NOT EXISTS temperatures (
    id serial PRIMARY KEY,
    value serial NOT NULL,
    timestamp varchar(15) NOT NULL UNIQUE,
    id_city int NOT NULL UNIQUE,
    FOREIGN KEY (id_city) REFERENCES cities(id)
);
