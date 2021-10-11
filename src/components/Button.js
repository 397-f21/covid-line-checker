import React, { useState } from "react";
import { setData, useData } from "../utilities/firebase.js"


const checkIn = async (numPeople) => {
  try {
    numPeople += 1;
    await setData("/numPeople", numPeople);
    localStorage.setItem("userId", numPeople);
    console.log("Checked in: ", Date.now());
    await setData(`/${numPeople}/checkIn`, Date.now());
  }
  catch (error) {
    alert(error);
  }
}

const checkOut = async (numPeople, update, setUpdate) => {
  try {
    await setData(`/${numPeople}/checkOut`, Date.now());
    console.log("Checked out: ", Date.now());
    setUpdate(update+1);
    
  }
  catch (error) {
    alert(error);
  }
}


const Button = ({ checkedIn, setCheckedIn, numPeople, setUpdate, update }) => {

  return (
    checkedIn ?
      <button className="btn btn-checked-in" onClick={() => {
        setCheckedIn(false);
        checkOut(numPeople, update, setUpdate);
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