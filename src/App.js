import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";


const Banner = () => {
  return (
    <p>NU Covid Test Line Checker</p>
  )
};

const Content = () => {
  return (
    <div>
      <p>Jacobs Center Rapid Test - Covid-19</p>
      <p>Low</p>
      <p>Traffic</p>
      <p>Approx. People in Line: </p>
    </div>
  )
}

const checkIn = () => {
  console.log("Checked in");
  // add to database
  // pull from database to update num of people var
}

const checkOut = () => {
  console.log("Checked out");
  // add to database
  // pull from database to update num of people var
}

const Button = () => {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    checkedIn ?
      <button onClick={() => {
        setCheckedIn(false);
        checkOut(setCheckedIn);
      }
      }>Check Out</button>
      :
      <button onClick={() => {
        setCheckedIn(true);
        checkIn(setCheckedIn);
      }
      }>Check In</button>

  )
}


function App() {

  return (
    <div>
      <Banner />
      <Content />
      <Button />
    </div>
  );
}

export default App;
