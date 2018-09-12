import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import '../Sass/Character.sass';


export default class Character extends Component {
  constructor(props){
    super(props)
    this.state = {
      characters: this.props.characters,
      url: null,
      data: null,
      films: []
    };

    const pathName = this.props.location.pathname.slice(1, this.props.location.pathname.length - 1);

    for(let i = 0; i  < this.props.characters.length; i++){
      if(this.props.characters[i].name === pathName){
        this.state.url = this.props.characters[i].url;
      }
    }
  }

  componentDidMount(){
    if(this.state.url){
      this.fetchData();
    }
  }

// FETCH DATA FROM API
  fetchData(){
    const url = this.state.url;
    fetch(url)
    	.then(data => data.json())
      .then(data => {

        // SET DATA
      	this.setState(previousState => {
        	previousState.data = data;
          return previousState;
        })

        // CALL FETCH FILMS ON EACH FILM URL FROM DATA
        data.films.forEach(film => {this.fetchFilms(film)});

      })
      .catch((er) => console.log(er))
  }

  // FETCH FILM DATA FROM API AND PUSH TO STATE ARRAY
  fetchFilms(url){
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ films: [...this.state.films, data] }))
      .catch(er => console.log(er))
  }

  render(){
    console.log("PROPS!!!", this.props);
    console.log("STATE!!!!", this.state);
    console.log("FILMS", this.state.films);
    return(
      <div id="Character-Container">
        {this.state.films.map((film, index) => {
          const filmRelease = [];

          const dayObj = {
            Sun: "Sunday,",
            Mon: "Monday,",
            Tue: "Tuesday,",
            Wed: "Wednesday,",
            Thu: "Thursday,",
            Fri: "Friday,",
            Sat: "Saturday,"
          };

          const monthObj = {
            Jan: "January",
            Feb: "February",
            Mar: "March",
            Apr: "April",
            May: "May",
            Jun: "June",
            Jul: "July",
            Aug: "August",
            Sep: "September",
            Oct: "October",
            Nov: "November",
            Dec: "December",
          };

          const unformatted = film.release_date.split('-');

          const year = unformatted[0];
          const month = unformatted[1];
          const day = unformatted[2];

          let newDate = new Date(year, month, day);
          let arrayDate = newDate.toString().split(' ');

          arrayDate.length = 4;

          filmRelease.push(dayObj[arrayDate[0]]);
          filmRelease.push(monthObj[arrayDate[1]]);
          filmRelease.push(arrayDate[2]);
          filmRelease.push(arrayDate[3]);

          console.log("DATE", arrayDate);

          return <div key={index}>
                  <p>{film.title}</p>
                  <p>{filmRelease.join(" ")}</p>
                </div>
        })}
      </div>
    )
  }
}