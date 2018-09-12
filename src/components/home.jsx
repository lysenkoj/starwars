import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../Sass/Content.sass';


export default class HOME extends Component {
  constructor(){
    super()
    this.state = {
      data: null
    };
    this.fetchData();
  }

  fetchData(){
    const url = 'https://www.jcrew.com/data/v1/US/navigation';
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
    console.log(this.state.data);
    return(
      <div id="Home-Container">
        <Link to='/Women'>
          {/* <img src={} /> */}
        </Link>
        <Link to='/Men'>
          {/* <img src={} /> */}
        </Link>
        <Link to='/Girls'>
          {/* <img src={} /> */}
        </Link>
        <Link to='/Boys'>
          {/* <img src={} /> */}
        </Link>
      </div>
    )
  }
}