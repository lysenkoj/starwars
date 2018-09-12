import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import '../Sass/Character.sass';


export default class Character extends Component {
  constructor(){
    super()
    this.state = {
      data: null
    };
  }

  render(){
    return(
      <div id="Character-Container">
        CHARACTER MOVIES HERE!!!
      </div>
    )
  }
}