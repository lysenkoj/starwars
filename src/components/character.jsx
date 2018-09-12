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
    // console.log(this.state.data);
    return(
      <div id="Character-Container">

      </div>
    )
  }
}