
function init(){    
    p = document.getElementById("hcanvas");
    H= p.height=500;
    W=p.width=500;
    pen=p.getContext('2d');
    pen.fillStyle="red";
    snake={  
        init_len:5,
        color:"blue",
        cells:[],
    }
}

function draw(){
 pen.clearRect(0,0,W,H);
pen.fillRect(rect.x,rect.y,rect.w,rect.h);

}

function update(){
    rect.x+=rect.speed;
    if(rect.x > W-rect.w || rect.x<0){
        rect.speed*=-1;
    }
}

function gameloop(){
    console.log("in gameloop");
    draw();
    update();   
}
      
init();
// b=setInterval(gameloop,100);





