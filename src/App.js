import logo from './logo.svg';
import './App.css';
import './components/Button.css';
import React, { useState } from "react";
import { useData } from './utilities/firebase.js';
import Button from "./components/Button";
import Banner from "./components/Banner";
import Content from "./components/Content";


function App() {
  const [checkedIn, setCheckedIn] = useState(false);

  const [numPeople, loading, error] = useData('/numPeople'); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>

  return (
    <div className={checkedIn ? 'checkedIn' : 'checkedOut'}>
      <Banner />
      <Content checkedIn={checkedIn} numPeople={numPeople}/>
      <Button checkedIn={checkedIn} setCheckedIn={setCheckedIn} numPeople={numPeople}/>
    </div>
  );
}

export default App;
