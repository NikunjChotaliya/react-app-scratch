import React from 'react';
import { hot } from 'react-hot-loader';
import './app.css';
import CircleImg from './assets/circle.png';
import Company1Img from './assets/company1.jpg';
import Cart from './assets/cart.svg';
import txtFile from './assets/content.txt';

function App() {

  return (
    <div className="app">
      From React App 12
      <img
        src={Cart}
        alt="SVG Alt"
        height={200}
        width={200}
      />
      <img
        src={CircleImg}
        alt="CircleImg Image Alt"
        height={200}
        width={200}
      />
      <img
        src={Company1Img}
        alt="Company1Img Image Alt"
        height={200}
        width={200}
      />
      <p>{txtFile}</p>
    </div>
  )
}

export default hot(module)(App);
