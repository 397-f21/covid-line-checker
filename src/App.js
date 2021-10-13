import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Button from "./components/Button";
import Content from './components/Content';
import './App.css'
import { useData, setData } from './utilities/firebase.js';

const App = () => {
  //localStorage.clear();
  const [data, loadingData, errorData] = useData('/');
  const [checkedIn, setCheckedIn] = useState(false);
  const [numPeople, loading, error] = useData('/numPeople');

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;

  const userId = localStorage.getItem("userId");
  console.log(userId)
  let alreadyCheckIn = false
  if (userId != null && data[userId]["checkOut"] == null) {
    alreadyCheckIn = true
  }

  return (
    <div className={alreadyCheckIn ? 'checkedIn' : 'checkedOut'}>
      <Banner />
      <Content checkedIn={alreadyCheckIn} numPeople={numPeople} />
      <Button checkedIn={alreadyCheckIn} setCheckedIn={setCheckedIn} numPeople={numPeople} />
    </div>
  );
}

export default App;