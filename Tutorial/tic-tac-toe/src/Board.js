import React from 'react';
import { Square } from './Square';
export class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.handleClick(i)} />;
    }
    render() {
        const board = [];
        for (let row = 0; row < 3; row++) {
            const columns = [];
            for (let column = 0; column < 3; column++) {
                columns.push(this.renderSquare(row * 3 + column));
            }
            board.push(<div className="board-row">
                {columns}
            </div>);
        }
        return (<div>
            {board}
        </div>);
    }
}
