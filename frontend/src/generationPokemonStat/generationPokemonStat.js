import React, { Component } from 'react';
import './generationPokemonStat.css';
import Axios from "axios";
import CardPokemon from './cardComponent';

class GenerationPokemonStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defineType: "",
      showMenu: false,
      rendu: [[]],
      pokemonLenghtList: 0,
      pokemonNameListAPI: [],
      pokemonNameTypeChooseAPI: [],
      pokemonImgAPI: [],
      pokemonWeightAPI: [],
      pokemonHeightAPI: [],
      pokemonAbilitiesAPI: [],
      pokemonTypeAPI: [],
      pokemonLoading: true,
      allPokemonLoading: true
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: true,
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false });
    }
  }

  setBug = (e) => {
    this.setState({ defineType: "bug" });
  }

  setDragon = (e) => {
    this.setState({ defineType: "dragon" });
  }

  setElectric = (e) => {
    this.setState({ defineType: "electric" });
  }

  setFighting = (e) => {
    this.setState({ defineType: "fighting" });
  }

  setFire = (e) => {
    this.setState({ defineType: "fire" });
  }

  setFlying = (e) => {
    this.setState({ defineType: "flying" });
  }

  setGhost = (e) => {
    this.setState({ defineType: "ghost" });
  }

  setGrass = (e) => {
    this.setState({ defineType: "grass" });
  }

  setGround = (e) => {
    this.setState({ defineType: "ground" });
  }

  setIce = (e) => {
    this.setState({ defineType: "ice" });
  }

  setNormal = (e) => {
    this.setState({ defineType: "normal" });
  }

  setPoison = (e) => {
    this.setState({ defineType: "poison" });
  }

  setPsychic = (e) => {
    this.setState({ defineType: "psychic" });
  }

  setRock = (e) => {
    this.setState({ defineType: "rock" });
  }

  setWater = (e) => {
    this.setState({ defineType: "water" });
  }

  searchAllPokemon = () => {
    this.setState({ pokemonLoading: true });
    let number = 200;
    Axios.get(`http://localhost:5000/getPokemonByGeneration/allPokemonGen/${number}`)
      .then(res => {
        var nameArray = [];
        var nameArray2 = [];
        var imgArray = [];
        var weightArray = [];
        var heightArray = [];
        var abilitiesArray = [];
        var typeArray = [];

        for (let i = 0; i < number; i++) {
          let actual = i;
          nameArray.push(res.data.results[actual].name);
          Axios.get(`http://localhost:5000/getPokemonByGeneration/one_pokemon_gen/${res.data.results[actual].name}`)
            .then(response => {

              let f = response.data.name;
              nameArray2.push(f);

              let a = response.data.sprites.front_default;
              imgArray.push(a);

              let b = response.data.weight;
              weightArray.push(b);

              let c = response.data.height;
              heightArray.push(c);

              let d = response.data.abilities[0].ability.name;
              abilitiesArray.push(d);

              let e = response.data.types[0].type.name;
              typeArray.push(e);
            })
        }
        this.setState({
          pokemonNameListAPI: nameArray2,
          pokemonImgAPI: imgArray,
          pokemonWeightAPI: weightArray,
          pokemonHeightAPI: heightArray,
          pokemonAbilitiesAPI: abilitiesArray,
          pokemonTypeAPI: typeArray,
          pokemonLenghtList: nameArray.length
        }
        );
      })
    this.setState({ pokemonLoading: false });
    console.log(this.state.pokemonNameListAPI);
  }

  fillCard = () => {
    this.setState({ allPokemonLoading: true });
    let listStatPokemon = [[]];
    let copyPokemonNameTypeChoose = [];

    for (let a = 0; a < this.state.pokemonLenghtList; a++) {
      let pokemonStat = [];


      pokemonStat[0] = this.state.pokemonNameListAPI[a];
      pokemonStat[1] = this.state.pokemonImgAPI[a];
      pokemonStat[2] = this.state.pokemonWeightAPI[a];
      pokemonStat[3] = this.state.pokemonHeightAPI[a];
      pokemonStat[4] = this.state.pokemonAbilitiesAPI[a];
      pokemonStat[5] = this.state.pokemonTypeAPI[a];

      if (this.state.pokemonTypeAPI[a] === this.state.defineType) {
        listStatPokemon.push(pokemonStat);
        copyPokemonNameTypeChoose.push(pokemonStat[0]);
      }
    }
    listStatPokemon.shift();
    this.state.pokemonNameTypeChooseAPI = copyPokemonNameTypeChoose;
    copyPokemonNameTypeChoose.shift();
    this.state.rendu = listStatPokemon;
    this.setState({ allPokemonLoading: false });
  }

  render() {

    let copyRendu = this.state.rendu;

    return (
      <>
        <div>

          <div>
            <button onClick={this.showMenu}>
              Show Type
            </button>
            {
              this.state.showMenu
                ? (
                  <div className="menu">
                    <button onClick={this.setBug}> Bug </button>
                    <button onClick={this.setDragon}> Dragon </button>
                    <button onClick={this.setFire}> Fire </button>
                    <button onClick={this.setGhost}> Ghost </button>
                    <button onClick={this.setGround}> Ground </button>
                    <button onClick={this.setNormal}> Normal </button>
                    <button onClick={this.setPsychic}> Psychic </button>
                    <button onClick={this.setElectric}> Electric </button>
                    <button onClick={this.setFighting}> Fighting </button>
                    <button onClick={this.setFlying}> Flying </button>
                    <button onClick={this.setGrass}> Grass </button>
                    <button onClick={this.setIce}> Ice </button>
                    <button onClick={this.setPoison}> Poison </button>
                    <button onClick={this.setRock}> Rock </button>
                    <button onClick={this.setWater}> Water </button>
                  </div>
                )
                : (
                  null
                )
            }

          </div>

          <button onClick={this.searchAllPokemon}>Search Pokemon</button>
          <button onClick={this.fillCard}>Render</button>
          {this.state.pokemonLoading === true || this.state.allPokemonLoading === true ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
            (
              <>
                <div className="grid-container">
                  {this.state.pokemonNameTypeChooseAPI.map((i, index) => {
                    {
                      return <CardPokemon
                        key={i}
                        pokemonStatProp={this.state.rendu}
                        id={index}
                      />
                    }
                  })}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

export default GenerationPokemonStat;

