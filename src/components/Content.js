import React from 'react';
import './Content.css';
import { useData } from '../utilities/firebase';
import Symptom from './Symptom';

// symptomatic testing is at Northwestern University Health Service (Searle Hall, 633 Emerson)


const getContent = (status, avgTime) => {
  switch (status) {
    case "checkIn":
      
      const hrs = Math.floor(avgTime / 60);
      const mins = Math.floor(avgTime % 60);
      
      return (
        <div className='checkin_content'>
        <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
        <div className='traffic'>
          {avgTime < 15
            ? <p className='low'>Low</p>
            : avgTime < 45
              ? <p className='medium'>Medium</p>
              : <p className='high'>High</p>}
          <p>Traffic</p>
        </div>
        <p className='num_people'>Approx. Wait Time: <br /> {hrs} Hours and {mins} Minutes</p>
      </div>
      )
    case "symptom":
      return (
        <Symptom />
      )
    case "fail":
      return (
        <div className='fail_content'>
          <p>You have <b>not</b> been cleared to engage in campus 
          activities. Please get your symptomatic testing done at Northwestern 
          University Health Service (Searle Hall, 633 Emerson) ASAP.</p>
        </div>
        
      )
    case "checkOut":
      return (
        <div className='checkout_content'>
          <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
          <p className='checkedin_msg'>You're checked in! <br /> <br /> Don't forget to check out once you have completed your test.</p>
        </div>
      )
  }
}

const Content = ({ status }) => {
  // for purposes of demo:
  // Low: 1 
  // medium: 2
  // high: 3

  // actual expected values:
  // low: <15
  // medium: 15-40
  // high: >40

  const [avgTime, loading, error] = useData('/avgTime');
      
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;
      
  return (
    <>
      {getContent(status, avgTime)}
    </>
  )
}

export default Content