let CIRCLES = []
let CELL = []

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('simple-agario');
  let ctx = canvas.getContext('2d');
  let bounds = canvas.width;

  createCircleProps(bounds, 10, 50, CIRCLES);
  createCircle(ctx, CIRCLES);

  createCircleProps(bounds, 30, 1, CELL);
  createCircle(ctx, CELL);
  let cell = CELL[0];

  document.addEventListener('mousemove', (e) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    updateCell(ctx, cell, mouseX, mouseY)
  })
})



const createCircleProps = (bounds, radius, numCircles, arr) => {
  for (let i = 0; i < numCircles; i++) {
    let xPos = Math.floor(Math.random() * bounds)
    let yPos = Math.floor(Math.random() * bounds)

    color = getRandomColor();

    let circle = {
      x: xPos,
      y: yPos,
      r: radius,
      color: color
    }

    //circle = checkDistance(circle, bounds);

    arr.push(circle);
  }
}

// const checkDistance = (circle, bounds) => {
//   for (const existingCircle of CIRCLES) {
//     let distance = Math.ceil(Math.sqrt((circle.x - existingCircle.x) ** 2 + (circle.y - existingCircle.y) **2))
//     while (distance < 20) {
//       circle.x = Math.floor(Math.random() * bounds)
//       circle.y = Math.floor(Math.random() * bounds)
//       distance = Math.ceil(Math.sqrt((circle.x - existingCircle.x) ** 2 + (circle.y - existingCircle.y) **2));
//     }
//   }
//   return circle
// }

const createCircle = (ctx, circlesArr) => {
  for (const circle of circlesArr) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, circle.color);
    ctx.fillStyle = circle.color;
    ctx.fill();
  }
}

const updateCell = (ctx, cell, mouseX, mouseY) => {
   
  let x = cell.x - cell.r;
  let y = cell.y - cell.r;
  let wh = cell.r * 2;
  setInterval(ctx.clearRect(x, y, wh, wh), 40000)


  cell.x = mouseX
  cell.y = mouseY
  setInterval(createCircle(ctx, CELL), 40000)

  requestAnimationFrame(updateCell)
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}