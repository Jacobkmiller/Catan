/**
 * Created by Zachary on 8/29/2016.
 */

function NumberButton(number, x, y, radius) {

    PIXI.Container.call(this);
    // this.x = x;
    // this.y = y;
    this.pivot.x = radius;
    this.pivot.y = radius;
    // console.log(this.width);
    this.position.set(x,y);
    this.radius = radius;
    this.number = number;
    this.token = new PIXI.Graphics();
    // console.log("Radius: " + this.radius);
    this.create = function (g) {
        var stats = {};

        stats[2] = {color: "#000000", probability: 1};
        stats[3] = {color: "#000000", probability: 2};
        stats[4] = {color: "#000000", probability: 3};
        stats[5] = {color: "#000000", probability: 4};
        stats[6] = {color: "#FF0000", probability: 5};
        stats[8] = {color: "#FF0000", probability: 5};
        stats[9] = {color: "#000000", probability: 4};
        stats[10] = {color: "#000000", probability: 3};
        stats[11] = {color: "#000000", probability: 2};
        stats[12] = {color: "#000000", probability: 1};

        g.beginFill(0xFAEA92);
        g.lineStyle(2, 0x927D07, 1);
        g.drawCircle(this.radius, this.radius, this.radius);
        var textStyle = {
            fill: stats[this.number]['color'],
            fontSize: this.radius * 1 + 'px'
        };


        this.text = new PIXI.Text(this.number, textStyle);
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.x =this.radius;
        this.text.y = this.radius - this.radius * .1;

    };

    this.add_probability = function (g) {
        var stats = {};

        stats[2] = {color: "#000000", probability: 1};
        stats[3] = {color: "#000000", probability: 2};
        stats[4] = {color: "#000000", probability: 3};
        stats[5] = {color: "#000000", probability: 4};
        stats[6] = {color: "#FF0000", probability: 5};
        stats[8] = {color: "#FF0000", probability: 5};
        stats[9] = {color: "#000000", probability: 4};
        stats[10] = {color: "#000000", probability: 3};
        stats[11] = {color: "#000000", probability: 2};
        stats[12] = {color: "#000000", probability: 1};

        var prob = stats[this.number]["probability"];
        var color = parseInt(stats[this.number]['color'].replace("#", ''), 16);
        for (var j = 0; j < prob; j++) {
            g.beginFill(color);
            g.lineStyle(0, 0x000000, 0);

            if (prob % 2 != 0) {
                g.drawCircle(this.radius - this.radius * Math.floor(prob / 2) * 0.15 + j * 0.15 * this.radius, this.radius + this.radius * 0.55, this.radius * 0.05);
            } else {
                g.drawCircle(this.radius - this.radius * Math.floor(prob / 2) * 0.15 + j * 0.15 * this.radius + this.radius * 0.05, this.radius + this.radius * 0.55, this.radius * 0.05);
            }
        }

    };

    this.create(this.token);
    this.add_probability(this.token);
    this.addChild(this.token);
    this.addChild(this.text);

}

NumberButton.prototype = Object.create(PIXI.Container.prototype);
NumberButton.prototype.constructor = NumberButton;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.round(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function Hex(url, x, y, width, number) {
    PIXI.Container.call(this);
    this.sprite = PIXI.Sprite.fromImage(url);
    this.sprite.width=width;
    this.sprite.height= this.sprite.width * 2 * Math.sqrt(3)/3;
    this.sprite.anchor.set(0.5,0.5);
    this.height = 2 * Math.sqrt(3)/3 * this.width;
    this.pivot.x = this.width/2;
    this.pivot.y = this.height/2;
    this.position.set(x, y);
    // this.type = type;
    this.addChild(this.sprite);

    if (number == 0) {
        this.button = null;
    } else {
        this.button = new NumberButton(number, 0, 0, this.sprite.width * 0.14);
        this.addChild(this.button);
    }

}

Hex.prototype = Object.create(PIXI.Container.prototype);
Hex.prototype.constructor = Hex;

function GameBoard(x, y, width) {
    PIXI.Container.call(this);
    this.images = ['static/Game/images/desert.png','static/Game/images/brick.png', 'static/Game/images/forest.png', 'static/Game/images/meadow.png', 'static/Game/images/mountain.png', 'static/Game/images/wheat.png'];
    this.layout = [3,4,5,4,3];
    this.starting_position = [2,1,0,1,2];
    this.hex_list = [0,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,3,5,2];
    this.buttons = [3, 9, 10, 4, 8, 12, 5, 10, 3, 5, 8, 11, 6, 2, 6, 9, 4, 11];
    this.rotations = [0, Math.PI/3, Math.PI *2/3, Math.PI, Math.PI * 4/3, Math.PI * 5/3];
    this.buttons = shuffle(this.buttons);
    console.log(this.buttons.length);
    this.randomized_hex_list = shuffle(this.hex_list);
    this.coordinates = [];
    this.hexes = [];
    var count = 0;
    var desert_reached = 0;
    this.tile_width = width * 0.2;
    this.tile_height = this.tile_width * 2 / 3 * Math.sqrt(3);
    for (var j = 0; j < 5; j++) {

        var i = 0;
        var row = [];
        while (i < this.layout[j]) {
            var n = this.randomized_hex_list[i+count];
            var x1 = (this.tile_width) * i + this.starting_position[j]*this.tile_width/2 + this.tile_width/2;
            var y1 = (this.tile_height-this.tile_width/(2*Math.sqrt(3))) * j + this.tile_height/2;
            var type = '';
            var a = this.images[n].split("/");
            type = a[a.length - 1];
            type = type.split('.')[0];
            if (n == 0) {
                var tile = new Hex(this.images[n], x1, y1, this.tile_width, 0);
                desert_reached = 1;
            } else {
                console.log(i + count - desert_reached);
                var tile = new Hex(this.images[n], x1, y1, this.tile_width, this.buttons[i + count - desert_reached]);
            }
            tile.rotation = this.rotations[Math.round(Math.random()*5)];

            this.addChild(tile);
            row.push(tile);
            this.coordinates.push({'x':tile.x, 'y':tile.y});
            i += 1;
        };
        this.hexes.push(row);
        count += this.layout[j];
    };
    // this.position.set(300, 250);
    this.pivot.set(this.width/2, this.height/2);
    this.position.set(x, y);
}

GameBoard.prototype = Object.create(PIXI.Container.prototype);
GameBoard.prototype.constructor = GameBoard;