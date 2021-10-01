import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { useData } from './utilities/firebase.js';
import Button from "./components/Button";
import Banner from "./components/Banner";




const Content = ({ checkedIn, numPeople }) => {
  // for purposes of demo:
  // Low: 1 
  // medium: 2
  // high: 3

  // actual expected values:
  // low: <15
  // medium: 15-40
  // high: >40
  return (
    checkedIn ? 
      <div>
        <p>Jacobs Center Rapid Test - Covid-19</p>
        <p>You're checked in! Don't forgot to check out!</p>
      </div> :
      <div>
        <p>Jacobs Center Rapid Test - Covid-19</p>
        <p>Low</p>
        <p>Traffic</p>
        <p>Approx. People in Line: {numPeople}</p>
      </div>
  )
}

function App() {
  const [checkedIn, setCheckedIn] = useState(false);

  const [numPeople, loading, error] = useData('/numPeople'); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>

  return (
    <div>
      <Banner />
      <Content checkedIn={checkedIn} numPeople={numPeople}/>
      <Button checkedIn={checkedIn} setCheckedIn={setCheckedIn} numPeople={numPeople}/>
    </div>
  );
}

export default App;
