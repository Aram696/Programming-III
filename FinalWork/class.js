class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    };

    mul() {
        this.multiply++
        let emptyCell = random(this.chooseCell(0));
        if (emptyCell && this.multiply >= 8) {
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));
            this.multiply = 0;
        }

    }

}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    newCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {

        this.newCoordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    };

    mul() {
        let emptyCell = random(this.chooseCell(0))

        if (emptyCell && this.energy > 6) {

            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y))
            this.energy = 0;
        }
    }

    move() {

        this.energy--
        let emptyCell = random(this.chooseCell(0)) //[2,3]

        if (emptyCell) {

            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            // grasseaterArr.push(new GrassEater(x,y))

            this.x = x;
            this.y = y;

        }
        this.die()
    }

    eat() {
        let food = random(this.chooseCell(1)); //[8,6]

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 2;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }

            }

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            // grasseaterArr.push(new GrassEater(x,y))
            this.energy += 2;

        } else {
            this.move()
        }
    }

    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {

                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}

class Predator {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 6
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    newCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {

        this.newCoordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    };

    mul() {
        let emptyCell = random(this.chooseCell(0))

        if (emptyCell && this.energy > 6) {

            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y))
            this.energy = 0;
        }
    }

    move() {

        this.energy--
        let emptyCell = random(this.chooseCell(0))

        if (emptyCell) {
this.multiply++
            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
        this.die()
    }

    eat() {
        let food = random(this.chooseCell(2)); //[8,6]

        if (food && this.multiply >12) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 3;

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }

            }

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            // grasseaterArr.push(new GrassEater(x,y))
            this.energy += 2;

        } else {
            this.move()
        }
    }

    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x === this.x && predatorArr[i].y === this.y) {

                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

class Tractor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
        ];

    }

    newCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
        ];
    }

    chooseCell(character) {

        this.newCoordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    };

    move() {

        this.energy--
        let emptyCell = random(this.chooseCell(0))

        if (emptyCell) {

            let x = emptyCell[0];
            let y = emptyCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
        this.die()
    }

    eat() {
        let food = random(this.chooseCell(1));

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 4;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }
            }

            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
            this.energy += 1;

        } else {
            this.move()
        }
    }

    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0
            for (let i = 0; i < tractorArr.length; i++) {
                if (tractorArr[i].x === this.x && tractorArr[i].y === this.y) {

                    tractorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}

class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 1;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    newCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {

        this.newCoordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    };

    eat_tractor() {
        let food = random(this.chooseCell(4));

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 0;

            for (let i = 0; i < tractorArr.length; i++) {
                if (tractorArr[i].x == x && tractorArr[i].y == y) {
                    tractorArr.splice(i, 1);
                }
            }
        }
    }

    eat_predator() {
        let food = random(this.chooseCell(3));

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 0;

            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }

    eat_grasseater() {
        let food = random(this.chooseCell(2));

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 0;

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }
            }
        }
    }

    eat_grass() {
        let food = random(this.chooseCell(1));

        if (food) {
            let x = food[0];
            let y = food[1];

            matrix[y][x] = 0;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }
            }
        }
    }

    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0
            for (let i = 0; i < bombArr.length; i++) {
                if (bombArr[i].x === this.x && bombArr[i].y === this.y) {

                    bombArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}