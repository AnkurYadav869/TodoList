const express = require("express");
const { Todo } = require("../db");
const router = express.Router();
router.use(express.json());

router.get("", async (req, res) => {
    try {
        const todoList = await Todo.find({});
        res.json({ todoList });
    } catch (e) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, date, status } = req.body;

        const todoAdded = await Todo.create({
            title,
            date,
            status,
        });
        if (todoAdded) {
            res.json({ msg: "Todo added" });
        }
    } catch (e) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(e);
    }
});

router.put("/:todoId", async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const status = req.body.status;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId },
            { status },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (e) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(e);
    }
});

router.delete("/:todoId", async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const isdeleted = await Todo.findOneAndDelete({ _id: todoId });
        if (isdeleted) {
            res.json({ msg: "Todo deleted successfully" });
        } else {
            res.json({ msg: "Todo not found" });
        }
    } catch (e) {
        res.status(500).json({ msg: "something went wrong" });
        console.log(e);
    }
});

module.exports = { router };
