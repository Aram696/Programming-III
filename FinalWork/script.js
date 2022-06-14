let matrix = [];
let side = 15;

function generate(a, b) {
    for (let i = 0; i < a; i++) {
        matrix.push([]);
        for (let j = 0; j < b; j++) {
            matrix[i].push(Math.round(Math.random() * 6))
        }
    }

}

generate(50, 50);

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('black');

    // let gr = new Grass(1, 2);
    // let found1 = gr.chooseCell(1);
    // console.log(found1);
}

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let tractorArr = [];
let bombArr = [];
let farmerArr = [];

function objectCreation() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                grassArr.push(new Grass(x, y));
            }
            else if (matrix[y][x] === 2) {
                grassEaterArr.push(new GrassEater(x, y));
            }
            else if (matrix[y][x] === 3) {
                predatorArr.push(new Predator(x, y));
            }
            else if (matrix[y][x] === 4) {
                tractorArr.push(new Tractor(x, y));
            }
            else if (matrix[y][x] === 5) {
                bombArr.push(new Bomb(x, y));
            }
            else if (matrix[y][x] === 6) {
                farmerArr.push(new Farmer(x, y));
            }
        }
    }
}

objectCreation();
// console.log(grassArr);

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("purple");
            }

            rect(x * side, y * side, side, side);

        }
    }
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
        // grassEaterArr[i].chooseCell(0);  
        // grassEaterArr[i].die();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
        // predatorArr[i].chooseCell(0);  
        // predatorArr[i].die();
    }
    for (let i = 0; i < tractorArr.length; i++) {
        tractorArr[i].eat();
    }
    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat_grass();
        bombArr[i].eat_grasseater();
        bombArr[i].eat_predator();
        bombArr[i].eat_tractor();
    }
    for (let i = 0; i < farmerArr.length; i++) {
        farmerArr[i].eat();
    }
}