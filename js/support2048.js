function getPosTop(i,j){
  return 20 + i * 120;
}

function getPosLeft(i,j){
  return 20 + j * 120;
}

//数字块背景色
function getNumberBackgroundColor(number) {
    switch (number) {
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#eee4da";
        break;
    case 8:
        return "#f26179";
        break;
    case 16:
        return "#f59563";
        break;
    case 32:
        return "#f67c5f";
        break;
    case 64:
        return "#f65e36";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#9c0";
        break;
    case 1024:
        return "#3365a5";
        break;
    case 2048:
        return "#09c";
        break;
    case 4096:
        return "#a6bc";
        break;
    case 8192:
        return "#93c";
        break;
    }
    return "black";
}
// 数字块字体色
function getNumberColor(number){
  if (number <= 4) {
    return '#776e65';
  }
  return 'white';
}

//在随机生成数字的时候判断16宫格中是否还有空间
function nospace(board) {
  for ( var i = 0; i < 4; i++){ 
    for ( var j = 0; j < 4; j++) {
      if (board[i][j] == 0)
        return false;
    }
  }
  return true;
}

// 判断是否可以左移
function canMoveLeft(board){
  for ( var i = 0; i < 4; i++){ 
    for ( var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {//当这个数字块左边为0（空）或者左边和自身相等
        if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
          return true;//可以左移
        }
      }
    }
  }
}
// 判断是否可以右移
function canMoveRight(board){
  for ( var i = 0; i < 4; i++){ 
    for ( var j = 4; j > 0; j--) {
      if (board[i][j] != 0) {//当这个数字块右边为0（空）或者右边和自身相等
        if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
          return true;//可以右移
        }
      }
    }
  }
}
// 判断是否可以上移
function canMoveUp(board){
  for ( var j = 0; j < 4; j++) {
    for ( var i = 1; i < 4; i++){ 
      if (board[i][j] != 0) {//当这个数字块上边为0（空）或者上边和自身相等
        if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
          return true;//可以上移
        }
      }
    }
  }
}
// 判断是否可以下移
function canMoveDown(board){
  for ( var j = 0; j < 4; j++) {
    for ( var i = 4; i > 0; i--){ 
      if (board[i][j] != 0) {//当这个数字块下边为0（空）或者下边和自身相等
        if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
          return true;//可以下移
        }
      }
    }
  }
}

// 判断水平方向是否有障碍物
function noBlockHorizontal(row,col1,col2,board){//i,k,j,board
  for(var i = col1 + 1; i < col2; i++){
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

// 判断垂直方向是否有障碍物
function noBlockVertical(row1,row2,col,board){//i,k,j,board
  for(var i = row1 + 1; i < row2; i++){
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}
//不能移动
function noMove(board){
  if (canMoveLeft(board) ||canMoveRight(board)) {
    return false;
  }
  return true;
}