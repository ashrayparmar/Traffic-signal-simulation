var config = {
  minGreenDurationInMilliSeconds: 10000,
  numberOfCarsPassThroughIntersectionPerSecond: 1,
  maxWaitForGreenInMilliSeconds: 30000,
  carsForGreen: 3,
  streetNames: ['A', 'B', 'C'],
};

var state = {
  currentStreetIndex: 0,
  greenStartTime: null,
  greenDuration: null,
  carQueues: config.streetNames.map(() => []),
};

function addCar(streetIndex) {
  state.carQueues[streetIndex].push(Date.now());
  decideGreenStreet();
}

function decideGreenStreet() {
  const now = Date.now();
  const currentStreet = config.streetNames[state.currentStreetIndex];
  const currentQueue = state.carQueues[state.currentStreetIndex];
  const nextStreetIndex = (state.currentStreetIndex + 1) % config.streetNames.length;
  const nextStreet = config.streetNames[nextStreetIndex];
  const nextQueue = state.carQueues[nextStreetIndex];

  if (!state.greenStartTime) {
    // No green phase in progress, check if we should start a new one
    if (currentQueue.length >= config.carsForGreen || now - currentQueue[0] >= config.maxWaitForGreenInMilliSeconds) {
      state.greenStartTime = now;
      state.greenDuration = config.minGreenDurationInMilliSeconds;
      console.log(`Green light for ${currentStreet}`);
    }
  } else {
    // Green phase in progress, check if we should continue or switch to the next street
    const elapsedTime = now - state.greenStartTime;
    if (elapsedTime >= state.greenDuration || currentQueue.length === 0) {
      // Green phase has expired or no more cars in the current queue
      state.currentStreetIndex = nextStreetIndex;
      state.greenStartTime = now;
      state.greenDuration = config.minGreenDurationInMilliSeconds;
      console.log(`Switching to green light for ${nextStreet}`);
    } else {
      // Continue with the current green phase
      const remainingCars = Math.ceil((state.greenDuration - elapsedTime) / 1000) * config.numberOfCarsPassThroughIntersectionPerSecond;
      const carsToPass = Math.min(remainingCars, currentQueue.length);
      const carsPassed = currentQueue.splice(0, carsToPass);
      console.log(`Cars passed through ${currentStreet}:`, carsPassed);
    }
  }
}

// Example usage:
addCar(0); // Queue a car on street A
setTimeout(() => addCar(1), 5000); // Queue a car on street B after 5 seconds
setTimeout(() => addCar(2), 10000); // Queue a car on street C after 10 seconds
