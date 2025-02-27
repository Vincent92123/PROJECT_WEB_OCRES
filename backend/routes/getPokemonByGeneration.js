var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.get("/allPokemonGen/:number", async (req, res) => {
    console.log("/pokemon_generation endpoint called");
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${req.params.number}`;
    const options = {
        "method": "GET",
    };

    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });
    res.json(response);
});

router.get("/one_pokemon_gen/:pokemonName", async (req, res) => {
    console.log("/one_pokemon_gen endpoint called");
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.pokemonName}`;
    const options = {
        "method": "GET",
    };

    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });
    res.json(response);
});

module.exports = router;