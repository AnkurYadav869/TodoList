const express = require("express");
const todoRouter = require("./route/todoRouter");
const cors = require("cors");
const app = express();
const port = process.env.PORT_NUMBER | 3000;

app.use(cors());
app.use("/api/todo", todoRouter.router);

app.listen(port, () => {
    console.log("Server started at port", port);
});
