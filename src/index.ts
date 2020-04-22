import express from 'express'
const app = express()

import indexRoutes from './routes/index'

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(indexRoutes)
app.listen(3000, () => {
    console.log('Server en puerto: ', 3000);

})