import { Request, Response, response } from 'express'
import { pool } from '../database'
import { QueryResult } from 'pg'
import { validar } from '../utils/validacion'



export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users')
        return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error);

        let codigo = error.code
        let mensajeError = codigo === '42P01' ? "ERROR: relation '[Table name]' does not exist" : "Error al obtener usuarios"
        return res.status(500).json(error)
    }
}
export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query(`SELECT * FROM users where id=${id}`)
    return res.status(201).json(response.rows[0])

}
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body;
    console.log(name);
    console.log(email);
    validar(name, email, res)

    const response: QueryResult = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
    return res.json({
        message: "Usuario creado satisfactoriamente",
        body: {
            user: {
                name,
                email
            }
        }
    })

}
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email } = req.body
    const id = req.params.id
    validar(name, email, res)
    const response: QueryResult = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    return res.json({
        message: `Usuario actualizado con id: ${id}`,
        body: {
            user: {
                name,
                email
            }
        }
    })

}
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    const usuarioSeleccionado: QueryResult = await pool.query(`SELECT * FROM users where id=${id}`)
    // const {name} = usuarioSeleccionado.rows
    const { name } = usuarioSeleccionado.rows[0]

    const response: QueryResult = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return res.json({ message: `El usuario ${name} ha sido borrado ` })
}