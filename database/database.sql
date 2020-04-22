 CREATE DATABASE typescript_database;

 CREATE TABLE users(
     id SERIAL PRIMARY KEY, 
     name VARCHAR(40),
     email TEXT
 );

INSERT INTO users (name , email)
    VALUES ('joe', 'joe@gmail.com'),
            ('ryan', 'ryan@gmail.com ')