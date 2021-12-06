import React, { Component } from "react";
import Axios from "axios";
import "./DisplayCartesPokemon.css"


function CarteArea(props) {
    return (
        <div className="SingleCarteWidget">

            <div className="addRadius">
                <img src={props.src} data-key={props.i} width={250} />
            </div>
            <div className="dataArea">
                <h3>Release date : {props.releaseDate} </h3>
                <h3>Current average price : {props.averagePrice}$</h3>
                <h3> Artist : {props.artist} </h3>
            </div>

        </div>


    );
}

class DisplayCartesPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {

            pokemonName: "",
            pokemonRarity: "/",
            pokemonLoading: "",
            arrayOfCartes: [],
            arrayOfReleaseDates: [],
            arrayOfPrices: [],
            arrayOfArtists: [],
            cartesAmount: "",
            currentCarte: null,

        };
    }

    handlePokemonNameChange = (e) => {
        this.setState({ pokemonName: e.target.value });
    }

    handlePokemonRarityChange = (e) => {
        this.setState({ pokemonRarity: e.target.value, });

    }

    handleCarteChosen = (e) => {
        this.setState({ currentCarte: e.target.dataset.key });
    }



    searchCartesPokemon = () => {
        //this.setState({ pokemonLoading: true });
        this.setState({ currentCarte: "/" });
        if (this.state.pokemonRarity == "/") {

            Axios.get(`http://localhost:5000/getCartesPokemon/cartesPokemon/${this.state.pokemonName}`)
                .then(res => {
                    if (res.status === 200 && res != null) {

                        var listOfCartesImg = [];
                        var listOfPrices = [];
                        var listOfReleaseDates = [];
                        var listOfArtists = [];

                        //push

                        try {
                            for (var i = 0; i < res.data.totalCount && i < 71; i++) {

                                listOfCartesImg[i] = res.data.data[i].images.large;
                                listOfPrices[i] = res.data.data[i].cardmarket.prices.averageSellPrice;
                                listOfReleaseDates[i] = res.data.data[i].set.releaseDate;
                                listOfArtists[i] = res.data.data[i].artist;
                            }
                        } catch (err) {
                            console.log(err);
                        }

                        this.setState(function (state, props) {
                            return {
                                arrayOfCartes: listOfCartesImg,
                                arrayOfPrices: listOfPrices,
                                arrayOfReleaseDates: listOfReleaseDates,
                                arrayOfArtists: listOfArtists,
                                cartesAmount: res.data.totalCount,

                            }



                        });

                    } else {
                        console.log('problem in no rarity call');
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        } else {

            Axios.get(`http://localhost:5000/getCartesPokemon/cartesPokemon/${this.state.pokemonName}/${this.state.pokemonRarity}`)
                .then(res => {
                    if (res.status === 200 && res != null) {

                        var listOfCartesImg = [];
                        var listOfPrices = [];
                        var listOfReleaseDates = [];
                        var listOfArtists = [];

                        for (var i = 0; i < res.data.totalCount; i++) {
                            listOfCartesImg[i] = res.data.data[i].images.large;
                            listOfPrices[i] = res.data.data[i].cardmarket.prices.averageSellPrice;
                            listOfReleaseDates[i] = res.data.data[i].set.releaseDate;
                            listOfArtists[i] = res.data.data[i].artist;
                        }

                        this.setState({
                            arrayOfCartes: listOfCartesImg,
                            arrayOfPrices: listOfPrices,
                            arrayOfReleaseDates: listOfReleaseDates,
                            arrayOfArtists: listOfArtists,
                            cartesAmount: res.data.totalCount,

                        });

                    } else {
                        console.log('problem in rarity call');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    render() {

        var thelist = [];
        for (var i = 0; i < this.state.cartesAmount; i++) {
            thelist.push(<img src={this.state.arrayOfCartes[i]} className="CarteStyle" data-key={i} width={50} onClick={this.handleCarteChosen} />);

        };

        if (!this.state.currentCarte) {
            console.log("no card selected")

        } else {
            console.log(this.state.currentCarte)

            var theChosenOne = <CarteArea
                src={this.state.arrayOfCartes[this.state.currentCarte]}
                releaseDate={this.state.arrayOfReleaseDates[this.state.currentCarte]}
                averagePrice={this.state.arrayOfPrices[this.state.currentCarte]}
                artist={this.state.arrayOfArtists[this.state.currentCarte]}

            />

        }




        return (

            <div>


                <div className="TitleSectionFourthWidget">
                    <input type="text" onChange={this.handlePokemonNameChange} value={this.state.pokemonName} />

                    <select name="Rarity" onChange={this.handlePokemonRarityChange}>
                        <option value="/">/</option>
                        <option value="Amazing Rare">Amazing Rare</option>
                        <option value="Common" >Common</option>
                        <option value="LEGEND">LEGEND</option>
                        <option value="Promo">Promo</option>
                        <option value="Rare">Rare</option>
                        <option value="Rare ACE">Rare ACE</option>
                        <option value="Rare BREAK">Rare BREAK</option>
                        <option value="Rare Holo">Rare Holo</option>
                        <option value="Rare Holo V">Rare Holo V</option>
                        <option value="Rare Holo VMAX">Rare Holo VMAX</option>
                        <option value="Rare Rainbow">Rare Rainbow</option>
                        <option value="Rare Shiny">Rare Shiny</option>
                        <option value="Rare Shiny GX">Amazing Rare</option>
                    </select>

                    <button onClick={this.searchCartesPokemon}>Search</button>

                </div>

                <h2>{this.state.cartesAmount}</h2>

                <div className="ComponentDiv">
                    <div className="ScrollableSection">
                        {thelist}
                    </div>
                </div>
                <div className="ComponentDiv">
                    {theChosenOne}
                </div>

            </div>

        );
    }
}

export default DisplayCartesPokemon;


