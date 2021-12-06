var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.get('/cartesPokemon/:pokemonName', async (req, res) => {
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${req.params.pokemonName}`;
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

router.get('/cartesPokemon/:pokemonName/:pokemonRarity', async (req, res) => {
    console.log("in the route");
    const url = `https://api.pokemontcg.io/v2/cards?q=name:${req.params.pokemonName}%20!rarity:"${req.params.pokemonRarity}"`;
    console.log(url);

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