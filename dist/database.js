"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Esta clase Pool es para poder tener una serie de conecciones que van a estar disponibles, para poder utilizarlo de mi codigo de node
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'typescript_database',
    port: 5432
});
