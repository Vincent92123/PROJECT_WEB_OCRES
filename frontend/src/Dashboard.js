import React from 'react';
import DisplayOnePokemon from './onePokemonStat/DisplayOnePokemon';
import GenerationPokemonStat from './generationPokemonStat/generationPokemonStat';
import DisplayCartesPokemon from './displayCartesPokemon/DisplayCartes';
import CompetenceChartPokemon from './competenceChartPokemon/CompetenceChartPokemon';
import AnecdotePokemon from './anecdotePokemon/anecdotePokemon';
import './Dashboard.css'

function Dashboard() {
    return (
        <div>
            <div class="row">
                <div class="col-md-4 col-xs-12" >
                    <div className="widget1">
                        <DisplayOnePokemon />
                    </div>
                    <div className="widget6">
                        <AnecdotePokemon />
                    </div>
                </div>
                <div class="col-md-4 col-xs-12">
                    <div className="widget2">
                        <GenerationPokemonStat />
                    </div>
                    <div className="widget3">
                    <CompetenceChartPokemon />
                    </div>
                </div>
               <div class="col-md-4 col-xs-12">
                    <div className="widget4">
                        <DisplayCartesPokemon />
                    </div>
               </div>
                
                
            </div>
        </div>
    )
}

export default Dashboard;