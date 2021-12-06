import "./CompetenceChartPokemon.css";
import React, { Component, Fragment } from "react";
import Axios from "axios";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";

class CompetenceChartPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonStat: [],
            pokemonName: "",
            pokemonNameAPI: "",
            pokemonIdAPI: "",
            pokemonColorAPI: "",
            pokemonImgAPI: "",
            pokemonChosen: false,
            pokemonLoading: true,
        };
    }

    handlePokemonNameChange = (e) => {
        this.setState({ pokemonName: e.target.value });
        this.setState({ pokemonChosen: true });
    }

    searchPokemon = () => {
        this.setState({ pokemonLoading: true });
        Axios.get(`http://localhost:5000/getPokemon/pokemonStat/${this.state.pokemonName}`)
            .then(res => {
                if (res.status === 200 && res != null) {
                    let copyJSONArray = this.state.pokemonStat.slice();

                    res.data.stats.map((stat, index) => {
                        copyJSONArray[index] = stat.base_stat;
                    })

                    this.setState({ pokemonStat: copyJSONArray });

                    this.setState({ pokemonImgAPI: res.data.sprites.front_default });
                    this.setState({ pokemonIdAPI: res.data.id });
                    this.setState({ pokemonNameAPI: res.data.name });

                    Axios.get(`http://localhost:5000/getPokemon/pokemonNameFr/${this.state.pokemonIdAPI}`)
                        .then(response => {
                            if (response.status === 200 && response != null) {
                                this.setState({ pokemonColorAPI: response.data.color.name });
                            } else {
                                console.log('problem in second call');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    this.setState({ pokemonLoading: false });
                } else {
                    console.log('problem in first call');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderGraph() {
        let color = "";
        if (this.state.pokemonColorAPI === "black") {
            color = "#1D2525";
        }
        if (this.state.pokemonColorAPI === "blue") {
            color = "#2350B8";
        }
        if (this.state.pokemonColorAPI === "brown") {
            color = "#904F17";
        }
        if (this.state.pokemonColorAPI === "gray") {
            color = "#999999";
        }
        if (this.state.pokemonColorAPI === "green") {
            color = "#438A3B";
        }
        if (this.state.pokemonColorAPI === "pink") {
            color = "#FFB7CE";
        }
        if (this.state.pokemonColorAPI === "purple") {
            color = "#8D5E9B"
        }
        if (this.state.pokemonColorAPI === "red") {
            color = "#BB4B49";
        }
        if (this.state.pokemonColorAPI === "white") {
            color = "#F0EEFF";
        }
        if (this.state.pokemonColorAPI === "yellow") {
            color = "#FFF380";
        }

        let data = [
            {
                subject: "Hp",
                copyPokemonStat: this.state.pokemonStat[0]
            },
            {
                subject: "Att",
                copyPokemonStat: this.state.pokemonStat[1]
            },
            {
                subject: "Def",
                copyPokemonStat: this.state.pokemonStat[2]
            },
            {
                subject: "Spe Att",
                copyPokemonStat: this.state.pokemonStat[3]
            },
            {
                subject: "Spe Def",
                copyPokemonStat: this.state.pokemonStat[4]
            },
            {
                subject: "Speed",
                copyPokemonStat: this.state.pokemonStat[5]
            }
        ];

        if (this.state.pokemonNameAPI === undefined) {
            return null;
        } else {
            return (<React.Fragment>
                <div className="displayGraph">
                    <RadarChart
                        cx={290}
                        cy={132}
                        outerRadius={100}
                        width={500}
                        height={500}
                        data={data}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                            name={this.state.pokemonName}
                            dataKey="copyPokemonStat"
                            stroke="#CD5C5C"
                            fill="#CD5C5C"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </div>
            </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="ComponentDivGraph">
                <div className="TitleSectionGraph">
                    <h1>Graph</h1>
                    <div className="buttonDirection">
                        <input type="text" onChange={this.handlePokemonNameChange} value={this.state.pokemonName} />
                        <div className="heightButton">
                            <button onClick={this.searchPokemon}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="DisplaySection">
                    {((!this.state.pokemonChosen) && (this.state.pokemonLoading == false)) ? (
                        <h1>Please choose a Pokemon</h1>
                    ) : (
                        <div>{this.renderGraph()}</div>
                    )}
                </div>
            </div >
        );
    }
}

export default CompetenceChartPokemon;