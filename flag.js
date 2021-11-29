
//CODE

let twrk = {};


//COORDINATES

twrk.scale = function ({ width, height }) {
    if (width) {
        twrk.width = width;
        twrk.res = window.innerWidth / twrk.width;
        twrk.height = window.innerHeight / twrk.res;
    } else if (height) {
        twrk.height = height;
        twrk.res = window.innerHeight / twrk.height;
        twrk.width = window.innerWidth / twrk.res;
    }
    twrk.center = { x: twrk.width / 2, y: twrk.height / 2 };
}
twrk.scale({ height: 120 });


//SVG

let svg = {};

svg.nameSpace = "http://www.w3.org/2000/svg";

svg.path = function (ia) {

    let output = "M ";
    for (var i = 0; i < ia.length; i++) {
        output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
    }
    output += "z";

    return output;
};

svg.paths = function (ia) {
    let output = "";
    for (var i = 0; i < ia.length; i++) {
        output += svg.path (ia[i]);
    }

    return output;
};


svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
    dom[id] = document.createElementNS(svg.nameSpace, "svg");
    dom[id].id = id;
    dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
    parent.appendChild(dom[id]);
};

svg.makeLine = function ({ parent, id, d = "", color = "#fff", stroke = 1, cap = "butt", join = "round" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", "none");
    dom[id].setAttributeNS(null, "d", d);
    dom[id].setAttributeNS(null, "stroke-width", stroke * twrk.res);
    dom[id].setAttributeNS(null, "stroke", color);
    dom[id].setAttributeNS(null, "stroke-linecap", cap);
    dom[id].setAttributeNS(null, "stroke-join", join);
    dom[id].id = id;
    parent.appendChild(dom[id]);
};

svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", color);
    dom[id].setAttributeNS(null, "d", d);
    dom[id].id = id;
    parent.appendChild(dom[id]);
};


//DOM

let dom = {};

//stage
dom.stage = document.createElement("stage");
dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
dom.stage.id = "stage";
document.body.appendChild(dom.stage);

//svg layer
svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });

//drawing

let pointSize = 0.4
let distance = 2
let pointNumber = 40
let offset = pointNumber/2 * distance
let resolution = 0.05
let amplification = 10
let controller = 0.0001

let simplex = new SimplexNoise()

/*Dom Objekt wird einmal ausserhalb von loop generiert*/
svg.makeLine({ parent: dom.svgLayer, id: "punkte", cap: "round", stroke: pointSize, color: "#fff", d: ""})

function loop(time) {

        let collect = [];
        for (let y = 0; y < pointNumber; y++) {
            for (let x = 0; x < pointNumber; x++) {
                noiseX = simplex.noise2D(time * controller, y * resolution) * amplification
                noiseY = simplex.noise2D(x * resolution, time * controller) * amplification

                collect.push([{ x: (pointSize + distance * x - offset) + noiseX, y: (pointSize + distance * y - offset) + noiseY}])
            }
        
        }
    

    dom["punkte"].setAttributeNS(null, "d", svg.paths(collect));

    requestAnimationFrame(loop);
};

loop(0);
