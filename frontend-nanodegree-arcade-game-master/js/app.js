let pointsWon = 0;
function addPoint() {
    document.getElementById("points").innerHTML = pointsWon;
  };


// Enemy class followed by instances of the bugs
var Enemy = function(x, y, z) {
    this.x = x; //Starts just off of the left side of the game board
    this.y = y + 53; // The 40 is to center bug on tile
    this.Ymove = 83 //Height of tiles
    this.Xmove = 101; //101 is Width of tiles
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.z = z;// Speed paramenter assigned at instatiation
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt){
      //Move forward
      if (this.x < this.Xmove * 5){ //Bug leaves the game board before stopping
        //move forward
        this.x += this.z * dt;//dt is constant speed
        // Once bug has left the right side of the screen:
      } else {
        this.x = -this.Xmove; //Resets bug to one tile width to the left of screen!
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Now the code for the Hero!
 class Hero {
   //constuctor
   constructor(){
     this.Xmove = 101 //Width of tiles
     this.Ymove = 83 //Height of tiles
     this.x = this.Xmove * 2; //starts player at bottom middle of screen
     this.y = this.Ymove * 5 - 30;
     //Hero character image:
     this.sprite = 'images/char-horn-girl.png';
   }

      //Check collison here
      update() {
        for(let enemy of allEnemies) {
          //console.log(this.y);
          if(enemy.y === this.y){
            //If y axis's both match and if player is within 25...
            //...pixels (Xmove/4) on the x axis then the collision occurred
            if(enemy.x + enemy.Xmove/4 > this.x && enemy.x < this.x + this.Xmove/4){
              alert("You're squished!");// alerts player to a death
              setTimeout(function(){
                window.location.reload();//Resets page to play again
              }, 300);//end setTimeout
              //player.reset();// Resets to bottom middle of screen
                }//end enemy.x...
              } //end if enemy.y === this.y
            }//end for loop

            //Check for whether player is in the water:
          if (this.y <= 0){
            setTimeout(function(){//Adds a delay to make the player reset less jarring
              player.reset();// Resets to bottom middle of screen
              }, 1000);//end setTimeout
            }//end else if "this.y <= 0"

        //Check for jewel collection
        for(let jewel of allJewels) {
          console.log(jewel.y, this.y);
          if(jewel.y === this.y){
                //If y axis's both match and if player is within 25...
                //...pixels (Xmove/4) on the x axis then the collision occurred
            if(jewel.x + jewel.Xmove/4 > this.x && jewel.x < this.x + this.Xmove/4){
              //If jewel collision occurs then jewel is moved off of the screen
              jewel.x = -101;
              jewel.y = -83;
              pointsWon += 1;
              addPoint();
              if (pointsWon === 3) {
                setTimeout(function(){
                alert("You Win!");
                player.reset();
              }, 300);//end setTimeout
                setTimeout(function(){
                  window.location.reload();//Resets page to play again
                }, 1000);//end setTimeout
              }
            }//end jewel.x...
          } //end if jewel.y === this.y
        }//end for loop

      }//end update()

     //Render:
       //Draw player sprite on current x and y coord position
      render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      }
    //Update player's x and y property according to input
     handleInput(input){
       //player moves 101 pixels on x axis, 83 on y axis to stary centered on tiles
       if (input === 'left'){
         this.x -= 101;
         if (this.x <= 0){
           this.x = 0; //player can't move off of board
         };
       } else if (input === 'up'){
         this.y -= 83;
         if (this.y <= 0){
           this.y = -30;//player can't move off of board (and allows for margin of 30 from bottom)
         };
       } else if (input === 'right'){
         this.x += 101;
         if (this.x >= this.Xmove * 4){
           this.x = this.Xmove * 4;//player can't move off of board
         };
       } else if (input === 'down'){
         this.y += 83;
         if (this.y >= this.Ymove * 5 -30){
           this.y = this.Ymove * 5 - 30;//player can't move off of board
         };
       }
     }
     //Reset Hero method
       //set x and y to starting x and y
       reset(){
         this.x = this.Xmove * 2; //starts player at bottom middle of screen
         this.y = this.Ymove * 5 - 30;
       }
 }


// Place all enemy objects in an array called allEnemies
  //fill this array using a loop for up to number of desired
  //enemies, create a new Enemy object and push it into the
  //allEnemies array

// Place the player object in a variable called player
// The name 'player' is referenced in the engine.js file
const player = new Hero();
// Instances of Enemies with starting position (x), starting position (y), and speed (z):
const enemy1 = new Enemy(-101, 0, 300);//1st bug
const enemy2 = new Enemy(-101 * 4, 83, 200);//2nd bug
const enemy3 = new Enemy(-101 * 6, 166, 150);//3rd bug
const enemy4 = new Enemy(-101, 83, 250);//4th bug
const enemy5 = new Enemy(-103* 4, 166, 350);//5th bug

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

//Code to add stars each time player gets to water

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Add jewels to board to collect:
var Jewel = function(x, y) {
  this.x = x;
  this.y = y;
  this.Xmove = 101 //Width of tiles
  this.Ymove = 83 //Height of tiles
  this.sprite = 'images/Gem Green.png';
};


// Draw the jewel on the screen:
Jewel.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Instances of jewels
const jewel1 = new Jewel(101, 53);//1st jewel
const jewel2 = new Jewel(404, 53);//2nd jewel
const jewel3 = new Jewel(202, 219);//3rd jewel


const allJewels = [];
allJewels.push(jewel1, jewel2, jewel3);
