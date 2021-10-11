import logo from './logo.svg';
import './App.css';
import './components/Button.css';
import React, { useState, useEffect } from "react";
import { useData, setData } from './utilities/firebase.js';
import Button from "./components/Button";
import Banner from "./components/Banner";
import Content from "./components/Content";


function App() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [update, setUpdate] = useState(0);
  const [data, loadingData, errorData] = useData('/');
  const [numPeople, loading, error] = useData('/numPeople');

  useEffect(() => {
    if (errorData) return <h1>{errorData}</h1>;
    if (loadingData) return <h1>Loading the data...</h1>;
    const userId = localStorage.getItem("userId");
    console.log(data);
    let checkinTime = data[userId]["checkIn"];
    let checkoutTime = data[userId]["checkOut"];
    console.log("checkoutTime:", checkoutTime);
    let milisec_in_minute = 60000;
    let x = 2 * milisec_in_minute;
    let minTime = checkoutTime - x;
    console.log("minTime", minTime);
    let total = (checkoutTime - checkinTime);
    let count = 1;
    let currId = userId - 1;

    while (checkoutTime > minTime && currId > 0) {
    
      checkinTime = data[currId]["checkIn"];
      checkoutTime = data[currId]["checkOut"];

      total += (checkoutTime - checkinTime);
      count += 1;
      currId -= 1;
    }

    let avgTime = (total / count) / 60000;
    console.log("Average Time:", avgTime);
    setData(`/avgTime`, avgTime);

  }, [update]);

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;


  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>

  return (
    <div className={checkedIn ? 'checkedIn' : 'checkedOut'}>
      <Banner />
      <Content checkedIn={checkedIn} numPeople={numPeople} />
      <Button checkedIn={checkedIn} setCheckedIn={setCheckedIn} numPeople={numPeople} setUpdate={setUpdate} update={update} />
    </div>
  );
}

export default App;
