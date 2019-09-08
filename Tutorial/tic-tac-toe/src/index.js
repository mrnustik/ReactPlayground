import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square"
            onClick={() => { props.onClick() }}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]}
            onClick={() => this.props.handleClick(i)} />;
    }


    render() {
        const board = [];
        for (let row = 0; row < 3; row++) {
            const columns = []
            for (let column = 0; column < 3; column++) {
                columns.push(this.renderSquare(row * 3 + column));
            }
            board.push(
                <div className="board-row">
                    {columns}
                </div>
            );
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
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
        } else {
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
        } else {
            status = `Next player: ${this.getCurrentPlayersSign()}`;
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares}
                        handleClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
