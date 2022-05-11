import db from "../db.js";
import {v4 as uuid} from 'uuid';

const login = async (req, res) => {
    try {
        const user = req.user;
        const username = user.name;
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
            });
        return res.status(200).send({
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Erro ao logar");
    }
}
export default login;