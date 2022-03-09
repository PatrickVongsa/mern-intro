// server.js
const express = require("express");
const mongoose = require("mongoose"); // connexion à mongoose
const asyncHandler = require('express-async-handler')
const createError = require('http-errors');

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

app.get("/api/wilder/read", asyncHandler(wilderController.readAll));
app.get("/api/wilder/read/:id", asyncHandler(wilderController.read));
app.post("/api/wilder/create", asyncHandler(wilderController.create));
app.put("/api/wilder/update/:id", asyncHandler(wilderController.update));
app.delete("/api/wilder/delete/:id", asyncHandler(wilderController.delete));

app.use((error, req, res, next) => {
  // Sets HTTP status code
  res.status(error.status)

  // Sends response
  res.json({ message: error.message })
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
//start server
const PORT = 3000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
