/* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 50;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var removedBrick = 0;


/* Constants for ball and paddle */
var paddle;
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var paddleY = getHeight() - (PADDLE_HEIGHT + PADDLE_OFFSET) -  25;
var paddleX;



var pointY;
var pointX;
var rect;
var color;

var ball;
var gameOver =  false;
var ballLose = 0;
var ballIsMove = false;
var BALL_RADIUS = 15;
var centerX = getWidth() / 2 - BALL_RADIUS;
var centerY = getHeight() / 2 - BALL_RADIUS;
var dx = 8;
var dy = 8;


var txt;
var txt1;
var score;
var lose;

// I prepared the project with code snippets I wrote in previous projects and added some new details

// The function starts the program.
// Calls several basic functions to create objects.
// Uses listeners to control mouse movements and clicks.

function start(){
    repeatedLine();
        creatBall();
            cratPaddle();
                mouseMoveMethod(movePaddle);
                mouseClickMethod(startStopGame);
                
                    score = new Text("your point: " +  removedBrick , "10pt Arial");
                            score.setPosition(10, 20);
                            score.setColor(Color.blue);
                            add(score);
                            
                            
                        lose = new Text("Losed Ball: " +  removedBrick , "10pt Arial");
                            lose.setPosition(score.getWidth() + 50, 20);
                            lose.setColor(Color.blue);
                            add(lose);
                            
                      var note = new Text("You have 4 chances ", "10pt Arial");
                            note.setPosition(getWidth() - note.getWidth() - 10, 20);
                            note.setColor(Color.blue);
                            add(note);
                            
                            

                            var line = new Line(0, 35, getWidth(), 35);
                            line.setColor(Color.green);
                            add(line);
                            
                            
                       var creator = new Text("Created by Roland Artmeladze in 2023", "15pt Arial");
                            creator.setPosition((getWidth() / 2) - creator.getWidth()/2  , getHeight() - 8);
                            creator.setColor(Color.black);
                            add(creator);


            }

// Determines the moment the ball moves or stops or restarts the game
function startStopGame(e){
                    if(gameOver){
                        start();
                        ballIsMove = true;
                        gameOver = false;
                        ballLose = 0;
                        remove(txt);
                        remove(txt1);
                        removedBrick = 0;
                        
                    }
                    if(ballIsMove){
                         stopTimer(moveBall);
                         ballIsMove = false;
                    }else{
                         setTimer(moveBall, 20);
                         ballIsMove = true;
                    }
} 

    // The function determines the movement of the pedal according to the location of the mouse
    function movePaddle(e){
         var newX = e.getX() - PADDLE_WIDTH / 2;
            newX = Math.max(5, newX);
            newX = Math.min(getWidth() - PADDLE_WIDTH - 5, newX); 
        paddle.setPosition(newX, paddleY);
    }
    
        // The function creates a paddle to catch a moving ball
        function cratPaddle(){
            paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
                paddle.setPosition(centerX, paddleY);
                paddle.setColor(Color.black);    
                add(paddle);
        }
        
            // The function determines the direction of movement of the ball
            function moveBall() {
                checkWalls();
                ball.move(dx, dy);
                
                    // When the ball touches the paddle the ball changes direction
                    if (
                        ball.getX() + ball.getRadius() > paddle.getX() &&
                        ball.getX() - ball.getRadius() < paddle.getX() + PADDLE_WIDTH &&
                        ball.getY() + ball.getRadius() > paddle.getY() &&
                        ball.getY() - ball.getRadius() < paddle.getY() + PADDLE_HEIGHT
                    ) {
                        dy = -dy; 
                }

                            // score = new Text( removedBrick , "10pt Arial");
                            // score.setPosition(15, 200);
                            // score.setColor(Color.blue);
                            // add(score);

            }
            
                // The function creates a ball for play in the center of the canvas
                function creatBall(){
                    ball = new Circle(BALL_RADIUS );
                    ball.setPosition(centerX, centerX);
                    add(ball);
                }
                
                    // The function checks the location of the ball, 
                    // if it touches the edges or the main elements of the game, the ball changes direction
                    function checkWalls() {
                        
                        
                        //ball tuched rectangel
                        var tuched = getElementAt(
                            ball.getX()+ ball.getRadius(), 
                            ball.getY() - ball.getRadius());
                            if (tuched != null) {
                               remove(tuched);
                               removedBrick++;
                               score.setText("your point: "+ removedBrick );
                               
                               

                               dy = -dy;
                               
                            }
                            if(removedBrick == 80){
                                removeAll();
                                stopTimer(moveBall);
                                removedBrick = 0;
                                txt = new Text("you win!!!", "30pt Arial");
                                    txt.setPosition(100, 200);
                                    txt.setColor(Color.blue);
                                    add(txt);
                                    gameOver = true;
                               }


                if (ball.getX() + ball.getRadius() > getWidth() || ball.getX() - ball.getRadius() < 0) {
                dx = -dx;
                }

                if (ball.getY() - ball.getRadius() < 40) {
                    dy = -dy;
                }
            
            //ball lose
                if (ball.getY() + ball.getRadius() > getHeight()) {
                    if(ballLose < 3){
                    ball.setPosition(getWidth() / 2, getHeight() / 2);
                    stopTimer(moveBall);
                    ballIsMove = false;
                    ballLose++;
                    lose.setText("Losed Ball: "+ ballLose );

                    }else{
                        removeAll();
                        gameOver = true;
                        removedBrick = 0;
                        ballLose = 0;
                        
                        txt = new Text("Game Over!", "30pt Arial");
                            txt.setPosition(100, 200);
                            txt.setColor(Color.blue);
                            add(txt);
                            
                        txt1 = new Text("Click to repeat", "20pt Arial");
                            txt1.setPosition(120, 250);
                            txt1.setColor(Color.black);
                            add(txt1);
                    }
                                         

                }
    
                    }
                    
                        // Creates the main details of the game in lines and determines their color
                        function repeatedLine(){
                            for(var colum = 0; colum < NUM_ROWS; colum++){
                                if (colum <= 1) {
                                    color = Color.red;
                                } else if (colum <=3) {
                                    color = Color.orange;
                                } else if (colum <= 5) {
                                    color = Color.green;
                                }else{
                                    color = Color.blue;
                                }
                            pointY =  colum * (BRICK_HEIGHT  + BRICK_SPACING)+ BRICK_TOP_OFFSET;
                            creatLine();
                            }
                        }
                        
                        
                            function creatLine(x,y){
                                for(var row =0; row < NUM_BRICKS_PER_ROW; row++){
                                    pointX = row * (BRICK_WIDTH + BRICK_SPACING) + BRICK_SPACING;
                                    drawRectangle(pointX, pointY, color);
                                }
                            }
                            
                                // Creates the basic details of the game for each of them
                                function drawRectangle(x,y,color){
                                        rect = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
                                        rect.setPosition(x, y);
                                        rect.setColor(color);    
                                        add(rect);
                                }