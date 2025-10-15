const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let birdX = 50;
let birdY = 150;
let birdVelocity = 0;
const gravity = 0.25;
const jump = -4.6;
let score = 0;
let highScore = 0;
let pipes = [];
let frame = 0;
let gameStarted = false;
let gameOver = false;

// Pipe variables
const pipeWidth = 52;
const pipeGap = 100;
const pipeSpawnRate = 120; // frames

// Load images
const birdImg = new Image();
birdImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAvVJREFUWEftlk1oE1EUx8/9d9Jt0lRqbW2tWlS0FBEREURE/4hYQRDsVRCsihY9iB560IMHDx68iCAeBEF8+AE99KCiFz2o4EFRq1Yq1YI2tWna5JPJd9M0aWJjYy+8DHPv3b3/3HPv3TfE/3+G/j1gCIfD/Xw+3w9gR0dHDwBfA3j9fr+hUqkeA/gEwK4xGAz2A/gBwL43GAz2A/gLgK2NRqM/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0tFot/A/gLgK0t-';

const pipeTopImg = new Image();
pipeTopImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAWFJREFUeF7t2LENgEAMBEF/o3bQRGJgI3YQGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQ-';

const pipeBottomImg = new Image();
pipeBottomImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAWFJREFUeF7t2LENgEAMBEF/o3bQRGJgI3YQGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQRGzQ-';

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (gameOver) return;

    if (gameStarted) {
        birdVelocity += gravity;
        birdY += birdVelocity;

        // Collision detection
        if (birdY + birdImg.height / 2 >= canvas.height || birdY - birdImg.height / 2 <= 0) {
            endGame();
        }

        // Pipe movement
        if (frame % pipeSpawnRate === 0) {
            const pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
            pipes.push({ x: canvas.width, y: pipeY });
        }

        pipes.forEach(pipe => {
            pipe.x -= 2;

            // Collision with pipes
            if (
                birdX < pipe.x + pipeWidth &&
                birdX + birdImg.width > pipe.x &&
                (birdY < pipe.y || birdY + birdImg.height > pipe.y + pipeGap)
            ) {
                endGame();
            }

            // Score
            if (pipe.x + pipeWidth < birdX && !pipe.scored) {
                score++;
                pipe.scored = true;
            }
        });

        // Remove off-screen pipes
        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

        frame++;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pipes
    pipes.forEach(pipe => {
        ctx.drawImage(pipeTopImg, pipe.x, pipe.y - pipeTopImg.height, pipeWidth, pipeTopImg.height);
        ctx.drawImage(pipeBottomImg, pipe.x, pipe.y + pipeGap, pipeWidth, pipeBottomImg.height);
    });

    // Draw bird
    ctx.drawImage(birdImg, birdX, birdY, birdImg.width, birdImg.height);

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (!gameStarted) {
        ctx.font = '30px Arial';
        ctx.fillText('Click to Start', canvas.width / 2 - 80, canvas.height / 2);
    }

    if (gameOver) {
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2 - 50);
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 40, canvas.height / 2);
        ctx.fillText(`High Score: ${highScore}`, canvas.width / 2 - 60, canvas.height / 2 + 30);
        ctx.fillText('Click to Restart', canvas.width / 2 - 70, canvas.height / 2 + 60);
    }
}

function resetGame() {
    birdY = 150;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
    gameOver = false;
    gameStarted = true;
}

function endGame() {
    gameOver = true;
    gameStarted = false;
    if (score > highScore) {
        highScore = score;
    }
}

document.addEventListener('click', () => {
    if (!gameStarted && !gameOver) {
        gameStarted = true;
    }
    if (gameOver) {
        resetGame();
    } else {
        birdVelocity = jump;
    }
});

// Start the game loop
gameLoop();