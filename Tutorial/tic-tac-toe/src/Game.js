import React from 'react';
import { Board } from './Board';
import { calculateWinner } from "./calculateWinner";
export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null) }
            ],
            currentStep: 0,
            isPlayingX: true
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.currentStep + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.getCurrentPlayersSign();
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            currentStep: history.length,
            isPlayingX: !this.state.isPlayingX
        });
    }
    getCurrentPlayersSign() {
        if (this.state.isPlayingX) {
            return 'X';
        }
        else {
            return 'O';
        }
    }
    jumpTo(move) {
        this.setState({
            currentStep: move,
            isPlayingX: (move % 2) == 0
        });
    }
    render() {
        const history = this.state.history;
        const currentState = history[this.state.currentStep];
        const squares = currentState.squares;
        const winner = calculateWinner(squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        }
        else {
            status = `Next player: ${this.getCurrentPlayersSign()}`;
        }
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (<li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>);
        });
        return (<div className="game">
            <div className="game-board">
                <Board squares={squares} handleClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>);
    }
}
