const output = document.querySelector('#output');
const inputDate = document.querySelector("#date");
const button = document.querySelector("#btn");
const loader = document.querySelector(".loader");
let message = "";

function reverseStr(str) {
    // str = abc
    let strArray = str.split(""); // ['a','b','c']
    let reverseArray = strArray.reverse(); // ['c','b','a']
    let reverseString = reverseArray.join(""); // 'cba'
    return reverseString;
}

function isPalindrome(str) {
    let reverseString = reverseStr(str);
    if (reverseString === str) {
        return true;
    }
    return false;
}


function numberToStr(dateObj) {
    let day = dateObj.day;
    let month = dateObj.month;
    let year = dateObj.year;

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return {
        day: day.toString(),
        month: month.toString(),
        year: year.toString()
    }
}


function allFormateOfDate(dateObj) {
    let dateObjStr = numberToStr(dateObj);

    let day = dateObjStr.day;
    let month = dateObjStr.month;
    let year = dateObjStr.year;
    let ddmmyyyy = day + month + year;
    let mmddyyyy = month + day + year;
    let yyyymmdd = year + month + day;
    let ddmmyy = day + month + year.slice(2, 4);
    let mmddyy = month + day + year.slice(2, 4);
    let yymmdd = year.slice(2, 4) + month + day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindromeForAllFormat(dateObj) {
    var allDateFormat = allFormateOfDate(dateObj);
    let flag = false;
    for (let i = 0; i < allDateFormat.length; i++) {
        if (isPalindrome(allDateFormat[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    }
    return false;
}

function nextDate(date) {
    let noOfDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = date.day;
    let month = date.month;
    let year = date.year;
    day = day + 1;

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
                
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
                
            }
        }
    } else {
        
        if (day > noOfDayInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}
function getNextPalindromeDate(dateObj) {
    if (checkPalindromeForAllFormat(dateObj)) {
        message = "Your birthdate is palindrome!!"
    } else {
        let futureDate = nextDate(dateObj);
        let count = 0;
        while (1) {
            count = count + 1;
            if (checkPalindromeForAllFormat(futureDate)) {
                break;
            }
            futureDate = nextDate(futureDate);
        }
  
        message = `You have missed ${count} ${count === 1 ? "day" : "days"} next palindrome date from your birthdate is day : ${futureDate.day}, month : ${futureDate.month}, year : ${futureDate.year}\n`;
    }
}


function decreaseDate(date) {
    let noOfDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = date.day;
    let month = date.month;
    let year = date.year;
    day = day - 1;
    if (day === 0) {
        if (month == 3) {
            if (isLeapYear(year)) {
                day = 29;
                month = 2;
            } else {
                day = 28;
                month = 2;
            }
        } else {
            day = noOfDayInMonth[month - 1];
            month = month - 1;
        }
    }
    if (month < 1) {
        year = year - 1;
        month = 12;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}
function getPastPalindromeDate(dateObj) {
    if (checkPalindromeForAllFormat(dateObj)) {
        message = "Your birthdate is palindrome!!"
    } else {
        let pastDate = decreaseDate(dateObj);
        let count = 0;
        while (1) {
            count = count + 1;
            if (checkPalindromeForAllFormat(pastDate)) {
                break;
            }
            pastDate = decreaseDate(pastDate);
        }
        console.log(pastDate);
        message = message + `\nYou have missed ${count} ${count === 1 ? "day" : "days"} in past palindrome date from your birthdate is day : ${pastDate.day}, month : ${pastDate.month}, year : ${pastDate.year}\n`;
    }
}

button.addEventListener('click', () => {

    let dateArray = inputDate.value.split('-');
    let date = {
        day: Number(dateArray[2]),
        month: Number(dateArray[1]),
        year: Number(dateArray[0])
    }
    output.innerText = "";
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";
        getNextPalindromeDate(date);
        getPastPalindromeDate(date);
        output.innerText = message;
    }, 3000)
})  