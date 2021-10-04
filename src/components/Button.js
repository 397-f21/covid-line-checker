import React, { useState } from "react";
import { setData } from "../utilities/firebase.js"


const checkIn = async (numPeople) => {
  try {
    await setData("/numPeople", numPeople + 1);
    console.log("Checked in");
  }
  catch (error) {
    alert(error);
  }
}

const checkOut = async (numPeople) => {
  try {
    await setData("/numPeople", numPeople - 1);
    console.log("Checked out");
  }
  catch (error) {
    alert(error);
  }
}

const Button = ({ checkedIn, setCheckedIn, numPeople }) => {

  return (
    checkedIn ?
      <button className="btn btn-checked-in" onClick={() => {
        setCheckedIn(false);
        checkOut(numPeople);
      }
      }>Check Out</button>
      :
      <button className="btn btn-checked-out" onClick={() => {
        setCheckedIn(true);
        checkIn(numPeople);
      }
      }>Check In</button>

  )
}

export default Button;