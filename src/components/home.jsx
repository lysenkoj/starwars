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
      data: null,
      animation: []
    };

    const home = document.querySelector('div#Home-Container');
    let loader = document.querySelector('div#Loader');

    this.animateLoader(loader, home);

    setTimeout(()=>{
     let homeContainer = document.querySelector('div#Home-Container');
     let loaderContainer = document.querySelector('div#Loader');
      homeContainer.style.display = 'flex';
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

      homeContainer.animate(reposition, timing);

      this.state.animation.forEach(animation => {
        animation.pause();
      })
    }, 9000)


  }

  componentWillUnmount(){
    let loadingSpans = document.querySelectorAll('span.Loading-Text');

    loadingSpans.forEach(el => {
      el.parentNode.removeChild(el);
    })
  }

  setCharacterData(){
    this.setState(previousState => {
      previousState.characters = characters.characters;
      return previousState;
    })
  }

  animateLoader(animDiv, comp){
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

      const setCorrect = () => {
        let word = 'LOADING...'
        const span = document.querySelector(`span#${wordSelectors[min]}`);
        span.innerHTML = word[min];
        span.style['font-family'] = 'Metropolis-Regular';
      }

      if(count%10 && count >= 100){
        fullWord.forEach(letter => {
          letter.style.opacity = 1;
        })
      }else if(count >= 100){
        fullWord.forEach(letter => {
          letter.style.opacity = 0;
        })
      }

      if(count < 100){
        letter.innerHTML = String.fromCharCode(randomCharCode);
      }

      count++;

      switch(count){
        case 160:
          clearInterval(interval);
          break;
        case 100:
          setCorrect();
          break;
        case 90:
          setCorrect();
          min++;
          break;
        case 80:
          setCorrect();
          min++;
          break;
        case 70:
          setCorrect();
          min++;
          break;
        case 60:
          setCorrect();
          min++;
          break;
        case 50:
          setCorrect();
          min++;
          break;
        case 40:
          setCorrect();
          min++;
          break;
        case 30:
          setCorrect();
          min++;
          break;
        case 20:
          setCorrect();
          min++;
          break;
        case 10:
          setCorrect();
          min++;
          break;
      }

    }, 60);

  }

  render(){
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
                      <div id='Icon'>{(character.name === 'Darth Vader') ? 'I' : 'R'}</div>
                      <div id='Character-Name'>{character.name}</div>
                    </Link>
          }) : "NO DATA"}
        </div>
      </div>
    )
  }
}