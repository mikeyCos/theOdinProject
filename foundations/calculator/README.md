Live preview: <https://mikeycos.github.io/theOdinProject/foundations/calculator/index.html>

---
> I went beyond the scope of objectives listed on The Odin Project and attempted to replicate Microsoft Windows 10's calculator.
---
## What can you do:
1. Pressing `2+=` will display **4**, pressing `+=` again will display **8**, so on and so forth[^1].  
2. Pressing `2+2=` will display **4**, pressing `=` again will display **6**, so on and so forth[^2].  
3. Pressing `5+3𝑥²` will display **9**, pressing `𝑥²` again will display **81**, pressing `=` will display **86**, and pressing `=` again will display **167**[^3].  
4. Pressing `9+4=` will display **13**, pressing `7=` will display **11**, pressing `=` will display **15**[^4].  
5. Pressing `2+⁺∕₋`  will display **-2**, pressing `=` will display **0**, pressing `=` again will display **-2**[^5].  

[^1]: `2+` --> **num1:** `2`, **num2:** `0` --> `=` --> **num1:** `4`, **num2:** `2` --> `+` --> **num1:** `4`, **num2:** `2` --> `=` --> **num1:** `8`, **num2:** `4`.  
[^2]: `2+2` --> **num1:** `2`, **num2:** `2` --> `=` --> **num1:** `4`, **num2:** `2` --> `=` --> **num1:** `8`, **num2:** `2`.  
[^3]: `5+3` --> **num1:** `5`, **num2:** `3`, **operator:** `+` --> `𝑥²` --> **num1:** `5`, **num2:** `9`, **operator:** `+` --> `𝑥²` --> **num1:** `5`, **num2:** `81`, **operator:** `+` --> `=` --> **num1:** `86`, **num2:** `81`, **operator:** `+` --> `=` --> **num1:** `167`, **num2:** `81`, **operator:** `+`.  
[^4]: `9+4` --> **num1:** `9`, **num2:** `4`, **operator:** `+` --> `=` --> **num1:** `13`, **num2:** `4` --> `7` --> **num1:** `7`, **num4:** `4` , **operator:** `+` --> `=` --> **num1:** `11`, **num2:** `4`, **operator:** `+` --> `=` --> **num1:** `15`, **num2:** `4`, **operator:** `+`.  
[^5]: `2` --> **num1:** `2`, **num2:** `0`, **number:** `2` --> `+` --> **num1:** `2`, **num2:** `0`, **number:** `''` --> `⁺∕₋` --> **num1:** `2`, **num2:** `-2`, **number:** `-2` --> `=` --> **num1:** `0`, **num2:** `-2`, **number:** `''` --> `=` --> **num1:** `-2`, **num2:** `-2`, **number:** `''`.
---
## Bugs:  
1. [:heavy_check_mark:] If display is 0, and user presses `0`, leading zeroes will be added to display.  
2. :heavy_check_mark: String length does NOT work for integers with a decimal.  
3. :heavy_check_mark: `2 + 𝑥²` should return 4.  
4. :heavy_check_mark: `⁺/₋` does NOT make numbers and a positive/negative integer.  
5. :heavy_check_mark: `7 + 3 =` returns 10, if user presses '2' and then 'enter/=' 2 is returned. Instead, 5 should have been returned.  
6. :heavy_check_mark: User cannot enter zeroes after decimal.  
7. :heavy_check_mark: User cannot put '-' for '0.' and pressing `.`, then `⁺∕₋` will display '0'. If any number is pressed, it will be added to the decimal.  
8. :heavy_check_mark: If user presses `2 + ⁺∕₋` does NOT return -2. If user presses `=` returns 0, pressing `=` again will return -2.  
9. :heavy_check_mark: If user presses `. 0 ⁺∕₋ =` does NOT return 0.  
10. :x: If user presses `1234` is displayed as 1,234, if user presses `.`, 1234. is displayed. Now, if user press `1` (or any number greater than 0), 1,234.1 is displayed, and if user presses `0`, 1234.10 is displayed.  
---
14 APR 2023: Fixed the ability to negate after pressing an arthimetic symbol. For example, '2 + ⁺∕₋' will display '-2', pressing '=' will return '0', and pressing '=' again will return '-2'.  

13 APR 2023: Zeroes can be inputted and recorded after entering a decimal point, and added conditional statements in updateDisplay function. Removed the ability to put '-' infront of zero, changed :active's attribute border to outline,   

12 APR 2023: Added data attributes to each button, updated a few if...else statements to ternary operators, and added styling attributes to header and footer. User is now able to keep adding with previous addend/subtrahend/etc after entering a new starting number or they can add different numbers. For example: '9 + 5 =' returns 14, user presses '7' then 'enter/=' returns 12. Otherwise, '9 + 5 =' returns 14, user presses '7', then '+', then presses '20' and finally 'enter/=' will return 27. Numbers exceeding a string length of 14 will be displayed in exponential form.  

11 APR 2023: Function findButton created to find button corresponding to what key has been pressed. The function has been repeatedly called in different cases. When key is pressed, active class is added to that key's class.  

10 APR 2023: Redesigned calculator asthetic, resolved 𝑥² functionality, added a '⁺/₋' button to make integers negative or positive, and set a character limit for the display.  
  
08 APR 2023: Implemented button functionality whilst mirroring some case for keydown keys, and added blur method to remove button focus after click. 𝑥² Button is implemented within verifyKey function so an operator (+,/,-,*) can be called before squaring (ie. 1 + 𝑥²). When user presses '1', then '+', then '2', then '𝑥²', 4 is displayed, and if user presses '=', 5 is returned.
  
07 APR 2023: '1 + 2 =' returns 3, pressing 'Enter/=' again returns 5 (ie. 3 + 2). If user presses '+' then 'Enter/=' returns 10 (ie. 5 + 5), and if '+' then 'Enter/=' keys are pressed again, then 20 is returned (ie. 10 + 10). Now, if user presses only '=' then 30 is returned (ie. 20 + 10). Implemented subtraction/multiplication/division operations, delete key will revert all variables to initial values, testing backspace implementation, and repeating an operation after entering a number will perform the pressed operator. '2 + 3' then pressing '+' returns 5, and pressing '7' then '+' will return 12 (ie. 5 + 7 = 12).
  
06 APR 2023: Restarted project.
  
04 APR 2023: Able to store 2 numbers at a time, pressing '=' or 'Enter' after addition will continue to add the current sum by the original value added, and the sum replaces the first initial value.
  
03 APR 2023: Initialized basic HTML, CSS, JS files.  