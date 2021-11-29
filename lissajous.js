function setup () {
    createCanvas(500, 500)
    colorMode(HSL, 360, 100,100)
}

const radius = 150
let a = 0
let xFactor = 10

function draw () {
    background(1)
    translate(width / 2, height /2)
    let c = 0
    for (let i = 0; i < TAU; i += TAU / 110) {
        let x = cos(i + xFactor) * radius
        let y = sin(i *2) * radius * 0.75
        let sw = map(sin(a - i), -1, 1, 1, 10)
        let hue = map(i, 0, TAU, 0, 360)
        let sc = color(hue, 70, 50)
        stroke(sc)
        strokeWeight(sw)
        point(x, y)
    }
    a += TAU / 360 
    xFactor += 0.01
}
