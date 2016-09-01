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
    console.log("Radius: " + this.radius);
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
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


Hex.prototype = Object.create(PIXI.Sprite.prototype);
Hex.prototype.constructor = Hex;


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