import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/jcrewlogo.png';
// import '../Sass/Content.sass';


export default class Header extends Component {

  render(){
    return(
      <div id="Header-Container">
        <Link id='Home-Link' to='/' >
          <img src={logo} />
        </Link>
      </div>
    )
  }
}