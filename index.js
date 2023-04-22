//#region Constants

/**
 * Basic Colors
 *
 * @link https://www.w3.org/wiki/CSS/Properties/color/keywords#Basic_Colors
 */
const BASIC_COLORS = [
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

const DVD_LOGO_WIDTH = 394; // px
const DVD_LOGO_HEIGHT = 180; // px
/**
 * The speed of the animation as measured in pixels travelled per millisecond
 */
const PIXELS_PER_MILLI = 1 / 7;

//#endregion

//#region Pure Functions

const pickRandomFrom = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getNextState = (previousState, timestamp, screenWidth, screenHeight) => {
  const x_amplitude = (screenWidth - DVD_LOGO_WIDTH) / 2;
  const y_amplitude = (screenHeight - DVD_LOGO_HEIGHT) / 2;
  const x_period = screenWidth / PIXELS_PER_MILLI;
  const y_period = screenHeight / PIXELS_PER_MILLI;

  // https://en.wikipedia.org/wiki/Triangle_wave
  const x =
    ((4 * x_amplitude) / x_period) *
    Math.abs((timestamp % x_period) - x_period / 2);
  const y =
    ((4 * y_amplitude) / y_period) *
    Math.abs((timestamp % y_period) - y_period / 2);
  const xDir = timestamp % x_period > x_period / 2;
  const yDir = timestamp % y_period > y_period / 2;

  return {
    x,
    xDir,
    y,
    yDir,
    color:
      // Detect a bounce, and change color if so
      xDir !== previousState.xDir || yDir !== previousState.yDir
        ? pickRandomFrom(BASIC_COLORS.filter((x) => x !== previousState.color))
        : previousState.color,
  };
};

//#endregion

//#region Imperative Shell

const renderState = ({ x, y, color }) => {
  const dvdLogoElement = document.getElementById("dvd-logo");
  dvdLogoElement.style.left = `${x}px`;
  dvdLogoElement.style.top = `${y}px`;
  dvdLogoElement.style.color = color;
};

const step = (previousState) => (timestamp) => {
  // Compute next state
  const nextState = getNextState(
    previousState,
    timestamp,
    window.innerWidth,
    window.innerHeight
  );
  // Render state
  renderState(nextState);
  // Request next frame
  window.requestAnimationFrame(step(nextState));
};

window.requestAnimationFrame(
  step({ xDir: false, yDir: false, color: pickRandomFrom(BASIC_COLORS) })
);

//#endregion
