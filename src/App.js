import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import './styles/app.scss';
import './styles/app1.scss';
import './styles/app2.scss';
import CircleImg from './assets/circle.png';
import Company1Img from './assets/company1.jpg';
import Cart from './assets/cart.svg';
import txtFile from './assets/content.txt';
import 'lodash';
const Component1 = React.lazy(() => import('./Components/Component1'));
const Component2 = React.lazy(() => import('./Components/Component2'));

function App() {

  return (
    <Suspense fallback={<>Loading...</>}>
        <div className="app">
          From React App 120
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
        <Component1 />
        <Component2 />
    </Suspense>

  )
}

export default hot(module)(App);
