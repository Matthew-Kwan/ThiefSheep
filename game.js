var myGamePiece;
var myGameB;
var FakeSheeps;

// variables to define width and height of the canvas
var canvasWidth = 480;
var canvasHeight = 270;

// Number of fake sheeps
var num_fakeSheeps = 40;

// vars for random
var rand_x;
var rand_y;

// index for updategame
var index = 0;

function startGame() {

	// Random x and y
	rand_x1 = Math.floor(Math.random() * (canvasWidth-30));
    rand_y1 = Math.floor(Math.random() * (canvasHeight-30));

    rand_x2 = Math.floor(Math.random() * (canvasWidth-30));
    rand_y2 = Math.floor(Math.random() * (canvasHeight-30));

    myGameArea.prestart();
    myGamePiece = new component(30, 30, "red", rand_x1, rand_y1);
    myGameB = new component(30, 30, "blue", rand_x2, rand_y2);
    FakeSheeps = [];

    for (i = 0; i < num_fakeSheeps ; i++) {
        rand_x = Math.floor(Math.random() * (canvasWidth-30));
        rand_y = Math.floor(Math.random() * (canvasHeight-30));

        FakeSheeps.push(new fakeSheep(30,30,"yellow",rand_x,rand_y));
    }
}

<<<<<<< HEAD
// variables to define width and height of the canvas
var canvasWidth = 800;
var canvasHeight = 350;
=======

>>>>>>> 7746b3cced4a11ec4ae91ef6f7818d07757f769a

var myGameArea = {
    canvas : document.createElement("canvas"),

    prestart : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.ctx = this.canvas.getContext("2d");
        // this.canvas.getContext('2d').fillText('rsersre', this.canvas.width/2,this.canvas.height/2-30);
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        // this.ctx.fillText("Thief Sheep", this.canvas.width/2, this.canvas.height/2-30);
        this.ctx.fillText("Press enter to start", this.canvas.width/2, this.canvas.height/2);

        this.startIntervalId = setInterval(startGameArea, 20);
        document.getElementById('gameCanvas').appendChild(this.canvas)
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    start : function() {

        myGameArea.mainIntervalId = setInterval(updateGameArea, 20, index);
        // window.addEventListener('keydown', function (e) {
        //     myGameArea.keys = (myGameArea.keys || []);
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })
        // window.addEventListener('keyup', function (e) {
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })

    },
    clear : function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        ctx = myGameArea.ctx;
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

// object for fake sheeps
function fakeSheep(width,height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function() {
        ctx = myGameArea.ctx;
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

    // myGameArea.clear();

    if (myGameArea.keys && myGameArea.keys[13]) {
      clearInterval(myGameArea.startIntervalId);
      myGameArea.start();
    }
}

function endGameArea() {

    myGameArea.clear();
}


function updateGameArea() {


    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGameB.speedX =0;
    myGameB.speedY= 0;

    // Loop through elements in FakeSheeps list
    for (robot_ind = 0; robot_ind < num_fakeSheeps; robot_ind++) {

        robot = FakeSheeps[robot_ind];

        // This will be random directions eventually at intervals
        var move = (Math.floor(Math.random() * Math.floor(10)))*10


        if (index % move == 0) {
	        robot.speedX = 1*((Math.floor(Math.random() * Math.floor(3)))-1);
	        robot.speedY = 1*((Math.floor(Math.random() * Math.floor(3)))-1);
    	}

        // Update while you're looping anyways
        robot.newPos();
        robot.update();
    }


    if (myGameArea.keys && myGameArea.keys[32]) {myGamePiece.color = 'blue'}
        else{
            myGamePiece.color='red'
        }


    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1.5; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1.5; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1.5; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1.5; }
    // Win game if you capture
    if (myGameArea.keys && myGameArea.keys[32]
        && (myGamePiece.x < myGameB.x+15) && (myGamePiece.x > myGameB.x-15)
        && (myGamePiece.y < myGameB.y+15) && (myGamePiece.y > myGameB.y-15)) {
        clearInterval(myGameArea.mainIntervalId);
        endGameArea();}


    if (myGameArea.keys && myGameArea.keys[65]) {myGameB.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[68]) {myGameB.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[87]) {myGameB.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGameB.speedY = 1; }






    // Call functions to update positions of game pieces
    myGameB.newPos();
    myGameB.update();

    myGamePiece.newPos();
    myGamePiece.update();

    // Iterate interval
    index = index + 1;


}
