Student Information

Name: Syed Haider Ali Shah
Student ID: 924729660

Project Links

GitHub Repository:
https://github.com/haider2shah/CSC317/tree/main

Live GitHub Pages URLs:

Portfolio: https://haider2shah.github.io/CSC317/assignments/4/index.html
Calculator: https://haider2shah.github.io/CSC317/assignments/4/calculator.html

Implementation Description.

For this calculator, my approach was to structure the logic around clear state management and predictable updates. I separated the calculator into three main parts: handling user input, updating the display, and performing calculations. I used firstNumber, secondNumber, and operator as the core state variables so every button press could be interpreted consistently. Each action digits, operators, equals, percent, sign toggle, and decimals has its own dedicated function to keep the logic organized and readable. I also added rounding to avoid floating-point issues and included checks for division by zero to prevent crashes. I built the interface so the display reflects the state in real time, and I extended functionality with keyboard support. My mindset was to make the code modular, easy to debug, and similar to how real calculators process input step-by-step.