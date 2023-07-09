var config = {
  minGreenDurationInMilliSeconds: 10000,
  numberOfCarsPassThroughIntersectionPerSecond: 1,
  maxWaitForGreenInMilliSeconds: 30000,
  carsForGreen: 3,
  streetNames: ['A', 'B', 'C'],
};

var carsWaitingInEachStreet = [0, 0, 0];
var currentGreenIndex = -1;
var greenSignalStartTime = null;

function switchGreen() {
  // Check if the green signal has reached the duration
  if (greenSignalStartTime !== null && Date.now() - greenSignalStartTime < config.minGreenDurationInMilliSeconds) {
    return; // Not yet time to switch green
  }

  var nextGreenIndex = -1;

  // Check if all cars have passed through green
  var allCarsPassed = carsWaitingInEachStreet.every(count => count <= 0);
  if (allCarsPassed) {
    // Find the street that has waited the longest and has cars queued
    var longestWaitTime = 0;
    for (var i = 0; i < carsWaitingInEachStreet.length; i++) {
      if (carsWaitingInEachStreet[i] > longestWaitTime) {
        longestWaitTime = carsWaitingInEachStreet[i];
        nextGreenIndex = i;
      }
    }
  } else {
    // Find the first street that meets the conditions
    for (var i = 0; i < carsWaitingInEachStreet.length; i++) {
      if (
        carsWaitingInEachStreet[i] >= config.carsForGreen ||
        (carsWaitingInEachStreet[i] > 0 && Date.now() - greenSignalStartTime >= config.maxWaitForGreenInMilliSeconds)
      ) {
        nextGreenIndex = i;
        break;
      }
    }
  }

  // Switch green to the next street
  if (nextGreenIndex !== -1) {
    currentGreenIndex = nextGreenIndex;
    greenSignalStartTime = Date.now();
    carsWaitingInEachStreet[currentGreenIndex] = 0; // Reset the count of cars waiting in the current green street
    console.log('Switching green to street ' + config.streetNames[currentGreenIndex]);
  }
}

function addCar(streetIndex) {
  carsWaitingInEachStreet[streetIndex]++;
  console.log('Added new car to street ' + config.streetNames[streetIndex]);
}

addCar(1);
addCar(1);
addCar(0);
addCar(0);
addCar(0);
addCar(0);
addCar(2);
addCar(2);

setInterval(switchGreen, 1000);
