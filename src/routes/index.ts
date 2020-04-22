import { Router } from 'express'
import { getUsers, createUser, deleteUser, getUsersById, updateUser } from '../controllers/index.controller'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUsersById)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router