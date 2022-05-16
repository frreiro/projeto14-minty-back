

import Joi from "joi";

export async function searchValidate(req, res, next) {
    const { name } = req.params
    const searchSchema = Joi.string().min(1).required();

    const { error } = searchSchema.validate(name);
    if (error) return res.status(404).send("Pesquisa inválida");
    else next();


}