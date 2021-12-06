import React, { Component } from "react";
import Axios from "axios";
import "./gestionAPI.css";

class GestionAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordToResearch: "",
            anecdoteFromWordLoading: true,
            anecdotesFromWord: [],
            anecdoteLoading: true,
            anecdotes: [],
            newName: "",
            newDescription: "",
            anecdotePosting: false,
            updateDescription: "",
            nameAnecdoteToUpdate: "",
            idAnecdoteToUpdate: "",
            anecdoteUpdated: false,
            nameAnecdoteToDelete: "",
            idAnecdoteToDelete: "",
            anecdoteDeleted: false
        };
    }

    handleGetDescription = (e) => {
        this.setState({ wordToResearch: e.target.value });
    }

    handleGetNewName = (e) => {
        this.setState({ newName: e.target.value });
    }

    handleGetNewDescription = (e) => {
        this.setState({ newDescription: e.target.value });
    }

    handleGetUpdateDescription = (e) => {
        this.setState({ updateDescription: e.target.value });
    }

    handleGetNameUpdateAnecdote = (e) => {
        this.setState({ nameAnecdoteToUpdate: e.target.value });
    }

    handleGetNameDeleteAnecdote = (e) => {
        this.setState({ nameAnecdoteToDelete: e.target.value });
    }

    searchAnecdote = async () => {
        this.setState({ anecdoteFromWordLoading: true });
        Axios.get(`http://localhost:5000/api/anecdotes/?q=${this.state.wordToResearch}`)
            .then(res => {
                if (res.status === 200 && res != null) {
                    this.setState({ anecdotesFromWord: res.data });

                    this.setState({ anecdoteFromWordLoading: false });
                } else {
                    console.log('problem in call');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    searchAllAnecdote = async () => {
        this.setState({ anecdoteLoading: true });
        Axios.get(`http://localhost:5000/api/anecdotes/`)
            .then(res => {
                if (res.status === 200 && res != null) {
                    this.setState({ anecdotes: res.data });

                    this.setState({ anecdoteLoading: false });
                } else {
                    console.log('problem in call');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    postAnecdote = async () => {
        this.setState({ anecdotePosting: false });
        const data = {
            name: this.state.newName,
            description: this.state.newDescription
        };
        Axios.post(`http://localhost:5000/api/anecdotes/`, data)
            .then(res => {
                this.setState({ anecdotePosting: true });
            })
            .catch(error => {
                console.log(error);
            });
    }

    searchIdAnecdoteToUpdate = async () => {
        Axios.get(`http://localhost:5000/api/anecdotes/`)
            .then(res => {
                if (res.status === 200 && res != null) {
                    this.setState({ anecdotes: res.data });

                    for (let i = 0; i < this.state.anecdotes.length; i++) {
                        let actual = i;
                        if (this.state.anecdotes[actual].name === this.state.nameAnecdoteToUpdate) {
                            this.setState({ idAnecdoteToUpdate: res.data[actual]._id });
                            console.log("id: ", this.state.idAnecdoteToUpdate);
                        }
                    }

                } else {
                    console.log('problem in call');
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    updateAnecdote = async () => {
        this.setState({ anecdoteUpdated: false });

        const data = {
            description: this.state.updateDescription
        };
        console.log("id: ", this.state.idAnecdoteToUpdate);
        Axios.patch(`http://localhost:5000/api/anecdotes/${this.state.idAnecdoteToUpdate}`, data)
            .then(res => {
                this.setState({ anecdoteUpdated: true });
            })
            .catch(error => {
                console.log(error);
            });
    }

    searchIdAnecdoteToDelete = async () => {
        Axios.get(`http://localhost:5000/api/anecdotes/`)
            .then(res => {
                if (res.status === 200 && res != null) {
                    this.setState({ anecdotes: res.data });

                    for (let i = 0; i < this.state.anecdotes.length; i++) {
                        let actual = i;
                        if (this.state.anecdotes[actual].name === this.state.nameAnecdoteToDelete) {
                            this.setState({ idAnecdoteToDelete: res.data[actual]._id });
                            console.log("id: ", this.state.idAnecdoteToDelete);
                        }
                    }

                } else {
                    console.log('problem in call');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteAnecdote = async () => {
        this.setState({ anecdoteDeleted: false });

        console.log("id: ", this.state.idAnecdoteToDelete);
        Axios.delete(`http://localhost:5000/api/anecdotes/${this.state.idAnecdoteToDelete}`)
            .then(res => {
                this.setState({ anecdoteDeleted: true });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>API Manager</h1>
                <div className="detect">
                    <h2>Research anecdotes</h2>
                    <div>
                        <h3>Search for an anecdote, enter a word and get all anecdotes that contain it</h3>
                        <input type="text" onChange={this.handleGetDescription} value={this.state.wordToResearch} />
                        <button onClick={this.searchAnecdote}>Search Anecdotes from word</button>
                        {this.state.anecdoteFromWordLoading === true ?
                            <h4 style={{ textAlign: 'center' }}>loading or waiting for an action from user</h4> :
                            (
                                <div className="grid-container">
                                    {this.state.anecdotesFromWord.map((i, index) => {
                                        {
                                            return this.state.anecdotesFromWord[index].description;
                                        }
                                    })}
                                </div>
                            )}
                    </div>
                    <div>
                        <h3>Search for all anecdotes</h3>
                        <button onClick={this.searchAllAnecdote}>Search All Anecdote</button>
                        {this.state.anecdoteLoading === true ?
                            <h4 style={{ textAlign: 'center' }}>loading or waiting for an action from user</h4> :
                            (
                                <div className="grid-container">
                                    {this.state.anecdotes.map((i, index) => {
                                        {
                                            return this.state.anecdotes[index].description;
                                        }
                                    })}
                                </div>
                            )}
                    </div>
                    <h2>Post anecdote</h2>
                    <div>
                        <h3>Create a new anecdote</h3>
                        <h4>Enter the name of your new anecdote</h4>
                        <input type="text" onChange={this.handleGetNewName} value={this.state.newName} />
                        <h4>Enter the text of your new anecdote</h4>
                        <input type="text" onChange={this.handleGetNewDescription} value={this.state.newDescription} />
                        <button onClick={this.postAnecdote}>Post New Anecdote</button>
                        {this.state.anecdotePosting === false ?
                            <h4 style={{ textAlign: 'center' }}>Waiting for a post or loading</h4> :
                            <h4 style={{ textAlign: 'center' }}>Anecdote posted</h4>
                        }
                    </div>
                    <h2>Update anecdote</h2>
                    <div>
                        <h3>Update an existing anecdote</h3>
                        <h4>Enter name of the anecdote to be updated</h4>
                        <input type="text" onChange={this.handleGetNameUpdateAnecdote} value={this.state.nameAnecdoteToUpdate} />
                        <h4>Enter an updated text for your anecdote</h4>
                        <input type="text" onChange={this.handleGetUpdateDescription} value={this.state.updateDescription} />
                        <button onClick={this.searchIdAnecdoteToUpdate}>Search id Anecdote</button>
                        <button onClick={this.updateAnecdote}>Update Anecdote</button>
                        {this.state.anecdoteUpdated === false ?
                            <h4 style={{ textAlign: 'center' }}>Waiting for an update or loading</h4> :
                            <h4 style={{ textAlign: 'center' }}>Anecdote updated</h4>
                        }
                    </div>
                    <h2>Delete anecdote</h2>
                    <div>
                        <h3>Delete an existing anecdote</h3>
                        <h4>Enter name of the anecdote to be deleted</h4>
                        <input type="text" onChange={this.handleGetNameDeleteAnecdote} value={this.state.nameAnecdoteToDelete} />
                        <button onClick={this.searchIdAnecdoteToDelete}>Search id Anecdote</button>
                        <button onClick={this.deleteAnecdote}>Delete Anecdote</button>
                        {this.state.anecdoteDeleted === false ?
                            <h4 style={{ textAlign: 'center' }}>Waiting for a name to delete or loading</h4> :
                            <h4 style={{ textAlign: 'center' }}>Anecdote deleted</h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default GestionAPI;