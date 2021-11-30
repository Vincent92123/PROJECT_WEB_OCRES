var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.get('/pokemonStat/:pokemonName', async (req, res) => {
    console.log("/pokemonStat endpoint called");
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.pokemonName}`;
    const options = {
        "method": "GET",
    };

    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });
    console.log("response: ", response);
    res.json(response);
});

router.get('/pokemonNameFr/:pokemonId', async (req, res) => {
    console.log("/pokemonNameFr endpoint called");
    const url = `https://pokeapi.co/api/v2/pokemon-species/${req.params.pokemonId}`;
    const options = {
        "method": "GET",
    };

    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });
    console.log("response: ", response);
    res.json(response);
});

module.exports = router;