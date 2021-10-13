import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Button from "./components/Button";
import Content from './components/Content';
import './App.css'
import { useData, setData } from './utilities/firebase.js';


const App = () => {
  //const [symptom, setSymptom] = useState(false);
  const [data, loadingData, errorData] = useData('/');
  //const [checkedIn, setCheckedIn] = useState(false);
  
  const [status, setStatus] = useState("checkIn");
  //checkIn - show check in screen
  //symptom - show symptom tracker screen
  //fail - show failure screen
  //checkOut - show checkout screen
  
  const [numPeople, loading, error] = useData('/numPeople');

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;

  const userId = localStorage.getItem("userId");
  if (userId != null && data[userId]["checkOut"] == null && status != "checkOut") {
    setStatus("checkOut");
  }

  return (
    <div className={status}>
      <Banner />
      <Content status={status}/>
      <Button status={status} setStatus={setStatus} numPeople={numPeople} />
    </div>
  );
}

export default App;