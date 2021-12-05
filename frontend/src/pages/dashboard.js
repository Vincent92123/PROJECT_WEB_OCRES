import React from 'react';
import DisplayOnePokemon from '../onePokemonStat/DisplayOnePokemon';
import GenerationPokemonStat from '../generationPokemonStat/generationPokemonStat';
import DisplayCartesPokemon from '../displayCartesPokemon/DisplayCartes';
import CompetenceChartPokemon from '../competenceChartPokemon/CompetenceChartPokemon';
import AnecdotePokemon from '../anecdotePokemon/anecdotePokemon';

const Dashboard = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'                
            }}
        >
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
                <DisplayCartesPokemon />
            </div>
            <div className="widget6">
                <AnecdotePokemon />
            </div>
        </div>
    );
};

export default Dashboard;