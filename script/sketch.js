
var nodes = [];
var nodesKeys =[];
var root;


var scaleFactor = 2;
var scaleX = 1;

var rows = [];

function setup() {
  createCanvas(1200, 700);
  background(0);

  nodesKeys.push(1);
  root = new Node(1,0);
  nodes.push(root)
  
  frameRate(3);



}

function drawTree(node,x,y,sectionwidth){
  node.draw(x,y, index);
  if(sectionwidth < 10){
    sectionwidth = 400;
  }
  var widthChildren = sectionwidth/(node.children.length);

  for (let i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    if(node.children.length == 2){
      if(i == 0){
        xnew = x-(sectionwidth/4)*scaleX;
      }
      else{
        xnew = x+(sectionwidth/4)*scaleX;
      }
    }
    else{
      xnew = x;
    }
    ynew = height-15*child.steps*scaleFactor;
    if(ynew < 0){
      scaleFactor=scaleFactor*0.9;
    }
    if(xnew < 0 || xnew > width){
      scaleX=scaleX*0.95;
    }
    rows[child.steps]++;
    stroke(200)
    line(x,y,xnew,ynew);
    drawTree(child,xnew,ynew,widthChildren);
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
var maxLimit = 100000;

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
  textSize(30);
  text(index, width-500, 100);
  text(`${maxSteps} steps for number:  ${maxval}`, width-500, 50);
  pop();
  drawTree(root,width/2,height,width,0);
}