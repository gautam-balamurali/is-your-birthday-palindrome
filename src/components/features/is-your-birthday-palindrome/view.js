/* eslint-disable */

import React from "react";
import * as AppConstants from "../../../config/app-config";
import { useState } from "react";
import {
  checkPalindromeForAllDateFormats,
  convertToNumber,
  getDateAsString,
  getNextPalindromeDate,
  getPreviousPalindromeDate,
} from "../../../utils/app-utils";
import user_avatar_gift from "../../../images/user_avatar_gift.svg";

function IsYouBirthdayPalindrome() {
  const [dobInput, setDOBInput] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  //   <-- Validity Functions Begins -->

  /**
   * Function to check validity of check button
   * @returns boolean
   */
  function isShowButtonInvalid() {
    return dobInput.length < 1;
  }

  //   <-- Validity Functions Ends -->

  //   <-- Change Handler Functions Begins -->

  /**
   * Function to handle date of birth input change
   * @param event
   */
  function DOBInputChangeHandler(event) {
    let inputDOB = event.target.value;
    setOutputMessage("");
    setDOBInput(inputDOB);
  }

  //   <-- Change Handler Functions Ends -->

  //   <-- Click Handler Functions Begins -->

  /**
   * Function to handle when show button is clicked
   * @param dateOfBirthInput
   */
  function showButtonClickHandler(dateOfBirthInput) {
    const dateOfBirthInputSplitArray = dateOfBirthInput.split("-");

    const dateObj = {
      day: convertToNumber(dateOfBirthInputSplitArray[2]),
      month: convertToNumber(dateOfBirthInputSplitArray[1]),
      year: convertToNumber(dateOfBirthInputSplitArray[0]),
    };

    checkDateIsPalindrome(dateObj);
  }

  /**
   * Function to check if date is palindrome
   * @param dateObj
   */
  function checkDateIsPalindrome(dateObj) {
    const dateString = getDateAsString(dateObj);
    const palindromeDateFormatsList =
      checkPalindromeForAllDateFormats(dateString);

    let isPalindrome = false;

    for (let i = 0; i < palindromeDateFormatsList.length; i++) {
      if (palindromeDateFormatsList[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      dateIsNotPalindromeHandle(dateObj);
    } else {
      setOutputMessage(AppConstants.DEFAULT_CONSTANTS.PALINDROME_MESSAGE);
    }
  }

  /**
   * Function to handle if date is not palindrome
   * @param dateObj
   */
  function dateIsNotPalindromeHandle(dateObj) {
    const [nextCount, nextDate] = getNextPalindromeDate(dateObj);
    const [prevCount, prevDate] = getPreviousPalindromeDate(dateObj);

    if (nextCount > prevCount) {
      updateOutputMessage(prevCount, prevDate);
    } else {
      updateOutputMessage(nextCount, nextDate);
    }
  }

  /**
   * Function to update output message
   * @param numberOfDays
   * @param dateObj
   */
  function updateOutputMessage(numberOfDays, dateObj) {
    setOutputMessage(
      `THE NEAREST PALINDROME DATE IS ${dateObj.day}-${dateObj.month}-${
        dateObj.year
      }, YOU MISSED BY ${numberOfDays} ${numberOfDays > 1 ? "DAYS" : "DAY"}.`
    );
  }

  //   <-- Click Handler Functions Ends -->

  //   <-- Render Functions Begins -->

  /**
   * Function to render user avatar
   * @returns user avatar image
   */
  function renderUserAvatar() {
    return (
      <div className="container user-avatar">
        <img src={user_avatar_gift} alt="User Avatar" />
      </div>
    );
  }

  /**
   * Function to render app description
   * @returns app description
   */
  function renderAppDescriptionSection() {
    return (
      <div className="sub-section">
        <h3>{AppConstants.DEFAULT_CONSTANTS.APP_DESCRIPTION}</h3>
        <h4>{AppConstants.DEFAULT_CONSTANTS.PRIVACY_NOTICE}</h4>
      </div>
    );
  }

  /**
   * Function to render date of birth input section
   * @returns date of birth input section
   */
  function renderDateOFBirthInputSection() {
    return (
      <div className="sub-section">
        <label htmlFor="dob-bill" className="dob-label">
          DATE OF BIRTH:
        </label>
        <input
          id="dob-bill"
          value={dobInput}
          onChange={DOBInputChangeHandler}
          type={"date"}
        ></input>
      </div>
    );
  }

  /**
   * Function to render show button
   * @returns show button
   */
  function renderShowButton() {
    return (
      <button
        className={`${isShowButtonInvalid() ? "btn-disabled" : "btn-enabled"}`}
        disabled={isShowButtonInvalid()}
        onClick={() => showButtonClickHandler(dobInput)}
      >
        SHOW
      </button>
    );
  }

  /**
   * Function to render output message
   * @returns output message
   */
  function renderOutput() {
    return (
      <p
        className={`${
          outputMessage == AppConstants.DEFAULT_CONSTANTS.PALINDROME_MESSAGE
            ? "output-msg"
            : "error-msg"
        }`}
      >
        {outputMessage}
      </p>
    );
  }
  //   <-- Rendering Is Your Birthday Palindrome App -->
  return (
    <section id="app-view" className="section">
      {renderUserAvatar()}
      {renderAppDescriptionSection()}
      {renderDateOFBirthInputSection()}
      {renderShowButton()}
      {renderOutput()}
    </section>
  );
}

export default IsYouBirthdayPalindrome;
