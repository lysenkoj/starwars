import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import Header from './components/header.jsx';
import Home from './components/home.jsx';
import Footer from './components/footer';
import Character from './components/character';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:character" component={Character} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
