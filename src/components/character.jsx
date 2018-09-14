import React, { Component } from 'react';
import { OMDb_KEY } from '../secrets';
import Luke from '../images/lukeNo.gif';
// import { Link } from 'react-router-dom';

// import '../Sass/Character.sass';


export default class Character extends Component {
  constructor(props){
    super(props)
    this.state = {
      characters: this.props.characters,
      url: null,
      data: null,
      films: [],
      filmsPoster: []
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
      .then(data => {
        this.setState({ films: [...this.state.films, data] })
        return data;
      })
      .then(data => {
        this.fetchPoster(data);
        return data;
      })
      .catch(er => console.log(er))
  }

  fetchPoster(film){
    const filmTitle = film.title;
    const filmKey = {
      'The Phantom Menace': 'star+wars%3A+episode+i',
      'Attack of the Clones': 'star+wars%3A+episode+ii',
      'Revenge of the Sith': 'star+wars%3A+episode+iii',
      'A New Hope': 'star+wars%3A+episode+iv',
      'The Empire Strikes Back': 'star+wars%3A+episode+v',
      'Return of the Jedi': 'star+wars%3A+episode+vi',
      'The Force Awakens': 'star+wars%3A+episode+vii'
    }

    const api = `http://www.omdbapi.com/?t=${filmKey[filmTitle]}&apikey=${OMDb_KEY}`;

    fetch(api)
      .then(data => data.json())
      .then(data => {
        this.setState({ filmsPoster: [...this.state.filmsPoster, data.Poster] })
        return data;
      })
      .catch(er => console.log(er))
  }

  render(){
    console.log(this.state)
    return(
      <div id="Character-Container">
        <div id="Character-Title">
          <div className="Title">STAR</div>
          <div id="Subtitle">{`${this.props.location.pathname.slice(1, this.props.location.pathname.length - 1)}'s Films`}</div>
          <div className="Title">WARS</div>
        </div>
        <div id="Character-Slider-Container">
        {(this.state.films.length) ? this.state.films.map((film, index) => {
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
          const month = unformatted[1] - 1;
          const day = unformatted[2];

          let newDate = new Date(year, month, day);
          let arrayDate = newDate.toString().split(' ');

          arrayDate.length = 4;

          filmRelease.push(dayObj[arrayDate[0]]);
          filmRelease.push(monthObj[arrayDate[1]]);
          filmRelease.push(arrayDate[2]);
          filmRelease.push(arrayDate[3]);

          return <div id='Film-Container' key={index}>
                <div id='Poster-Container'>
                {/*
                  LETS MAKE THE POSTER CONTAINER BACKGROUND IMAGE
                  THE POASTER IMAGE AND THEN FIT IT TO THE CONTAINER
                  CROPPING IN ON THE MIDDLE... POSSIBLY

                */}
                  <img src={(this.state.filmsPoster[index] !== 'N/A') ? this.state.filmsPoster[index] : 'https://images-na.ssl-images-amazon.com/images/I/612b6ON4arL._SL1500_.jpg'} alt='Star Wars Poster'/>
                </div>
                  <div id='Movie-Info-Container'>
                    <h3>{film.title}</h3>
                    <p>{filmRelease.join(" ")}</p>
                  </div>
                </div>
        }) :
          <div id='Error-Container'>
            <div id='Error-Sorry'>SORRY</div>
            <img src={Luke} alt='Luke Crying Gif'/>
            <div id='Error-Text'>
              <h2>404 PAGE NOT FOUND</h2>
              <h3>THE FORCE WAS NOT WITH YOUR REQUEST</h3>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}