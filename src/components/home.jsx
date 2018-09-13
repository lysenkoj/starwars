import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import characters from "../characters.json";

// import Character from "./character"
// import '../Sass/Content.sass';


export default class HOME extends Component {
  constructor(props){
    super(props)
    this.state = {
      characters: this.props.characters,
      data: null
    };

  }

  setCharacterData(){
    this.setState(previousState => {
      previousState.characters = characters.characters;
      return previousState;
    })
  }

  render(){
    console.log("HOME", this.props)
    return(
      <div id="Home-Container">
        <div id="Home-Title">
          <div className="Title">STAR</div>
          <div id="Subtitle">Character Film Guide</div>
          <div className="Title">WARS</div>
        </div>
        <div id="Home-Main-Content-Container">
          {this.state.characters && this.state.characters.length ? this.state.characters.map((character, index) => {
            return <Link to={`/${character.name}}`} id="Character-Link" key={index}>
                      <div id='icon'>{(character.name === 'Darth Vader') ? 'I' : 'R'}</div>
                      <div>{character.name}</div>
                    </Link>
          }) : "NO DATA"}
        </div>
      </div>
    )
  }
}