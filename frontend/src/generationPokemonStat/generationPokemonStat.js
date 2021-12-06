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

  handlePokemonTypeChange = (e) => {
    this.setState({ defineType: e.target.value, });
  }

  searchAllPokemon = () => {
    this.setState({ pokemonLoading: true });
    let number = 250;
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
        <div className="ComponentDivType">
          <div className="TitleSectionSecondWidget">
            <select name="Type" onChange={this.handlePokemonTypeChange}>
              <option value="bug">Bug</option>
              <option value="dragon" >Dragon</option>
              <option value="electric ">Electric</option>
              <option value="fighting">Fighting</option>
              <option value="fire">Fire</option>
              <option value="ghost">Ghost</option>
              <option value="grass">Grass</option>
              <option value="ground">Ground</option>
              <option value="ice">Ice</option>
              <option value="normal">Normal</option>
              <option value="poison">Poison</option>
              <option value="rock">Rock</option>
              <option value="water">Water</option>
            </select>

            <button onClick={this.searchAllPokemon}>Search</button>
            <button onClick={this.fillCard}>Render</button>

          </div>
          {this.state.pokemonLoading === true || this.state.allPokemonLoading === true ? <h1 style={{ textAlign: 'center' }}>    </h1> :
            (
              <>
                <div className="ScrollableSection">
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

