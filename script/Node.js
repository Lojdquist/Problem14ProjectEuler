function Node(number,steps) {

  this.number = number;
  this.steps = steps;

  this.children=[];

  this.addChild=function(child){
    this.children.push(child);
  }

  this.draw = function(x,y,index) {
    if(index == number){
      noStroke();
      fill(255,0,0);
     
    }
    else{
      fill(255);
    }
    textSize(20*scaleFactor);

    if(scaleFactor > 0.4){
      text(number, x,y)
      fill(255);
    }
    else{
      if(this.children.length == 0 || index == number){
        text(number, x,y)
        fill(255);
      }
    }

   
  }

}
