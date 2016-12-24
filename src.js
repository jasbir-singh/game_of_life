var canvas = document.getElementById("game-of-life");
var ctx = canvas.getContext("2d");

var width = 50;
var height = 50;

var scale = 20;
var currentGen = [];

// let's start by 10x10 array
function initializeCells() {
  for (var i = 0; i < width; i++) {
    currentGen[i] = [];

    for (var j = 0; j < height; j++) {
      // currentGen[i][j] = Math.floor(Math.random() * 2);
      currentGen[i][j] = 0;
    }
  }
}

function acorn() {
  // see https://www.refsmmat.com/posts/2016-01-25-conway-game-of-life.html
  currentGen[1][1] = 1;
  currentGen[2][1] = 1;
  currentGen[2][3] = 1;
  currentGen[4][2] = 1;
  currentGen[5][1] = 1;
  currentGen[6][1] = 1;
  currentGen[7][1] = 1;
}

function oscillator() {
  currentGen[3][4] = 1;
  currentGen[4][4] = 1;
  currentGen[5][4] = 1;
}

function drawInitialGrid() {
  for (var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++ ) {
      ctx.strokeRect(i*scale, j*scale, scale, scale);
    }
  }
}

function mod(i, n) {
  return (((i % n) + n) % n);
}

function checkNeighbourhood(cells, i, j) {
  var live_cells = 0;

  var _i = mod(i-1, width);
  var i_ = mod(i+1, width);

  var _j = mod(j-1, height);
  var j_ = mod(j+1, height);

  if (cells[_i][_j] == 1) live_cells++;
  if (cells[i][_j] == 1) live_cells++;
  if (cells[i_][_j] == 1) live_cells++;

  if (cells[_i][j] == 1) live_cells++;
  // if (cells[i][j] == 1) live_cells++;
  if (cells[i_][j] == 1) live_cells++;

  if (cells[_i][j_] == 1) live_cells++;
  if (cells[i][j_] == 1) live_cells++;
  if (cells[i_][j_] == 1) live_cells++;


  return live_cells;
}

function draw(cells) {
  for (var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++ ) {
      if (cells[i][j] == 1) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.fillRect(i*scale, j*scale, scale, scale);
      ctx.strokeRect(i*scale, j*scale, scale, scale);
    }
  }
}

function next() {
  var nextGen = JSON.parse(JSON.stringify(currentGen));

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var live_cells = checkNeighbourhood(currentGen, i, j);

      if ( live_cells < 2) {
        nextGen[i][j] = 0;
      } else if (live_cells == 2 || live_cells == 3) {
        nextGen[i][j] = 1;
      } else if (live_cells > 3) {
        nextGen[i][j] = 0;
      }
    }
  }
  currentGen = nextGen;
}

initializeCells();
drawInitialGrid();
acorn();
draw(currentGen);

function animate() {
  draw(currentGen);
  next();
}

// animate();
setInterval(animate, 75);
