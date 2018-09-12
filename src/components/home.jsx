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

    // this.fetchData();
  }

  componentDidMount(){
    // this.setCharacterData();
  }

  setCharacterData(){
    this.setState(previousState => {
      previousState.characters = characters.characters;
      return previousState;
    })
  }

  // fetchData(){
  //   const url = 'https://www.jcrew.com/data/v1/US/navigation';
  //   fetch(url)
  //   	.then((data) => data.json())
  //     .then((data) => {
  //     	this.setState(previousState => {
  //       	previousState.data = data;
  //         return previousState;
  //       })
  //     })
  //     .catch((er) => console.log(er))
  // }

  render(){
    console.log("HOME", this.props)
    return(
      <div id="Home-Container">
        {this.state.characters && this.state.characters.length ? this.state.characters.map((character, index) => {
          return <Link to={
            {
              pathname:`/${character.name}}`,
              myCustomProps:{character}
            }
            } key={index}> {character.name} </Link>
        }) : "NO DATA"}
      </div>
    )
  }
}