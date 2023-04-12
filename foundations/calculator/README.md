View project here: <https://mikeycos.github.io/theOdinProject/foundations/calculator/index.html>
---
Bugs:  
1. ~~If display is 0, and user presses '0', leading zeroes will be added to display.~~  
2. String length does NOT work for integers with a decimal.  
3. ~~'2 + 𝑥²' should return 4.~~  
4. ~~'⁺/₋' does NOT make numbers and a positive/negative integer.~~  
---
12 APR 2023: Added data attributes to each button, updated a few if...else statements to ternary operators, and added styling attributes to header and footer.  

11 APR 2023: Function findButton created to find button corresponding to what key has been pressed. The function has been repeatedly called in different cases. When key is pressed, active class is added to that key's class.  

10 APR 2023: Redesigned calculator asthetic, resolved 𝑥² functionality, added a '⁺/₋' button to make integers negative or positive, and set a character limit for the display.  
  
08 APR 2023: Implemented button functionality whilst mirroring some case for keydown keys, and added blur method to remove button focus after click. 𝑥² Button is implemented within verifyKey function so an operator (+,/,-,*) can be called before squaring (ie. 1 + 𝑥²). When user presses '1', then '+', then '2', then '𝑥²', 4 is displayed, and if user presses '=', 5 is returned.
  
07 APR 2023: '1 + 2 =' returns 3, pressing 'Enter/=' again returns 5 (ie. 3 + 2). If user presses '+' then 'Enter/=' returns 10 (ie. 5 + 5), and if '+' then 'Enter/=' keys are pressed again, then 20 is returned (ie. 10 + 10). Now, if user presses only '=' then 30 is returned (ie. 20 + 10). Implemented subtraction/multiplication/division operations, delete key will revert all variables to initial values, testing backspace implementation, and repeating an operation after entering a number will perform the pressed operator. '2 + 3' then pressing '+' returns 5, and pressing '7' then '+' will return 12 (ie. 5 + 7 = 12).
  
06 APR 2023: Restarted project.
  
04 APR 2023: Able to store 2 numbers at a time, pressing '=' or 'Enter' after addition will continue to add the current sum by the original value added, and the sum replaces the first initial value.
  
03 APR 2023: Initialized basic HTML, CSS, JS files.  