var config = {
    minGreenDurationInMilliSeconds: 10000,
    numberOfCarsPassThroughIntersectionPerSecond: 1,
    maxWaitForGreenInMilliSeconds: 30000,
    carsForGreen: 3,
    streetNames: ['A', 'B', 'C'],
}

var carsWaitingInEachStreet = [0, 0, 0];
var currentGreenIndex = -1;
var greenSignalStartTime = null;

function switchGreen() {
    // Check if the green singal has reached the duration
    if (greenSignalStartTime !== null && Date.now() - greenSignalStartTime < config.minGreenDurationInMilliSeconds) {
        return; // Not yet time to switch green
    }

    var nextGreenIndex = -1;

    // condition to Check if all cars have passed through green
    var allCarsPassed = carsWaitingInEachStreet.every(count => count === 0);
    if (allCarsPassed) {
        // finding the street that has waited the longest and has cars queued
        var longestWaitTime = 0;
        for (var i = 0; i < carsWaitingInEachStreet.length; i++) {
            if (carsWaitingInEachStreet[i] > 0 && carsWaitingInEachStreet[i] > longestWaitTime) {
                longestWaitTime = carsWaitingInEachStreet[i];
                nextGreenIndex = i;
            }
        }
    } else {
        //finding the first street that meets the conditions
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
        console.log('Switching green to street ' + config.streetNames[currentGreenIndex]);
    }
}

function addCar(streetIndex) {
    carsWaitingInEachStreet[streetIndex]++;
    console.log('Added new car to street ' + config.streetNames[streetIndex]);
}

addCar(1)
console.log(carsWaitingInEachStreet, 'adding car in street A, count - 1')

addCar(1)
console.log(carsWaitingInEachStreet, 'adding car in street A, count - 2')

addCar(0)
console.log(carsWaitingInEachStreet, 'adding car in street B, count - 1')

addCar(0)
console.log(carsWaitingInEachStreet, 'adding car in street B, count - 2')

setInterval(switchGreen, 1000);
