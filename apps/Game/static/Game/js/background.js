/**
 * Created by Zachary on 8/29/2016.
 */

function create_number(stage, number, x, y, radius) {
        var stats = {};

        stats[2] = {color: "#000000", probability: 1};
        stats[3] = {color: "#000000", probability: 2};
        stats[4] = {color: "#000000", probability: 3};
        stats[5] = {color: "#000000", probability: 4};
        stats[6] = {color: "#000000", probability: 5};
        stats[8] = {color: "#FF0000", probability: 5};
        stats[9] = {color: "#000000", probability: 4};
        stats[10] = {color: "#000000", probability: 3};
        stats[11] = {color: "#000000", probability: 2};
        stats[12] = {color: "#000000", probability: 1};

        var num_piece = new PIXI.Graphics();

        num_piece.beginFill(0xFAEA92);
        num_piece.lineStyle(2, 0x927D07, 1);
        num_piece.drawCircle(x, y, radius);
        stage.addChild(num_piece);

        var textStyle = {fill: stats[number]['color'],
                         fontSize: radius*1 + 'px'
        };
        var text_num = new PIXI.Text(number, textStyle);
        text_num.anchor.x = 0.5;
        text_num.anchor.y = 0.5;
        text_num.x = x;
        text_num.y = y - radius * .1;

        add_probability(stage, number, x, y, radius);

        stage.addChild(text_num);


}

function add_probability (stage, number, x, y, radius) {
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

    var prob = stats[number]["probability"];
    var color = parseInt(stats[number]['color'].replace("#", ''), 16);
    var g = new PIXI.Graphics();
    for (j=0; j<prob; j++) {
        g.beginFill(color);

        if (prob%2 != 0) {
            g.drawCircle(x-radius*Math.floor(prob/2)*0.15 + j*0.15*radius, y+radius*0.55, radius*0.05);
            console.log("odd")
        }   else {
            console.log("even");
            g.drawCircle(x-radius*Math.floor(prob/2)*0.15 + j*0.15*radius + radius*0.05, y+radius*0.55, radius*0.05);
        }
    }

    stage.addChild(g);


}