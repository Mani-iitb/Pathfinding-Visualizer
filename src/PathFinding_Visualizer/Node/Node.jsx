import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    let {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
      weight,
      isGrass,
      isMud
    } = this.props;
    let extraClassName = '';
    if (isFinish) extraClassName = 'node-finish';
    else if (isStart) extraClassName = 'node-start';
    else if (isWall) extraClassName = 'node-wall';
    else if (isGrass) extraClassName = 'node-grass';
    else if (isMud) extraClassName = 'node-mud';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}