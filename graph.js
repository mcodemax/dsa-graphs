class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
  	this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
  	for(const vertex of vertexArray) this.addVertex(vertex);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
  	v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
  	v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
  	for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {//practice on own
  	//track nodes visited
    const visited = new Set();
    const vals = [];
    
    function traverse(vertex){
    	if(!vertex) return null;
      
      visited.add(vertex);
      vals.push(vertex.value);
      
      vertex.adjacent.forEach(neighbor => {
      	if(!visited.has(neighbor)) traverse(neighbor);
      });
    }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
  	const visited = new Set();
    const data = [];
    const queue = [start];
    
    visited.add(start)
    //when at a node visit all its adjacents(pop onto a stack)
    while(queue.length > 0){
    	const currNode = queue.shift();
      //visited.add(currNode); //this doesn't belong HERE see comment in for of loop!!
    	data.push(currNode.value);
      
      for(const neighbor of currNode.adjacent){
      	if(!visited.has(neighbor)){
        	queue.push(neighbor);
          visited.add(neighbor);//needed here otherwise you're gonna be visited a node more than once!!!
        }
      }
    }
    
    return data;
  }
}

module.exports = {Graph, Node}
