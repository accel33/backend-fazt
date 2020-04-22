import { Response } from "express";

export const validar = (name: string, email: string, res: Response) => {
    if (name === undefined || email === undefined) {
        console.log("Se ha entrado en la validacion");
        return res.status(500).send("Uno de los keys no es correcto ")
    }
    if (name === '' || email === '') {
        console.log("Uno de los valores del req.body es vacio");
        return res.status(500).send("No se puede enviar un valor vacio")
    }
}