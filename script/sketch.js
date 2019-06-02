
var nodes = [];
var nodesKeys =[];
var root;


var scaleFactor = 2;

var rows = [];

function setup() {
  createCanvas(1920, 700);
  background(0);

  nodesKeys.push(1);
  root = new Node(1,0);
  nodes.push(root)
  
 
  
  //var maxLimit = 10;
  /*for (var i = 1; i <= maxLimit; i++) {
      collatzSequenceSteps(i);
  }*/
  //drawTree(root,500,height);
  frameRate(10);



}

function drawTree(node,x,y){
  node.draw(x,y, index);
  for (let i = 0; i < node.children.length; i++) {
     var child = node.children[i];
    xnew =x+rows[child.steps]*20*scaleFactor*i;
    ynew = height-15*child.steps*scaleFactor;
    if(ynew < 0 ){
      scaleFactor=scaleFactor*0.9;
    }
    rows[child.steps]++;
    stroke(200)
    line(x,y,xnew,ynew);
    drawTree(child,xnew,ynew);
  }
}

var maxval = 0;
var maxSteps = 0;
function collatzSequenceSteps(number){
  var steps = 0;
  var visited = [];
  while (true){
    if(nodesKeys.includes(number)){
        var prevSteps = nodes[nodesKeys.indexOf(number)].steps; 
        createSequence(visited,prevSteps+1,nodes[nodesKeys.indexOf(number)]);
        return;
    }
    visited.push(number);
    if(number%2==0)
      number = number/2;
    else
      number = 3*number + 1;
    steps++;
  }
}

function createSequence(visited, additionalSteps,parent){
  var steps = additionalSteps;
  while (!visited.length==0){
      let visiedNode = visited.pop();
      if(!nodesKeys.includes(visiedNode)){
        nodesKeys.push(visiedNode);
        var child = new Node(visiedNode,steps);
        if(steps > maxSteps){
          maxSteps=steps;
          maxval = visiedNode;
        }
        nodes.push(child);
        parent.addChild(child);
        parent = child;
      }
      else{
        return;
      }
      steps++;
  }
}

var index = 1;
var maxLimit = 1000000;

function draw() {

  rows=[];
  for (let i = 0; i < 500; i++) {
    rows.push(0);
  }
  
  background(0);
  if(index!=maxLimit){
    index++;
  }
  collatzSequenceSteps(index);

  push();
  textSize(40);
  text(index, width/2, height-100);
  text(`Steps ${maxSteps} for  ${maxval}`, width/2 - 100, height-50);
  pop();
 drawTree(root,10,height);
}