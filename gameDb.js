import chalk from "chalk";
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();

let gameDb = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    gameDb = mongoClient.db(process.env.GAMES_DATABASE_NAME);
    console.log(chalk.blue.bold('Connected in the database'))
} catch (error) {
    console.log(chalk.red.bold('Could not connect in the database'), e)
}

export default gameDb;