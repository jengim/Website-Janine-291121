let phenomena = []

function setup() {
  createCanvas(900, 900)
  noFill()
  stroke(100,25,200)
  fill(100,25,200)

  // Phänomene generieren, in Raster positioniert.
  for (let i = 0; i < 900; i += 100) {
    for (let j = 0; j < 900; j += 100) {
      phenomena.push(new Phenomenon(i, j, 100))
    }
  }
  // Sollen die Phänomene in einem Raster stehen?
  // Bewegen sich die Phänomene?

  
}

function draw() {
  background(1);
  let startColor = color(20, 0, 30)
	let endColor = color(1)
	for (let x=0; x< width; x=x+1)
	{
		let b = lerpColor (startColor, endColor, x/width)
		stroke(b)
		line(x,0,x,height)
		}
  for (let phenomenon of phenomena) {
    phenomenon.show()

  }
}





