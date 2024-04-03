
    const canvas= document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    const replay = document.getElementById('replay');
    let winnerName = document.getElementById('winnerName');
    const winScreen = document.getElementById('winScreen');
   const welcomeScreen = document.getElementById('welcomeScreen');
   const startGame = document.getElementById('startGame');

    
    winScreen.classList.add('inv');
    replay.addEventListener('click',replayActivated);
    startGame.addEventListener('click',()=>welcomeScreen.classList.add('inv'));
    let x= canvas.width+50;
    let y= canvas.height+50;
    
    let x2 = canvas.width-50;
    let y2 = canvas.height-50;
    
    let vyu=0;
    let vyd=0;
    let vxl = 0;
    let vxr = 0;
    
    let vyu2=0;
    let vyd2=0;
    let vxl2 = 0;
    let vxr2 = 0;
    
    let ex = 0; //enemy x
    let ey = 0; //enemy Y
    let heroWidth = 50;
    let heroHeight = 50;
    let enemyWidth = 100;
    let enemyHeight = 100;
    const score = document.getElementById('score');
    const score2 = document.getElementById('score2');
    
    let scoreTracker = 0;
    let scoreTracker2 = 0;
    
    function replayActivated(){
        scoreTracker=0;
        scoreTracker2=0;
        score.innerText = scoreTracker;
    score2.innerText = scoreTracker2;
        winScreen.classList.remove('set');
        winScreen.classList.add('inv');
    }
    
    function reset(){
        console.log(scoreTracker,scoreTracker2);
        score.innerText = scoreTracker;
    score2.innerText = scoreTracker2;
    pickRandom();
    enemyUpdate();
    // x=0;
    // y=0;
    //re-enable if you want hero to bgin at the starting point.
    
    if(scoreTracker >= 10){
        winnerName.innerText = 'Player 1'
        console.log('we have a winner!');
        winScreen.classList.add('set');
        winScreen.classList.remove('inv');
    }
    if(scoreTracker2 >= 10){
        winnerName.innerText = 'Player 2'
        console.log('we have a winner!');
        winScreen.classList.add('set');
        winScreen.classList.remove('inv');
    }

}
function update(){
    //adds velocity to player 1
    x+=vxl;
    x+=vxr;
    y+=vyu;
    y+=vyd;
    //adds velocity to player 2
    x2+=vxl2;
    x2+=vxr2;
    y2+=vyu2;
    y2+=vyd2;
    requestAnimationFrame(update);
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle= '#C5D86D';
    ctx.fillRect(x,y,50,50);
    
    ctx.fillStyle='#F05D23';
    ctx.fillRect(x2,y2,50,50);
}
update();


function pickRandom(){
    ex = Math.floor(Math.random()*canvas.width);
    ey= Math.floor(Math.random()*canvas.height);
}
pickRandom();

function enemyUpdate(){
    ctx.fillStyle='#F7F7F2';
    ctx.fillRect(ex,ey,100,100);
    requestAnimationFrame(enemyUpdate);
}
enemyUpdate();

function checkCollision(){
    //checks for collision and keeps play in bounds.
    if(x >= ex && x <= ex+100 && y >=ey && y<=ey+100 || x+50 <= ex+100 && x+50 >= ex && y+50 <=ey+100 && y+50 >=ey){
        scoreTracker++;
        reset();
    }
    if(x2 >= ex && x2 <= ex+100 && y2 >=ey && y2<=ey+100 || x2+50 <= ex+100 && x2+50 >= ex && y2+50 <=ey+100 && y2+50 >=ey){
        scoreTracker2++;
        reset();
    }
    if (x+50<0) {
        x+=canvas.width;
    
    }
    if(x > canvas.width){
        x=0;
    }
    if(y+50 <0){
        y+=canvas.height;
    }
    if(y > canvas.height){
        y=0;
    }
    if (x2+50<0) {
        x2+=canvas.width;
    
    }
    if(x2 > canvas.width){
        x2=0;
    }
    if(y2+50 <0){
        y2+=canvas.height;
    }
    if(y2 > canvas.height){
        y2=0;
    }
}

setInterval(checkCollision,100);

document.addEventListener("keydown",function(e){
  
    switch(e.code){
        case "KeyW": vyu = -10;
    break;
        case "KeyA": vxl = -10;
    break;
        case "KeyS": vyd = 10;
    break;
        case "KeyD": vxr = 10;
    break;
  
    case "ArrowUp": vyu2 = -10;
    break;
        case "ArrowDown": vyd2 = 10;
    break;
        case "ArrowLeft": vxl2 = -10;
    break;
        case "ArrowRight":  vxr2 = 10;
        break;

    }
});

document.addEventListener("keyup",function(e){
    switch(e.code){
        case "KeyW": vyu = 0;
    break;
        case "KeyA": vxl = 0;
    break;
        case "KeyS": vyd = 0;
    break;
        case "KeyD": vxr = 0;
    break;
  
    case "ArrowUp": vyu2 = 0;
    break;
        case "ArrowDown": vyd2 = 0;
    break;
        case "ArrowLeft": vxl2 = 0;
    break;
        case "ArrowRight":  vxr2 = 0;
        break;

    }
});

//to come: -add ability for players to enter names at welcome screeen -add way to get back to welcome screen. -make the game prettier with a moving gradient background
