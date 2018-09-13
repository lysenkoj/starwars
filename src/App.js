import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import ParticleAnimation from 'react-particle-animation';
import Home from './components/home.jsx';
import Character from './components/character';

import characters from "./characters.json";


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
        <Switch>
          <Route exact path="/" render={(props) => <Home characters={this.state.characters.characters} {...props}/>} />
          <Route path="/:character" render={(props) => <Character characters={this.state.characters.characters} {...props}/>} />
        </Switch>
        <ParticleAnimation style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
          id='Background'
          particleRadius={0.5}
          numParticles={150}
          color={{r:158,g:217,b:249,a:255 }}
          background={{r:0,g:0,b:0,a:255}}
          interactive={false}
          lineWidth={0.4}
          particleSpeed={0.8}/>
      </div>
    );
  }
}

export default App;
