var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
require('dotenv').config();

var getPokemonRouter = require("./routes/getPokemon");
var getPokemonByGenerationRouter = require("./routes/getPokemonByGeneration");
var getCartesPokemonRouter = require("./routes/getCartesPokemon");
var getAPIRouter = require("./routes/apiRoutes.js");;


var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/getPokemon", getPokemonRouter);
app.use("/getPokemonByGeneration", getPokemonByGenerationRouter);
app.use("/", getAPIRouter);
app.use("/getCartesPokemon", getCartesPokemonRouter);


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;