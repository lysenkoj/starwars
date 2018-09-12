import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import '../Sass/Character.sass';


export default class Character extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: this.props.location.myCustomProps.character.url,
      data: null
    };
  }
  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    const url = this.state.url;
    fetch(url)
    	.then((data) => data.json())
      .then((data) => {
      	this.setState(previousState => {
        	previousState.data = data;
          return previousState;
        })
      })
      .catch((er) => console.log(er))
  }

  render(){
    console.log(this.state)
    return(
      <div id="Character-Container">
      </div>
    )
  }
}