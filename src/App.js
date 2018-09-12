import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import ArrayPage from './components/arrayPage';
import Header from './components/header.jsx';
import Home from './components/home.jsx';
import Footer from './components/footer';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/:gender' component={ArrayPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
