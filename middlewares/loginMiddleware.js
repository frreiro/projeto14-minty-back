import Joi from "joi";
import db from "../db.js";
import bcrypt from "bcrypt";

export async function loginValidate(req, res, next) {
    const body = req.body;

    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    const { error } = loginSchema.validate(body, { abortEarly: false });
    if (error) return res.status(422).send(error.details.map(detail => detail.message));

    const { email, password } = body;

    try {
        const user = await db.collection('users').findOne({ email });
        if (!user) return res.status(404).send("Usuário não encontrado");

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).send("Senha inválida");

        req.user = user;
    }
    catch (e) {
        res.status(500).send("Algo deu errado");
        console.log(e);
    }

    next();
}