"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const validacion_1 = require("../utils/validacion");
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        let codigo = error.code;
        let mensajeError = codigo === '42P01' ? "ERROR: relation '[Table name]' does not exist" : "Error al obtener usuarios";
        return res.status(500).json(error);
    }
});
exports.getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query(`SELECT * FROM users where id=${id}`);
    return res.status(201).json(response.rows[0]);
});
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    console.log(name);
    console.log(email);
    validacion_1.validar(name, email, res);
    const response = yield database_1.pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    return res.json({
        message: "Usuario creado satisfactoriamente",
        body: {
            user: {
                name,
                email
            }
        }
    });
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const id = req.params.id;
    validacion_1.validar(name, email, res);
    const response = yield database_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    return res.json({
        message: `Usuario actualizado con id: ${id}`,
        body: {
            user: {
                name,
                email
            }
        }
    });
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const usuarioSeleccionado = yield database_1.pool.query(`SELECT * FROM users where id=${id}`);
    // const {name} = usuarioSeleccionado.rows
    const { name } = usuarioSeleccionado.rows[0];
    const response = yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
    return res.json({ message: `El usuario ${name} ha sido borrado ` });
});
