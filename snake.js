function init() {
    bgcanvas = document.getElementById('mycanvas');
    w = h = bgcanvas.height = bgcanvas.width = 600;
    pen = bgcanvas.getContext('2d');
    cs = 65;  //cell size
    game_over = false;
    score = 5;

    food_img = new Image();
    food_img.src ="images/apple.png";
    food = getRandomFood();

    trophy = new Image();
    trophy.src = "trophy.png"
    snake = {
        init_len : 5,
        color : "red",
        cells :[],
        direction : "right",

        createSnake : function(){
            for(var i = this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake: function () {
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs,cs-2, cs-2);
            }
           
        },
        updateSnake : function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX=food.x && headY==food.y){
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            console.log("updating snake");
            
            
            var nextX,nextY;
            if(this.direction=="right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX -1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }
     
        this.cells.unshift({x:nextX,y:nextY});
        
        var last_x = Math.round(w/cs);
        var last_y = Math.round(h/cs);

        iff(this.cells[0].y=0 || this.cells[0].x < 0 || this.cells[0] > last_x || this.cells[0].y > last_y)
        game_over = true;
    }
  
    };
       
    snake.createSnake();
    function keyPressed(e){
        
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
        console.log(snake.direction);
    }
    //add a event listener 
    document.addEventListener('keydown',keyPressed);
}
function draw(){
    //erase the old frame
   pen.clearRect(0,0,w,h); 
    snake.drawSnake();
    pen.fillStyle = "yellow"
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score,50,50);
}
function update(){

    snake.updateSnake();
    
}
function getRandomFood(){
       var foodX = Math.round(Math.random()*(w-cs)/cs);
       var foodY = Math.round(Math.random()*(h-cs)/cs);
       var food = {
           x:foodX,
           y:foodY,
           color:"red",
       }
       return food;
}
function gameloop(){
    if(game_over == true){
        clearInterval(f);
        alert("Game over");
        return;
    }
    draw();
    update();
}
  
init();
var f = setInterval(gameloop,100);