import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Client from 'boardgame.io/client';
import { Bigger, Board } from './game/bigger';


// export const gameClient = Client({
//   game: Bigger,
//   board: Board,
//   multiplayer: true,
// });

// class App extends Component {
//   render() {
//     return (
//       <div>
//      <div>hello</div>
//      <gameClient />
//      </div>
//     )
//   }
// }

const App = Client({
  game: Bigger,
  board: Board,
});

export default App;
