require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;
console.log(dbUrl);

mongoose.connect(dbUrl);

const todoSchema = mongoose.Schema({
    title: String,
    date: String,
    status: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
