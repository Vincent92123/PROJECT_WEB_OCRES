import React, { useEffect, useState, Component } from 'react';
import './App.css';
import DisplayOnePokemon from './onePokemonStat/DisplayOnePokemon';
import GenerationPokemonStat from './generationPokemonStat/generationPokemonStat';
import DisplayCartesPokemon from './displayCartesPokemon/DisplayCartes';
import CompetenceChartPokemon from './competenceChartPokemon/CompetenceChartPokemon';
import AnecdotePokemon from './anecdotePokemon/anecdotePokemon';
import GestionAPI from './gestionAPI/gestionAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <div className="test">
          <p className="App-intro">{this.state.apiResponse}</p>
        </div>
        <div className="organisation">
          <div className="widget1">
            <DisplayOnePokemon />
          </div>
          <div className="widget2">
            <GenerationPokemonStat />
          </div>
          <div className="widget3">
            <CompetenceChartPokemon />
          </div>
          <div className="widget4">
            <AnecdotePokemon />
          </div>
          <div className="gestionAPI">
            <GestionAPI />
          </div>
        </div>
        <div className="widget2">
          <GenerationPokemonStat />
        </div>
        <div>
          <DisplayCartesPokemon />
        </div>
      </div>
    );
  }
}

export default App;