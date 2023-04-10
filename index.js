const dvdLogo = document.getElementById("dvd-logo");

/**
 * Basic Colors
 *
 * @link https://www.w3.org/wiki/CSS/Properties/color/keywords#Basic_Colors
 */
const colors = [
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
];

// Put an irrational number in the start position so that we never loop
let position = { x: 0, y: Math.PI };
let velocity = { x: 5, y: 5 };
let color = colors[Math.floor(Math.random() * colors.length)];

const newRandomColor = () => {
  const otherColors = colors.filter((c) => c !== color);
  color = otherColors[Math.floor(Math.random() * otherColors.length)];
};

const updateX = () => {
  // We apply the x velocity one pixel at a time
  // This lets us detect collisions with pixel precision
  let xSpeed = Math.abs(velocity.x);
  let xDir = velocity.x / xSpeed; // +1 | -1
  let xPosition = position.x;
  while (xSpeed > 0) {
    xSpeed--;
    if (
      // Right wall collision
      (xDir > 0 &&
        xPosition + xDir >
          window.innerWidth - dvdLogo.getBoundingClientRect().width) ||
      // Left wall collision
      (xDir < 0 && xPosition + xDir < 0)
    ) {
      // Bounce off a wall
      xDir *= -1;
      velocity.x *= -1;
      newRandomColor();
    }
    xPosition += xDir;
  }
  // Actually write the new position
  position.x = xPosition;
};

const updateY = () => {
  // We apply the y velocity one pixel at a time
  // This lets us detect collisions with pixel precision
  let ySpeed = Math.abs(velocity.y);
  let yDir = velocity.y / ySpeed; // +1 | -1
  let yPosition = position.y;
  while (ySpeed > 0) {
    ySpeed--;
    if (
      // Bottom wall collision
      (yDir > 0 &&
        yPosition + yDir >
          window.innerHeight - dvdLogo.getBoundingClientRect().height) ||
      // Top wall collision
      (yDir < 0 && yPosition + yDir < 0)
    ) {
      // Bounce off a wall
      yDir *= -1;
      velocity.y *= -1;
      newRandomColor();
    }
    yPosition += yDir;
  }
  // Actually write the new position
  position.y = yPosition;
};

const updateState = () => {
  updateX();
  updateY();
};

const tick = () => {
  updateState();
  dvdLogo.style.left = `${position.x}px`;
  dvdLogo.style.top = `${position.y}px`;
  dvdLogo.style.color = color;
};

setInterval(() => {
  tick();
}, 1000 / 60);
