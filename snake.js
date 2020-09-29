function init() {
    bgcanvas = document.getElementById('mycanvas');
    w = h = bgcanvas.height = bgcanvas.width = 1000;
    pen = bgcanvas.getContext('2d');
    cs = 66;  //cell size
    
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
            console.log("updating snake");
            this.cells.pop();
        var headX = this.cells[0].x;
        var headY = this.cells[0].y;

        var X = headX +1;
        var Y = headY;
        this.cells.unshift({x:X,y:Y});
        }
  
    };
    snake.createSnake();
}
function draw(){
    //erase the old frame
   pen.clearRect(0,0,w,h); 
    snake.drawSnake();
}
function update(){

    snake.updateSnake();
    
}
function gameloop(){
    draw();
    update();
}
  
init();
var f = setInterval(gameloop,100);