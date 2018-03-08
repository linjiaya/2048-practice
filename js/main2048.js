var board = new Array();
var score = 0;
var top = 240;

function newGame() {
  // 初始化棋盘格
  init();
  //随机生成两个数字
  generateOneNumber();
  generateOneNumber();
}
newGame();

// 初始化棋盘格
function init(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      var gridCell = $('#grid-cell-'+i+'-'+j);
      gridCell.css('top',getPosTop(i,j));
      gridCell.css('left',getPosLeft(i,j));
    }
  }
  for(var i = 0; i < 4; i++){
    board[i] = new Array();
    for(var j = 0; j < 4; j++){
      board[i][j] = 0;
    }
  }

  updateBoardView();//通知前端对board二维数组进行设定
}

function updateBoardView(){
  $('.number-cell').remove();
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
      var theNumberCell = $('#number-cell-'+i+'-'+j);
      if (board[i][j] == 0) {
        theNumberCell.css('width','0px');
        theNumberCell.css('height','0px');
        theNumberCell.css('top',getPosTop(i,j));
        theNumberCell.css('left',getPosLeft(i,j));
      }
      else{
        theNumberCell.css('width','100px');
        theNumberCell.css('height','0px');
        theNumberCell.css('top',getPosTop(i,j));
        theNumberCell.css('left',getPosLeft(i,j));

        //NumberCell覆盖
        theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
        theNumberCell.css('color',getNumberColor(board[i][j]));//返回前景色
        theNumberCell.text(board[i][j]);
      }
    }
  }
}

/*随机生成数字*/
function generateOneNumber(){
  if (nospace(board)) {//判断是否16宫格是否还有空间
    return false;
  }
  // 随机生成一个位置
  var randx = parseInt(Math.floor(Math.random()*4));
  var randy = parseInt(Math.floor(Math.random()*4));
  while(true){
    if (board[randx][randy] == 0) {
      break;
    }
    randx = parseInt(Math.floor(Math.random()*4));
    randy = parseInt(Math.floor(Math.random()*4));
  }

  // 随机生成一个数字
  var randNumber = Math.random() < 0.5 ? 2 : 4;//随机数小于0.5就生成2，反之4

  // 在随机位置显示随机数字
  board[randx][randy] = randNumber;
  showNumberWithAnimation(randx,randy,randNumber);//随机块展示
  return true;
}

// 事件响应循环
$(document).keydown(function(event){
  switch(event.keyCode){
    case 37://左 <-
      if (moveLeft()) {//判断是否出现游戏结束
        generateOneNumber();//出现游戏结束后重新生成新的
        isGameOver();
      }
      break;
    case 38://上 ^
      if (moveUp()) {
        generateOneNumber();
        isGameOver()
      }
      break;
    case 39://右 －>
      if (moveRight()) {
        generateOneNumber();
        isGameOver()
      }
      break;
    case 40://下 V
      if (moveDown()) {
        generateOneNumber();
        isGameOver()
      }
      break;
  }
})

function isGameOver(){
  if(nospace(board) && noMove(board)){
    gameOver();
  }
}

function gameOver(){
  alert('Game Over!')
}
// 左移
function moveLeft(){
  //判断各自是否能够向左移动
  if (!canMoveLeft(board)) {
    return false;
  }

  for(var i = 0; i < 4; i++){
    for(var j = 1; j < 4; j++){//第一列的数字不可能向左移动
      if (board[i][j] != 0) {
        //(i,j)左侧元素
        for(var k = 0; k < j; k++){
          //落脚位置是否为空 && 中间有没有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
            //move
            showMoveAnimation(i,j,i,k);
            board[i][k] =  board[i][j];
            board[i][j] = 0;
            continue;
          }
          //落脚位置的数字和本来的数字相等 && 中间没有障碍物
          else if(board[i][k] ==  board[i][j] && noBlockHorizontal(i , k, j, board)){
            //move
            showMoveAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}

// 右移
function moveRight(){
  //判断各自是否能够向右移动
  if (!canMoveRight(board)) {
    return false;
  }

  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 3; j++){//最后一列的数字不可能向右移动
      if (board[i][j] != 0) {
        //(i,j)右侧元素
        for(var k = 3; k > j; k--){
          //落脚位置是否为空 && 中间有没有障碍物
          if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
            //move
            showMoveAnimation(i,j,i,k);
            board[i][k] =  board[i][j];
            board[i][j] = 0;
            continue;
          }
          //落脚位置的数字和本来的数字相等 && 中间没有障碍物
          else if(board[i][k] ==  board[i][j] && noBlockHorizontal(i , k, j, board)){
            //move
            showMoveAnimation(i,j,i,k);
            //add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}

// 上移
function moveUp(){
  //判断各自是否能够向上移动
  if (!canMoveUp(board)) {
    return false;
  }

  for(var j = 0; j < 4; j++){
    for(var i = 1; i < 4; i++){//第一行不可能向上移动
      if (board[i][j] != 0) {
        //(i,j)上侧元素
        for(var k = 0; k < i; k++){
          //落脚位置是否为空 && 中间有没有障碍物
          if (board[k][j] == 0 && noBlockVertical(i,k,j,board)) {
            //move
            showMoveAnimation(i,j,k,j);
            board[k][j] =  board[i][j];
            board[i][j] = 0;
            continue;
          }
          //落脚位置的数字和本来的数字相等 && 中间没有障碍物
          else if(board[k][j] ==  board[i][j] && noBlockVertical(i , k, j, board)){
            //move
            showMoveAnimation(i,j,k,j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}
// 下移
function moveDown(){
  //判断各自是否能够向下移动
  if (!canMoveDown(board)) {
    return false;
  }

  for(var j = 0; j < 4; j++){
    for(var i = 0; i > 3; i++){//最后一行不可能向下移动
      if (board[i][j] != 0) {
        //(i,j)下侧元素
        for(var k = 3; k > i; k--){
          //落脚位置是否为空 && 中间有没有障碍物
          if (board[k][j] == 0 && noBlockVertical(i,k,j,board)) {
            //move
            showMoveAnimation(i,j,k,j);
            board[k][j] =  board[i][j];
            board[i][j] = 0;
            continue;
          }
          //落脚位置的数字和本来的数字相等 && 中间没有障碍物
          else if(board[k][j] ==  board[i][j] && noBlockVertical(i , k, j, board)){
            //move
            showMoveAnimation(i,j,k,j);
            //add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}