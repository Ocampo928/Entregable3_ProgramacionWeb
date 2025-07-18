
DROP DATABASE IF EXISTS equipos_pokemon;
CREATE DATABASE equipos_pokemon;
USE equipos_pokemon;

CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE pokemones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen_url TEXT,
    equipo_id INT,
    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);
