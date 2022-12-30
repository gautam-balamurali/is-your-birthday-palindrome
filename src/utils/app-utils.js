/* eslint-disable */

import * as AppConstants from "../config/app-config";

/**
 * Function to convert any input to number
 * @param input
 * @returns number
 */
export function convertToNumber(input) {
  return Number(input);
}

/**
 * Function to reverse string
 * @param stringInput
 * @returns reversed string
 */
function reverseString(stringInput) {
  const listOfChars = stringInput.split("");
  const reversedListOfChar = listOfChars.reverse();
  const reversedString = reversedListOfChar.join("");
  return reversedString;
}

/**
 * Function to check if string is palindrome
 * @param stringInput
 * @returns boolean
 */
function isStringPalindrome(stringInput) {
  const reversedString = reverseString(stringInput);
  return stringInput === reversedString;
}

/**
 * Function to date in string format
 * @param dateInput
 * @returns date in string format
 */
export function getDateAsString(dateInput) {
  let dateInString = { day: "", month: "", year: "" };

  if (dateInput.day < 10) {
    dateInString.day = "0" + dateInput.day;
  } else {
    dateInString.day = dateInput.day.toString();
  }

  if (dateInput.month < 10) {
    dateInString.month = "0" + dateInput.month;
  } else {
    dateInString.month = dateInput.month.toString();
  }

  dateInString.year = dateInput.year.toString();
  return dateInString;
}

/**
 * Function to get date in all formats
 * @param dateInput
 * @returns date in all formats
 */
function getDateInAllFormats(dateInput) {
  const ddmmyyyy = dateInput.day + dateInput.month + dateInput.year;
  const mmddyyyy = dateInput.month + dateInput.day + dateInput.year;
  const yyyymmdd = dateInput.year + dateInput.month + dateInput.day;
  const ddmmyy = dateInput.day + dateInput.month + dateInput.year.slice(-2);
  const mmddyy = dateInput.month + dateInput.day + dateInput.year.slice(-2);
  const yyddmm = dateInput.year.slice(-2) + dateInput.day + dateInput.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

/**
 * Function to check palindrome date in all formats
 * @param dateInput
 * @returns palindrome dates list in all formats
 */
export function checkPalindromeForAllDateFormats(dateInput) {
  const dateFormatList = getDateInAllFormats(dateInput);
  const palindromeList = [];

  dateFormatList.forEach((dateFormat) => {
    palindromeList.push(isStringPalindrome(dateFormat));
  });
  return palindromeList;
}

/**
 * Function to check for a leap year
 * @param year
 * @returns boolean
 */
function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

/**
 * Function to get next date
 * @param dateInput
 * @returns next date
 */
function getNextDate(dateInput) {
  let day = dateInput.day + 1;
  let month = dateInput.month;
  let year = dateInput.year;

  const daysInMonth = AppConstants.DAYS_IN_MONTH;

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

/**
 * Function to get next palindrome date and no. of days
 * @param dateInput
 * @returns next palindrome date and no. of days
 */
export function getNextPalindromeDate(dateInput) {
  let nextDate = getNextDate(dateInput);
  let count = 0;

  while (1) {
    count++;
    let dateString = getDateAsString(nextDate);
    let resultList = checkPalindromeForAllDateFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [count, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

/**
 * Function to get previous date
 * @param dateInput
 * @returns previous date
 */
function getPreviousDate(dateInput) {
  let day = dateInput.day - 1;
  let month = dateInput.month;
  let year = dateInput.year;

  const daysInMonth = AppConstants.DAYS_IN_MONTH;

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

/**
 * Function to get previous palindrome date and no. of days
 * @param dateInput
 * @returns previous palindrome date and no. of days
 */
export function getPreviousPalindromeDate(dateInput) {
  let previousDate = getPreviousDate(dateInput);
  let count = 0;

  while (1) {
    count++;
    let dateString = getDateAsString(previousDate);
    let resultList = checkPalindromeForAllDateFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [count, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}
