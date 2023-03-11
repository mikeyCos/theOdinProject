const leapYears = function(year) {
    if (year % 4 == 0) {
        debugger
        if (year % 100 == 0 && year % 400 != 0) {    
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};


leapYears(1992);    

// Do not edit below this line
module.exports = leapYears;
