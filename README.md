# Traffic-signal-simulation
Writing a code to design trafic signa simulation, which follows the given rules

#Comparision with gpt's solution

1. The state object is defined separately in the original code, whereas in initial implementation, the state variables were included within the decideGreenStreet function.

2. The original code uses the Date.now() function directly inside the addCar function to push the current timestamp to the car queue, while in initial implementation passed the timestamp as a parameter to the addCar function.

3. In initial implementation, the logic for calculating the number of cars to pass through the intersection was based on the remaining time in the green phase and the configured number of cars passing per second (config.numberOfCarsPassThroughIntersectionPerSecond). However, the original code directly uses the config.numberOfCarsPassThroughIntersectionPerSecond value without considering the remaining time.


