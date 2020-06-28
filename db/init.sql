CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password TEXT,
    role_id INT REFERENCES roles(id)
);

CREATE TABLE user_info(
    info_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    alt_name VARCHAR(100),
    location VARCHAR(50),
    user_id INT REFERENCES users(id) 
);

CREATE TABLE pokemon(
    poke_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    dex INT,
    trade BOOLEAN,
    cp INT,
    url TEXT,
    user_id INT REFERENCES users(id) 
);