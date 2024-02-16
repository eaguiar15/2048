const sleep = ms => new Promise(resolve => setInterval(() => resolve(), ms));
elem = document.getElementById("board");
var board = [
         [0,0,0,0],
         [0,0,0,2],
         [0,0,0,0],
         [0,2,0,0]
]

var plays = 0;
var points = 0;
var blind = -2;

function random(){
    let pos = [];
    for(l = 0; l < 4 ; l++){
        for(c = 0; c < 4 ; c++){
            if(board[l][c] == 0){
                pos.push([l,c]);
            }
        }
    }
    var index = Math.floor(Math.random() * pos.length);
   
    if(pos.length > 0){
        board[pos[index][0]][pos[index][1]] = blind;
    }
    if(plays % 500 == 0){
        blind*=2;
    }

}

function print(){
    for(let l = 0 ; l < board.length; l++){
        for(let c = 0 ; c  < board[l].length ; c++){
            if(board[l][c] == 0){
                elem.children[c + (l * 4)].innerHTML="";
            }else{
                let merge = '';
                if(board[l][c] < 0){
                    merge = 'merge';
                }
                if(board[l][c] == blind){
                    merge = 'new';
                }
                elem.children[c + (l * 4)].innerHTML=
                "<div class='brick b" + Math.abs(board[l][c])+ " " + merge + "' >"+ Math.abs(board[l][c]) + "</div>";
            }
        }
    }
    
    document.getElementById("plays").innerText = plays;
    document.getElementById("points").innerText = points;
}


print();

async function move(direction) {
    plays++;
    for(let l = 0 ; l < board.length; l++){
        for(let c = 0 ; c  < board[l].length ; c++){
            board[l][c]= Math.abs(board[l][c]);
        }
    }

    if(direction == "right"){
        for(l = 0 ; l < 4 ; l++){
            for(c = 3 ; c >= 0 ; c--){ // primeiro acopla
                brick = board[l][c];
                if(brick != 0 ){
                    let aux = c - 1;
                    while(aux >= 0 ){
                        if(board[l][aux] == board[l][c]){
                            board[l][aux]*=-2;
                            board[l][c] = 0;
                            points+= Math.abs(board[l][aux]);
                        }
                        aux--;
                    }
                }
            }
             for(x = 0 ; x < 3 ; x++){
                 for(c = 0 ; c < 4 ; c++){ // depois move
                     brick = board[l][c];
                     if(brick != 0 && c+1 < 4 && board[l][c+1] == 0){
                         board[l][c] = 0;
                         board[l][c+1] = brick;
                     }
                 }
             }
             //await sleep(25);
             //print();
        }
        
    }
    if(direction == "left"){
        for(l = 0 ; l < 4 ; l++){
            for(c = 0 ; c < 4 ; c++){ // primeiro acopla
                brick = board[c][l];
                if(brick != 0 ){
                    let aux = l - 1;
                    while(aux >= 0){
                        if(board[c][aux] == board[c][l]){
                            board[c][aux]*=-2;
                            board[c][l] = 0;
                            points+= Math.abs(board[c][aux]);
                        }
                        aux--;
                    }
                }
            }
            for(x = 0 ; x < 3 ; x++){
                for(c = 3 ; c >= 0 ; c--){ // depois move
                    brick = board[l][c];
                    if(brick != 0 && c-1 >= 0 && board[l][c-1] == 0){
                        board[l][c] = 0;
                        board[l][c-1] = brick;
                    }
                }
            }
            //await sleep(25);
            //print();
        }
    }
    if(direction == "up"){
        for(c = 0 ; c < 4 ; c++){
            for(l = 0 ; l < 4 ; l++){
                brick = board[l][c];
                if(brick != 0 ){
                    let aux = l - 1;
                    while(aux >= 0){
                        if(board[aux][c] == board[l][c]){
                            board[aux][c]*=-2;
                            board[l][c] = 0;
                            points+= Math.abs(board[aux][c]);
                        }
                        aux--;
                    }
                }
            }
              for(x = 0 ; x < 3 ; x++){
                for(l = 3 ; l >= 0 ; l--){
                    brick = board[l][c];
                    if(brick != 0 && l-1 >= 0 && board[l-1][c] == 0){
                        board[l][c] = 0;
                        board[l-1][c] = brick;
                    }
                }
              }
            //await sleep(25);
            //print();
        }
    }
    if(direction == "down"){  
        for(c = 0 ; c < 4 ; c++){
            for(l = 3 ; l >= 0 ; l--){
                brick = board[l][c];
                if(brick != 0 ){
                    let aux = l - 1;
                    while(aux >= 0){
                        if(board[aux][c] == board[l][c]){
                            board[aux][c]*=-2;
                            board[l][c] = 0;
                            points+= Math.abs(board[aux][c]);
                        }
                        aux--;
                    }
                }
            }
            for(x = 0 ; x < 3 ; x++){
                 for(l = 0 ; l < 4 ; l++){
                     brick = board[l][c];
                     if(brick != 0 && l+1 < 4 && board[l+1][c] == 0){
                         board[l][c] = 0;
                         board[l+1][c] = brick;
                     }
                 }
            }
            //await sleep(25);
        }
    }
    print();
    //await sleep(100);
    random();
    print();

}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        move('up');
    }else if (event.key === 'ArrowDown') {
        move('down');
    }else if (event.key === 'ArrowLeft') {
        move('left');
    }else if (event.key === 'ArrowRight') {
        move('right');
    }
});



var xStart, yStart;

document.addEventListener('touchstart', function(event) {
    xStart = event.touches[0].clientX;
    yStart = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    // Obtém as coordenadas do toque final
    var xEnd = event.changedTouches[0].clientX;
    var yEnd = event.changedTouches[0].clientY;

    // Calcula a diferença entre as coordenadas do toque inicial e final
    var deltaX = xEnd - xStart;
    var deltaY = yEnd - yStart;

    // Determina a direção do toque com base nas diferenças de coordenadas
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Direção para a direita
            move('right');
        } else {
            // Direção para a esquerda
            move('left');
        }
    } else {
        if (deltaY > 0) {
            // Direção para baixo
            move('down');
        } else {
            // Direção para cima
            move('up');
        }
    }
});

function toggleFullScreen() {
    if (!document.fullscreenElement && 
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
         document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  }


