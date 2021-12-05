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
                subject: "Attack",
                copyPokemonStat: this.state.pokemonStat[1]
            },
            {
                subject: "Defense",
                copyPokemonStat: this.state.pokemonStat[2]
            },
            {
                subject: "Special Attack",
                copyPokemonStat: this.state.pokemonStat[3]
            },
            {
                subject: "Special Defense",
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
                <h1>{this.state.pokemonNameAPI}</h1>
                <img src={this.state.pokemonImgAPI} style={{ backgroundColor: color }} />
                <RadarChart
                    cx={300}
                    cy={250}
                    outerRadius={150}
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
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="DisplayOnePokemon">
                <div className="TitleSection">
                    <h1>Pokemon Stats</h1>
                    <input type="text" onChange={this.handlePokemonNameChange} value={this.state.pokemonName} />
                    <button onClick={this.searchPokemon}>Search Pokemon stats graph</button>
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