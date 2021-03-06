var myGamePiece;
var myGameB;
var items;
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

// Rand function
function random_num(measure,obj) {
    return Math.floor(Math.random() * (measure-obj))
}

function startGame() {
	

    myGameArea.prestart();

    // Intialize objects
    myGamePiece = new component(30, 30, "/Users/mkayeungkwan/Documents/GitHub/ThiefSheep/resources/sheep/sheep-1.png", random_num(canvasWidth,30), random_num(canvasHeight,30), 'image');
    myGameB = new component(30, 30, "/Users/mkayeungkwan/Documents/GitHub/ThiefSheep/resources/sheep/sheep-2.png", random_num(canvasWidth,30), random_num(canvasHeight,30), 'image');
    FakeSheeps = [];

    items = [];
    items.push(new item(15,15,"red", random_num(canvasWidth,15), random_num(canvasHeight,15),'shape'));

    for (i = 0; i < num_fakeSheeps ; i++) {
        rand_x = Math.floor(Math.random() * (canvasWidth-30)); 
        rand_y = Math.floor(Math.random() * (canvasHeight-30));

        FakeSheeps.push(new fakeSheep(30,30,"/Users/mkayeungkwan/Documents/GitHub/ThiefSheep/resources/sheep/sheep-2.png",rand_x,rand_y,'image'));
    }
}



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

function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image") {
	  this.image = new Image();
	  this.image.src = color;
	}
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
        if (type == "image") {
      		ctx.drawImage(this.image,
        		this.x,
        		this.y,
        		this.width, this.height);
    }   else {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
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
function fakeSheep(width,height, color, x, y, type) {
	this.type = type;
	if (type == "image") {
	  this.image = new Image();
	  this.image.src = color;
	} 
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

        if (type == "image") {
      		ctx.drawImage(this.image,
        		this.x,
        		this.y,
        		this.width, this.height);
    }   else {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    	}
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

function item(width, height,color, x, y, type) { 
    this.type = type; 
    if (type =="image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.gamearea = myGameArea;
    this.width = width; 
    this.height = height; 
    this.x = x;
    this.y = y; 
    this.color = color; 
    this.update = function() {
        ctx = myGameArea.ctx;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
    }   else {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
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

    // Win game if you capture (Need to adjust this with items added.)
    if (myGameArea.keys && myGameArea.keys[32]
        && (myGamePiece.x < myGameB.x+15) && (myGamePiece.x > myGameB.x-15)
        && (myGamePiece.y < myGameB.y+15) && (myGamePiece.y > myGameB.y-15)) {
        clearInterval(myGameArea.mainIntervalId);
        endGameArea();}

    for  (item_ind = 0; item_ind < items.length; item_ind++)

        item = items[item_ind]

        if (myGameArea.keys && myGameArea.keys[32]
            && (myGamePiece.x < item.x+15) && (myGamePiece.x > item.x-15)
            && (myGamePiece.y < item.y+15) && (myGamePiece.y > item.y-15)) {
            
            item.width = 0;
            item.height = 0; 
    }


    if (myGameArea.keys && myGameArea.keys[65]) {myGameB.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[68]) {myGameB.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[87]) {myGameB.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGameB.speedY = 1; }

    for (item_ind = 0; item_ind < items.length; item_ind++) {
        item = items[item_ind]
        item.update()
    }
   
    // Call functions to update positions of game pieces 
    myGameB.newPos(); 
    myGameB.update();

    myGamePiece.newPos();    
    myGamePiece.update();

    // Iterate interval
    index = index + 1;


}