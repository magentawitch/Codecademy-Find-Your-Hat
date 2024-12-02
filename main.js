const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/**
 * @param {Array} field
 */


class Field {
    constructor(field) {
        this._field = field;
        this._lastPos = field[0][0];
        this._newPos = this._lastPos;
        this._win = false;
        this._lose = false;
    }

    get field() {
        return this._field;
    }

    get lastPos() {
        return this._lastPos;
    }

    set lastPos(position) {
        this._lastPos = this.field[position[0]][position[1]];
    }

    get newPos() {
        return this._newPos;
    }

    set newPos(position) {
        this._newPos = this.field[position[0]][position[1]];
    }

    get win() {
        return this._win;
    }

    set win(value) {
        this._win = value;
    }

    get lose() {
        return this._lose;
    }

    set lose(value) {
        this._lose = value;
    }

    print() {

        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(""));
        }
    }

    userInput() {
        let move = prompt("Where would you like to move? ").toLowerCase();


        while (move !== "left" && move !== "right" && move !== "up" && move !== "down") {
            console.log("Please provide a valid direction: up, down, left or right.")
            move = prompt("Where would you like to move? ").toLowerCase();
        }

        while (!this.userMovement(move) && !this.win && !this.lose) {
            move = prompt("Where would you like to move? ").toLowerCase();
        }
    }

    userMovement(move) {
        let y;
        let x;

        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                if (this.field[i][j] === pathCharacter) {
                    y = i;
                    x = j;
                }
            }
        }

        switch (move) {
            case "up":
                if (y > 0) {
                    this.newPos = [(y - 1), x];
                    this.winCondition();
                    this.loseCondition();
                    if (this.win === true|| this.lose === true) {
                        break;
                    }
                    this.field[y].splice(x, 1, fieldCharacter)
                    this.field[y - 1].splice(x, 1, pathCharacter)
                    return true;
                } else {
                    console.log("There is no way up from this position, please provide a valid direction: down, left, right.")
                    return false;
                }
            case "down":
                if (y < this.field.length) {
                    this.newPos = [(y + 1), x];
                    this.winCondition();
                    this.loseCondition();
                    if (this.win === true|| this.lose === true) {
                        break;
                    }
                    this.field[y].splice(x, 1, fieldCharacter);
                    this.field[y + 1].splice(x, 1, pathCharacter);
                    return true
                } else {
                    console.log("There is no way down from this position, please provide a valid direction: up, left, right.")
                    return false;
                }
            case "left":
                if (x > 0) {
                    this.newPos = [y, (x - 1)];
                    this.winCondition();
                    this.loseCondition();
                    if (this.win === true|| this.lose === true) {
                        break;
                    }
                    this.field[y].splice(x, 1, fieldCharacter);
                    this.field[y].splice((x - 1), 1, pathCharacter);
                    return true;
                } else {
                    console.log("You can't go left from this position, please provide a valid direction: up, down, right.")
                    return false;
                }
            case "right":
                if (x < this.field[y].length) {
                    this.newPos = [y, (x + 1)];
                    this.winCondition();
                    this.loseCondition();
                    if (this.win === true|| this.lose === true) {
                        break;
                    }
                    this.field[y].splice(x, 1, fieldCharacter);
                    this.field[y].splice((x + 1), 1, pathCharacter);
                    return true;
                } else {
                    console.log("You can't go right from this position, please provide a valid direction: up, down, left.")
                    return false;
                }
        }
    }



    winCondition() {
        if (this.newPos === hat) {
            console.log("You found your hat!")
            this.win = true;
        }
    }

    loseCondition() {
        if (this.newPos === hole) {
            console.log("You felt into a hole!")
            this.lose = true;
        }
    }


    gameLoop() {
        while (!this.win && !this.lose) {
            this.print();
            this.userInput();
        }
    }
    static generateField(height, width) {
        let field = [];
        let qOfElements = height * width;
        for (let i = 0; i < height; i++) {
            let innerField = [];
            for (let j = 0; j < width; j++) {
                if (i === 0 && j === 0) {
                    innerField.push(pathCharacter);
                }
                else {
                    let num = Math.floor(Math.random() * 3);
                    switch (num) {
                        case 0:
                            if (!innerField.includes(hat) && !field.flat().includes(hat)) {
                                innerField.push(hat);
                            } else {
                                innerField.push(fieldCharacter);
                            }
                            break;
                        case 1:
                            let holesOnField = field.flat().filter(char => char === hole);
                            let holesOnInnerField = innerField.filter(char => char === hole);
                            let qOfHoles = holesOnField.length + holesOnInnerField.length;

                            if (qOfHoles < qOfElements / 3) {
                                innerField.push(hole);
                            } else {
                                innerField.push(fieldCharacter);
                            }
                            break;
                        case 2:
                            innerField.push(fieldCharacter);
                            break;
                    }
                }
                innerField.push();
            }
            field.push(innerField);
        }
        console.log(field);
        while (!field.flat().includes(hat)) {
            console.log("inside while")
            let y = Math.floor(Math.random() * height);
            let x = Math.floor(Math.random() * width);
            if (field[y][x] !== pathCharacter && field[y][x] !== hole) {
                field[y][x] = hat;
            }
        }
        return field;
    }
}

let Field1 = new Field(Field.generateField(3, 3));

Field1.gameLoop();



/* TESTS */

