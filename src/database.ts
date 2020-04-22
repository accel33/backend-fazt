import { Pool } from 'pg'

// Esta clase Pool es para poder tener una serie de conecciones que van a estar disponibles, para poder utilizarlo de mi codigo de node

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'typescript_database',
    port: 5432
});