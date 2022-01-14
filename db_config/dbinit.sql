CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL UNIQUE PRIMARY KEY,
    first_name varchar(30) NOT NULL UNIQUE,
    last_name varchar(30) NOT NULL UNIQUE,
    specialization varchar(30) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS services (
    id SERIAL UNIQUE PRIMARY KEY,
    service_name varchar(30) NOT NULL UNIQUE,
    description varchar(30) NOT NULL UNIQUE,
    price integer NOT NULL UNIQUE,
    doctor_id integer NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL UNIQUE PRIMARY KEY,
    full_name varchar(30) NOT NULL UNIQUE,
    time_interval varchar(30) NOT NULL,
    service_id integer NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
