/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Game from 'boardgame.io/game';

function IsVictory() {
  // const positions = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  // for (let pos of positions) {
  //   const symbol = cells[pos[0]];
  //   let winner = symbol;
  //   for (let i of pos) {
  //     if (cells[i] != symbol) {
  //       winner = null;
  //       break;
  //     }
  //   }
  //   if (winner != null) return true;
  // }

  return false;
}

export const Bigger = Game({
  setup: () => ({
    // cells: Array(9).fill(null),
    deckA: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    deckB: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    cardA: 0,
    cardB: 0
  }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];
      console.log(ctx);

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    },
    sendCard(G, ctx, card) {
      let cardA = G.cardA;
      let cardB = G.cardB;

      let deckA = G.deckA;
      let deckB = G.deckB;

      if (ctx.currentPlayer == 0) {
        cardA = card;
        deckA[card-1] = 'casted';
      } else {
        cardB = card;
        deckB[card-1] = 'casted';
      }

      // console.log("deck A", deckA)

      return {...G, deckA, deckB, cardA, cardB}
    }
  },

  victory: (G, ctx) => {
    console.log(ctx.currentPlayer);
    if (ctx.turn > 0) {
      if (G.cardA > G.cardB) {
        return 0
      } else {
        return 1
      }
    }
    return null
    // return ctx.turn > 0?  ctx.currentPlayer : null;

  }
});

export class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mynum: 0,
    }
    this.setNumber = this.setNumber.bind(this);
  }
  static propTypes = {
    G:        PropTypes.any.isRequired,
    ctx:      PropTypes.any.isRequired,
    endTurn:  PropTypes.func.isRequired,
    moves:    PropTypes.any.isRequired,
  }
  
  sendNumber = (e) => {
    e.preventDefault();
    //console.log(this.state.mynum);
    this.props.moves.sendCard(this.state.mynum);
    this.props.endTurn();
  }

  setNumber = (mynum) => this.setState({ mynum});

  // changeNumber = (e) => this.setState({ mynum: e.target.value });

  render() {

    let winner = '';
    if (this.props.ctx.winner !== null) {
      winner = <div id='winner'>Winner: {this.props.ctx.winner}</div>;
    }

    const deck = this.props.ctx.currentPlayer == 0 ?
      this.props.G.deckA.filter(e => e != 'casted') :
      this.props.G.deckB.filter(e => e != 'casted');

    const choices = (deck.map((card) => (
      <div key={card}>  
      <button  onClick={(e)=>{
        e.preventDefault();
        this.setNumber(card+1);
        }} >No. {card+1}</button>
      </div>
      )
    ))

    return (
      <div>
        <form>
          {/* <div>
            Pick a number between 1 to 10
          </div> */}

       <p>Player {this.props.ctx.currentPlayer}</p>   
                
      {choices}
        {/* <input disabled={true} name="mynum" value={this.state.mynum}  type="number" min={1} max = {10} /> */}
        <p>{this.state.mynum}</p>
        <input type="submit" value="Go" onClick={(e)=>this.sendNumber(e)} />
      
       </form>
       
        <p> Card A: {this.props.G.cardA} </p>
        <p> Card B: {this.props.G.cardB} </p>

        {winner}

      </div>
    );
  }
}
