
var myGamePiece;
var myGameB;

function startGame() {
    myGameArea.prestart();
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGameB = new component(30, 30, "blue", 11, 120);

}

// variables to define width and height of the canvas 
var canvasWidth = 480;
var canvasHeight = 270;

var myGameArea = {
    canvas : document.createElement("canvas"),

    prestart : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.startIntervalId = setInterval(startGameArea, 20);

        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    start : function() {
        myGameArea.mainIntervalId = setInterval(updateGameArea, 20);
        // window.addEventListener('keydown', function (e) {
        //     myGameArea.keys = (myGameArea.keys || []);
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })
        // window.addEventListener('keyup', function (e) {
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })

    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Note, the x,y position of each of the components is referenced by the top left corner 

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x; 
    this.y = y;    
    this.color = color;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {


        newX = this.x + this.speedX;
        newY = this.y + this.speedY;    

        // only updated the x position of the game component if the new position is within the boundaries, based on the width of the object; same with y position
        if ((newX >= 0) && (newX + this.height <= canvasWidth)) { 
            this.x = newX;
        }
        
        if ((newY >= 0) && (newY + this.height <= canvasHeight))  { 
            this.y = newY;
        }        
    }    
} 


function startGameArea() {

    myGameArea.clear();

    if (myGameArea.keys && myGameArea.keys[13]) {
      clearInterval(myGameArea.startIntervalId);
      myGameArea.start();
    }
}


function updateGameArea() {


    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGameB.speedX =0;
    myGameB.speedY= 0;

    if (myGameArea.keys && myGameArea.keys[32])
        {myGamePiece.color = 'blue';
        myGamePiece.update()}
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2; }

    if (myGameArea.keys && myGameArea.keys[82])
        {myGameB.color = 'red';
        myGameB.update()}
    if (myGameArea.keys && myGameArea.keys[65]) {myGameB.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[68]) {myGameB.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[87]) {myGameB.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGameB.speedY = 1; }


    // if (myGameB.keys && myGameB.keys[32])
    //     {myGameB.color = 'blue';
    //     myGameB.update();}

   
    // Call functions to update positions of game pieces 
    myGameB.newPos(); 
    myGameB.update();

    myGamePiece.newPos();    
    myGamePiece.update();


}
