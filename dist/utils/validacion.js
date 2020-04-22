"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validar = (name, email, res) => {
    if (name === undefined || email === undefined) {
        console.log("Se ha entrado en la validacion");
        return res.status(500).send("Uno de los keys no es correcto ");
    }
    if (name === '' || email === '') {
        console.log("Uno de los valores del req.body es vacio");
        return res.status(500).send("No se puede enviar un valor vacio");
    }
};
