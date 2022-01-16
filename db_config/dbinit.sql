CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL UNIQUE PRIMARY KEY,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    specialization varchar(30) NOT NULL
);
CREATE TABLE IF NOT EXISTS services (
    id SERIAL UNIQUE PRIMARY KEY,
    service_name varchar(300) NOT NULL,
    description varchar(300) NOT NULL,
    price varchar(30) NOT NULL,
    doctor_id integer NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL UNIQUE PRIMARY KEY,
    full_name varchar(30) NOT NULL,
    time_interval varchar(30) NOT NULL,
    service_id integer NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
