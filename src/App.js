import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import Header from './components/header.jsx';
import Home from './components/home.jsx';
import Footer from './components/footer';
import Character from './components/character';

import characters from "./characters.json";

// DO CHARACTER.JSON IMPORT HERE



class App extends Component {
  constructor(){
    super()
    this.state = {
      characters
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => <Home characters={this.state.characters.characters} {...props}/>} />
          <Route path="/:character" render={(props) => <Character characters={this.state.characters.characters} {...props}/>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
