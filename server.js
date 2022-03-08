// server.js
const express = require("express");
const mongoose = require("mongoose"); // connexion à mongoose
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilder");
const app = express();

//database
mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", { autoIndex: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
  
//Middleware
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/wilder/read", wilderController.readAll);
app.get("/api/wilder/read/:id", wilderController.read);
app.post("/api/wilder/create", wilderController.create);
app.put("/api/wilder/update/:id", wilderController.update);
app.delete("/api/wilder/delete/:id", wilderController.delete);

//start server
const PORT = 3000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
