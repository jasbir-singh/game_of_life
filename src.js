var canvas = document.getElementById("game-of-life");
var ctx = canvas.getContext("2d");

var width = 10;
var height = 10;

var scale = 50;
var currentGen = [];

// let's start by 10x10 array
function initialize() {
  for (var i = 0; i < width; i++) {
    currentGen[i] = [];

    for (var j = 0; j < height; j++) {
      // currentGen[i][j] = Math.floor(Math.random() * 10);
      // currentGen[i][j] = 0;
    }
  }
  currentGen[3][4] = 1;
  currentGen[4][4] = 1;
  currentGen[5][4] = 1;
  // cells[4][5] = 1;
}

function checkNeighbourhood(cells, i, j) {
  if (i === 0 || j === 0 || i == width-1 || j == height-1) {
    return 0;
  }

  var live_cells = 0;

  if (cells[i-1][j-1] == 1) live_cells++;
  if (cells[i][j-1] == 1) live_cells++;
  if (cells[i+1][j-1] == 1) live_cells++;

  if (cells[i-1][j] == 1) live_cells++;
  // if (cells[i][j] == 1) live_cells++;
  if (cells[i+1][j] == 1) live_cells++;

  if (cells[i-1][j+1] == 1) live_cells++;
  if (cells[i][j+1] == 1) live_cells++;
  if (cells[i+1][j+1] == 1) live_cells++;


  return live_cells;
}

function draw(cells) {
  for (var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++ ) {
      if (cells[i][j] == 1) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'white';
        ctx.strokeRect(i*scale, j*scale, scale, scale);
      }
      ctx.fillRect(i*scale, j*scale, scale, scale);
    }
  }
}

function next() {
  var nextGen = JSON.parse(JSON.stringify(currentGen));

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var live_cells = checkNeighbourhood(currentGen, i, j);
      console.log(live_cells);

      if ( live_cells < 2) {
        nextGen[i][j] = 0;
      } else if (live_cells == 3) {
        nextGen[i][j] = 1;
      } else if (live_cells > 3) {
        nextGen[i][j] = 0;
      }
    }
  }
  currentGen = nextGen;
}

initialize();
draw(currentGen);

function animate() {
  next();
  draw(currentGen);
  console.log('done');
}

// animate();
setInterval(animate, 100);
