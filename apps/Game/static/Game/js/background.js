/**
 * Created by Zachary on 8/29/2016.
 */

function NumberButton(number, x, y, radius) {

    PIXI.Container.call(this);
    this.pivot.x = radius;
    this.pivot.y = radius;
    this.position.set(x,y);
    this.radius = radius;
    this.number = number;
    this.token = new PIXI.Graphics();
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

function Hex(url, x, y, width, number) {
    PIXI.Container.call(this);
    this.sprite = PIXI.Sprite.fromImage(url);
    this.sprite.interactive = false;
    this.interactive = false;
    this.sprite.width=width;
    this.sprite.height= this.sprite.width * 2 * Math.sqrt(3)/3;
    // Inradius of hexagon. (See wikipedia article on hexagons)
    this.r = this.sprite.width/2;
    // Circumradius of hexagon
    this.R = this.sprite.height/2;
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
    };

    this.corners_coordinates = [[0,this.R],
                                [this.r,this.R/2],
                                [this.r, -this.R/2],
                                [0, -this.R],
                                [-this.r, -this.R/2],
                                [-this.r, this.r/2]];
    this.edge_coordinates = [[-this.r/2,3/4*this.R],
                                [this.r/2, 3/4*this.R],
                                [this.r, 0],
                                [this.r/2, -3/4*this.R],
                                [-this.r/2, -3/4*this.R],
                                [-this.r, 0]];
    var rotations = [Math.PI/6, -Math.PI/6, Math.PI/2, Math.PI/6, -Math.PI/6, Math.PI/2];
    this.cities = [];
    this.roads = [];

    for (var k = 0; k < this.corners_coordinates.length; k++){
        var v_coord = this.corners_coordinates[k];
        var e_coord = this.edge_coordinates[k];
        var rad = 15;
        var width = 20;
        var city = new City(v_coord[0], v_coord[1], rad, 0x0, 0);
        var road = new Road(e_coord[0], e_coord[1], this.R-2*rad, width, rotations[k], 0x0, 0);
        this.addChild(road);
        this.addChild(city);
        this.cities.push(city);
        this.roads.push(road);
        // var vertex = new PIXI.Circle(rad, rad, rad);
        // var edge = new PIXI.Rectangle(0, 0, this.R-2*rad, width);
        // var v_container = new PIXI.Container();
        // var e_container = new PIXI.Container();
        // v_container.interactive = true;
        // v_container.pivot.set(rad, rad);
        // v_container.position.set(v_coord[0], v_coord[1]);
        // e_container.interactive = true;
        // e_container.pivot.set(this.R/2-rad, width/2);
        // e_container.position.set(e_coord[0], e_coord[1]);
        // var rec = new PIXI.Graphics();
        // var cir = new PIXI.Graphics();
        // cir.beginFill(0x000000, 0.4);
        // cir.drawShape(vertex);
        // rec.beginFill(0x000000, 0.4);
        // rec.drawShape(edge);
        // v_container.addChild(cir);
        // v_container.hitArea = vertex;
        // v_container.click = function(eventData) {
        //     console.log(eventData);
        // };
        //
        // e_container.addChild(rec);
        // e_container.rotation = rotations[k];
        // e_container.hitArea = edge;
        // e_container.click = function(eventData) {
        //     console.log(eventData);
        // };
        //
        // this.addChild(v_container);
        // this.addChild(e_container);
        // this.corners.push(v_container);
        // this.edges.push(e_container);
    }

}

Hex.prototype = Object.create(PIXI.Container.prototype);
Hex.prototype.constructor = Hex;

function Road(x, y, length, width, rotation, color, alpha) {
    PIXI.Container.call(this);
    this.interactive = true;
    this.length = length;
    this.w = width;
    this.pivot.set(length/2, width/2);
    this.position.set(x,y);
    this.road = new PIXI.Graphics();
    this.road.beginFill(color, alpha);
    this.hitArea = new PIXI.Rectangle(0, 0, length, width);
    this.road.drawShape(this.hitArea);
    this.rotation = rotation;
    this.addChild(this.road);


    this.click = function (eventData) {
        console.log(this.parent.parent.roads_hit(eventData.data.global));
    }
}

Road.prototype = Object.create(PIXI.Container.prototype);
Road.prototype.constructor = Road;

function City(x, y, radius, color, alpha) {
    PIXI.Container.call(this);
    this.pivot.set(0, 0);
    this.position.set(x, y);
    this.radius = radius;
    this.interactive = true;
    this.hitArea = new PIXI.Circle(0, 0, radius);
    this.city = new PIXI.Graphics();
    this.city.beginFill(color, alpha);
    this.city.drawShape(this.hitArea);
    this.addChild(this.city);

    this.click = function (eventData) {
        console.log(this.parent.parent.cities_hit(eventData.data.global));
    }


}

City.prototype = Object.create(PIXI.Container.prototype);
City.prototype.constructor = City;

function GameBoard(x, y, width) {
    PIXI.Container.call(this);
    this.interactive = false;
    this.images = ['static/Game/images/desert.png','static/Game/images/brick.png', 'static/Game/images/forest.png', 'static/Game/images/meadow.png', 'static/Game/images/mountain.png', 'static/Game/images/wheat.png'];
    this.layout = [3,4,5,4,3];
    this.starting_position = [2,1,0,1,2];
    this.hex_list = [0,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,3,5,2];
    this.buttons = [3, 9, 10, 4, 8, 12, 5, 10, 3, 5, 8, 11, 6, 2, 6, 9, 4, 11];
    this.hex_rotations = [0, Math.PI/3, Math.PI *2/3, Math.PI, Math.PI * 4/3, Math.PI * 5/3];
    this.buttons = shuffle(this.buttons);
    this.randomized_hex_list = shuffle(this.hex_list);
    this.coordinates = [];
    this.hexes = [];
    var count = 0;
    var desert_reached = 0;
    this.tile_width = width * 0.2;
    this.tile_height = this.tile_width * 2 / 3 * Math.sqrt(3);
    this.r = this.tile_width/2;
    this.R = this.tile_height/2;
    var road_rotations = [Math.PI/6, -Math.PI/6, Math.PI/2, Math.PI/6, -Math.PI/6, Math.PI/2];
    this.cities =[];
    this.roads = [];
    this.color = 0xff000;

    var corners_coordinates = [[0,this.R],
                                [this.r,this.R/2],
                                [this.r, -this.R/2],
                                [0, -this.R],
                                [-this.r, -this.R/2],
                                [-this.r, this.r/2]];
    var edge_coordinates = [[-this.r/2,3/4*this.R],
                                [this.r/2, 3/4*this.R],
                                [this.r, 0],
                                [this.r/2, -3/4*this.R],
                                [-this.r/2, -3/4*this.R],
                                [-this.r, 0]];

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
                var tile = new Hex(this.images[n], x1, y1, this.tile_width, this.buttons[i + count - desert_reached]);
            }

            tile.rotation = this.hex_rotations[Math.round(Math.random()*5)];

            this.addChild(tile);
            // row.push(tile);
            this.hexes.push(tile);
            this.coordinates.push({'x':tile.x, 'y':tile.y});
            i += 1;
        };
        // this.hexes.push(row);
        count += this.layout[j];
    };
    this.pivot.set(this.width/2, this.height/2);
    this.position.set(x, y);

    this.cities_hit = function(point) {
        console.log(point);
        var cities = [];
        for (var i = 0; i < this.hexes.length; i++) {
            var hex = this.hexes[i];
            for (var j=0; j < hex.cities.length; j++){
                var city = hex.cities[j];
                if (city.city.containsPoint(point)) {
                    cities.push(city);
                    this.redraw_city(city);
                }
            }
        }
        return cities;
    }

    this.roads_hit = function(point) {
        console.log(point);
        var roads = [];
        for (var i = 0; i < this.hexes.length; i++) {
            var hex = this.hexes[i];
            for (var j=0; j < hex.roads.length; j++){
                var road = hex.roads[j];
                if (road.road.containsPoint(point)) {
                    roads.push(road);
                    this.redraw_road(road);
                }
            }
        }
        return roads;
    }

    this.redraw_city = function (city) {
        var oldCity = city;
        var hex = oldCity.parent;
        var newCity = new City(oldCity.x, oldCity.y, oldCity.radius, this.color, 1);
        hex.removeChild(oldCity);
        hex.addChild(newCity);
    }

    this.redraw_road = function (road) {
        var oldRoad = road;
        var hex = oldRoad.parent;
        var newRoad = new Road(oldRoad.x, oldRoad.y, oldRoad.length, oldRoad.w, oldRoad.rotation, this.color, 1);
        hex.removeChild(oldRoad);
        hex.addChild(newRoad);
    }

}

GameBoard.prototype = Object.create(PIXI.Container.prototype);
GameBoard.prototype.constructor = GameBoard;