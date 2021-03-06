let canvas = document.getElementById("game-of-life");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let scale = 10;

let currentGen = [];

// let's start by 10x10 array
const initializeCells = () => {
  for (let i = 0; i < width; i++) {
    currentGen[i] = [];

    for (let j = 0; j < height; j++) {
      // currentGen[i][j] = Math.floor(Math.random() * 2);
      currentGen[i][j] = 0;
    }
  }
}

const liveCells = () => {
  let live_cells = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (currentGen[i][j] == 1) {
        live_cells.push([i, j]);
      }
    }
  }

  return live_cells;
}

const gosperGlider = () => {
  let preFilledCells = [
    [1, 5],
    [1, 6],
    [2, 5],
    [2, 6],
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 4],
    [12, 8],
    [13, 3],
    [13, 9],
    [14, 3],
    [14, 9],
    [15, 6],
    [16, 4],
    [16, 8],
    [17, 5],
    [17, 6],
    [17, 7],
    [18, 6],
    [21, 3],
    [21, 4],
    [21, 5],
    [22, 3],
    [22, 4],
    [22, 5],
    [23, 2],
    [23, 6],
    [25, 1],
    [25, 2],
    [25, 6],
    [25, 7],
    [35, 3],
    [35, 4],
    [36, 3],
    [36, 4]
  ];

  preFilledCells.forEach((point) => {
    currentGen[point[0]][point[1]] = 1;
  });
}

const acorn = () => {
  // see https://www.refsmmat.com/posts/2016-01-25-conway-game-of-life.html
  currentGen[1][1] = 1;
  currentGen[2][1] = 1;
  currentGen[2][3] = 1;
  currentGen[4][2] = 1;
  currentGen[5][1] = 1;
  currentGen[6][1] = 1;
  currentGen[7][1] = 1;
}

const oscillator = () => {
  currentGen[3][4] = 1;
  currentGen[4][4] = 1;
  currentGen[5][4] = 1;
}

const drawInitialGrid = () => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      ctx.strokeRect(i * scale, j * scale, scale, scale);
    }
  }
}

const mod = (i, n) => {
  return (((i % n) + n) % n);
}

const checkNeighbourhood = (cells, i, j) => {
  let live_cells = 0;

  let _i = mod(i - 1, width);
  let i_ = mod(i + 1, width);

  let _j = mod(j - 1, height);
  let j_ = mod(j + 1, height);

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

const draw = (cells) => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (cells[i][j] == 1) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.strokeRect(i * scale, j * scale, scale, scale);
      ctx.fillRect(i * scale, j * scale, scale, scale);
    }
  }
}

const next = () => {
  let nextGen = JSON.parse(JSON.stringify(currentGen));

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let live_cells = checkNeighbourhood(currentGen, i, j);

      if (live_cells < 2) {
        // underpopulation
        nextGen[i][j] = 0;
      } else if (live_cells == 2) {
        if (nextGen[i][j] === 1) {
          nextGen[i][j] = 1;
        }
      } else if (live_cells == 3) {
        // reproduction
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
// oscillator();
acorn();
// gosperGlider();
draw(currentGen);

const animate = () => {
  draw(currentGen);
  next();
}

animate();

// animate();
setInterval(animate, 200);
