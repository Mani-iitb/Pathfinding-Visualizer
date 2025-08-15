import React, {Component, useState} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/djikstra';
import {bfs, getNodesInShortestPathOrder_bfs} from '../algorithms/BFS';
import {dfs, getNodesInShortestPathOrder_dfs} from '../algorithms/DFS';
import { greedyBestFirstSearch, getNodesInShortestPathOrder_gbfs } from '../algorithms/greedy';

import './PathFinding_visualizer.css';

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let isChangeStart = false;
let isChangeTarget = false;

export default class PathfindingVisualizer extends Component {
constructor() {
    super();
    this.state = {
    grid: [],
    mouseIsPressed: false,
    weight: "Wall"
    };
}

componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
}

handleMouseDown(row, col) {
    console.log(this.state.weight)
    if (isChangeStart){
        document.getElementById(`node-${row}-${col}`).className = 'node node-start';
        isChangeStart = false;
        START_NODE_ROW = row;
        START_NODE_COL = col;
    }else if(isChangeTarget){
        document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
        isChangeTarget = false;
        FINISH_NODE_ROW = row;
        FINISH_NODE_COL = col;
    }else{
        if (this.state.weight == "Wall"){
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({grid: newGrid, mouseIsPressed: true});
        }else if(this.state.weight == "Mud"){
            const newGrid = getNewGridWithMudToggled(this.state.grid, row, col);
            this.setState({grid: newGrid, mouseIsPressed: true});
            console.log(this.state.grid);
        }else{
            const newGrid = getNewGridWithGrassToggled(this.state.grid, row, col);
            this.setState({grid: newGrid, mouseIsPressed: true});
        }
    }
}

handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (this.state.weight == "Wall"){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }else if(this.state.weight == "Mud"){
        const newGrid = getNewGridWithMudToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
        console.log(this.state.grid);
    }else{
        const newGrid = getNewGridWithGrassToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
}

handleMouseUp() {
    this.setState({mouseIsPressed: false});
}

animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
        this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
    }
    setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited';
      }, 10 * i);
    }
}

animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-shortest-path';
      }, 50 * i);
    }
}

visualizeDijkstra() {
    if (!isChangeStart && !isChangeTarget){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
}

visualizeBFS(){
    if (!isChangeStart && !isChangeTarget){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder_bfs(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
}

visualizeDFS(){
    if (!isChangeStart && !isChangeTarget){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder_dfs(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
}

visualizeGreedy(){
    if (!isChangeStart && !isChangeTarget){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder_gbfs(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
}

performReset(){
    this.componentDidMount();
    const {grid, mouseIsPressed} = this.state;
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
        nodes.push(node);
        }
    }
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.row === START_NODE_ROW && node.col === START_NODE_COL)
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
        else if(node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
        else 
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
    }
}

changeStart(){
    this.performReset();
    isChangeStart = true;
    isChangeTarget = false;
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node';
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish';
}

changeTarget(){
    this.performReset();
    isChangeStart = false;
    isChangeTarget = true;
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start';
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node';
}

handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
};

render() {
    const {grid, mouseIsPressed} = this.state;

    return (
    <>
        <label>Select Weight Type: </label>
        <select value={this.state.weight} onChange={this.handleWeightChange}>
            <option value="Wall">Wall</option>
            <option value="Mud">Mud</option>
            <option value="grass">grass</option>
        </select>
        <button onClick={() => this.changeStart()}>Change Start</button>
        <button onClick={() => this.changeTarget()}>Change Target</button>
        <button onClick={() => this.visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeBFS()}>
        Visualize BFS Algorithm
        </button>
        <button onClick={() => this.visualizeDFS()}>
        Visualize DFS Algorithm
        </button>
        <button onClick={() => this.visualizeGreedy()}>
        Visualize Greedy Best First Algorithm
        </button>
        <button onClick={()=> this.performReset()}>Reset</button>
        <div className="grid">
        {grid.map((row, rowIdx) => {
            return (
            <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWall, weight, isGrass, isMud} = node;
                return (
                    <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                    }
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}
                    weight={weight}
                    isGrass={isGrass}
                    isMud={isMud}></Node>
                );
                })}
            </div>
            );
        })}
        </div>
    </>
    );
}
}

const getInitialGrid = () => {
const grid = [];
for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
}
return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        weight: 1,
        isGrass: false,
        isMud: false
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
        isGrass: false,
        isMud: false,
        weight: 1
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithGrassToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isGrass: !node.isGrass,
        isWall: false,
        isMud: false
    };
    if (node.weight > 1){
        newNode.weight = 1;
    }
    else{
        newNode.weight = 2;
    }
    
    newGrid[row][col] = newNode;
    return newGrid;
};

const getNewGridWithMudToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isGrass: false,
        isWall: false,
        isMud: !node.isMud
    };
    if (node.weight > 1){
        newNode.weight = 1;
    }
    else{
        newNode.weight = 5;
    }
    console.log(newNode.isMud);
    console.log(newNode.weight);
    
    newGrid[row][col] = newNode;
    return newGrid;
};