import Joi from "joi";
import db from "../db.js";


export async function signUpValidate(req, res, next) {
    const body = req.body;

    const signUpSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required()
    })

    if (body.password !== body.confirmPassword) return res.status(400).send("As senhas precisam ser iguais");

    const { error } = signUpSchema.validate(body, { abortEarly: false });
    if (error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}

export async function emailExist(req, res, next) {
    const { email } = req.body

    try {
        const user = await db.collection('users').findOne({ email });
        if (user) res.status(409).send("E-mail já cadastrado");
    } catch (e) {
        res.sendStatus(500);
    }

    next();

}