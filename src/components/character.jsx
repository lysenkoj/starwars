import React, { Component } from 'react';
import { OMDb_KEY } from '../secrets';
import Luke from '../images/lukeNo.gif';
import { Link } from 'react-router-dom';



export default class Character extends Component {
  constructor(props){
    super(props)
    this.state = {
      characters: this.props.characters,
      url: null,
      data: null,
      films: [],
      filmsPoster: [],
      animation: []
    };

    //USE THE PATHNAME IN PROPS TO SET APPROPRIATE URL
    const pathName = this.props.location.pathname.slice(1, this.props.location.pathname.length - 1);

    for(let i = 0; i  < this.props.characters.length; i++){
      if(this.props.characters[i].name === pathName){
        this.state.url = this.props.characters[i].url;
      }
    }

    //ACCESS LOADER DIV FOR LOADING ANIMATION
    let loader = document.querySelector('div#Loader');

    this.animateLoader(loader);

    //WAIT FOR ANIMATION TO FINISH BEFORE SHOWING LOADED PAGE
    setTimeout(()=>{
      let characterContainer = document.querySelector('div#Character-Container');
      let loaderContainer = document.querySelector('div#Loader');

      //LOAD IN CHARACTER DIV AND TRANSLATE FROM TOP
      characterContainer.style.display = 'flex';
      loaderContainer.style.display = 'none';

      let reposition =  [{transform: 'translateY(-700px)'},
      {transform: 'translateY(0)'}]

      let timing = {
        easing: 'linear',
        iterations: 1,
        direction: 'normal',
        fill: 'both',
        duration: 350
      };

      characterContainer.animate(reposition, timing);

      //PAUSE ANIMATIONS
      this.state.animation.forEach(animation => {
        animation.pause();
      })
    }, 3000)

  }

  componentDidMount(){
    if(this.state.url){
      this.fetchData();
    }
  }

  componentWillUnmount(){
    // WHEN COMPONENT UNMOUNTS REMOVE LOADING SPANS FROM INDEX.HTML
    let loadingSpans = document.querySelectorAll('span.Loading-Text');

    loadingSpans.forEach(el => {
      el.parentNode.removeChild(el);
    })
  }

  // ANIMATIONS

  animateLoader(animDiv){
    const loadingText = document.querySelector('h2#Loading-Text');
    const xWing = document.querySelector('div#X-Wing-Container');
    const tieFighter = document.querySelector('div#Tie-Fighter-Container');

    let keyframesXWing = [{transform: 'rotate(0)'}, {transform: 'rotate(360deg)'}];
    let keyframesTieFighter = [{transform: 'rotate(0)'}, {transform: 'rotate(-360deg)'}];
    let timing = {
      easing: 'linear',
      iterations: Infinity,
      direction: 'normal',
      fill: 'both',
      duration: 4000
    };

    setTimeout(()=>{
      this.animateText(loadingText);
      animDiv.style.display = 'flex';
      const xWingAnimation = xWing.animate(keyframesXWing, timing);
      const tieFighteraAnimation = tieFighter.animate(keyframesTieFighter, timing);
      this.setState(previousState => {
        previousState.animation.push(xWingAnimation);
        previousState.animation.push(tieFighteraAnimation);
        return previousState;
      })
    }, 250)
  }

  //ANIMATIONS ON THE 'LOADING...' TEXT
  animateText(text){
    let loading = [['L','L'], ['O','O'],['A','A'],['D','D'],['I','I'], ['N','N'],['G','G'],['Dot1', '.'], ['Dot2', '.'], ['Dot3', '.']];
    let count = 0;
    let min = 0;

    for(let i = 0; i < loading.length; i++){
      text.innerHTML += `<span id=${loading[i][0]} class='Loading-Text'>${loading[i][1]}</span>`;
    }


    var interval = setInterval(()=>{
      const random = Math.floor(Math.random() * (10 - min) + min);
      const fullWord = document.querySelectorAll('span.Loading-Text');
      const wordSelectors = ['L','O','A','D','I','N','G','Dot1','Dot2','Dot3'];
      const letter = document.querySelector(`span#${wordSelectors[random]}`);
      const randomCharCode = Math.floor(Math.random() * (92 - 33) + 33);

      // CREATES THE LOADING LETTERS FROM GLYPHS
      const setCorrect = () => {
        let word = 'LOADING...'
        const span = document.querySelector(`span#${wordSelectors[min]}`);
        span.innerHTML = word[min];
        span.style['font-family'] = 'Metropolis-Regular';
      }

      if(count%10 && count >= 50){
        fullWord.forEach(letter => {
          letter.style.opacity = 1;
        })
      }else if(count >= 50){
        fullWord.forEach(letter => {
          letter.style.opacity = 0;
        })
      }

      if(count < 50){
        letter.innerHTML = String.fromCharCode(randomCharCode);
      }

      count++;

      switch(count){
        case 80:
          clearInterval(interval);
          break;
        case 50:
          setCorrect();
          break;
        case 45:
          setCorrect();
          min++;
          break;
        case 40:
          setCorrect();
          min++;
          break;
        case 35:
          setCorrect();
          min++;
          break;
        case 30:
          setCorrect();
          min++;
          break;
        case 25:
          setCorrect();
          min++;
          break;
        case 20:
          setCorrect();
          min++;
          break;
        case 15:
          setCorrect();
          min++;
          break;
        case 10:
          setCorrect();
          min++;
          break;
        case 5:
          setCorrect();
          min++;
          break;
      }

    }, 30);

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

    const api = `https://www.omdbapi.com/?t=${filmKey[filmTitle]}&apikey=${OMDb_KEY}`;

    fetch(api)
      .then(data => data.json())
      .then(data => {
        this.setState({ filmsPoster: [...this.state.filmsPoster, data.Poster] })
        return data;
      })
      .catch(er => console.log(er))
  }

  render(){
    return(
      <div id="Character-Container">
        <Link to='/' id="Character-Title">
          <div className="Title">STAR</div>
          <div id="Subtitle">{`${this.props.location.pathname.slice(1, this.props.location.pathname.length - 1)}'s Films`}</div>
          <div className="Title">WARS</div>
        </Link>
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