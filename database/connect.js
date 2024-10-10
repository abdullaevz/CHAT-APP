import chalk from "chalk";
import mongoose from "mongoose"

export const DBconnect = () => {
    mongoose.connect("mongodb+srv://natiqabdullayev150:natiq123@cluster0.ohq3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log(chalk.yellow("Connected to DB"));
        });
}