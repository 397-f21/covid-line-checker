import React from 'react';
import './Content.css';
import { useData } from '../utilities/firebase';

const Content = ({ checkedIn, numPeople }) => {
    // for purposes of demo:
    // Low: 1 
    // medium: 2
    // high: 3

    // actual expected values:
    // low: <15
    // medium: 15-40
    // high: >40
    const [avgTime, loading, error] = useData('/avgTime');
    const hrs = Math.floor(avgTime / 60);
    const mins = Math.floor(avgTime % 60);

    return (
        checkedIn ?
            <div className='checkout_content'>
                <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
                <p className='checkedin_msg'>You're checked in! <br /> <br /> Don't forget to check out once you have completed your test.</p>
            </div> :
            <div className='checkin_content'>
                <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
                <div className='traffic'>
                    {mins < 15
                        ? <p className='low'>Low</p>
                        : mins < 45
                            ? <p className='medium'>Medium</p>
                            : <p className='high'>High</p>}
                    <p>Traffic</p>
                </div>
                <p className='num_people'>Approx. Wait Time: <br /> {hrs} Hours and {mins} Minutes</p>
            </div>
    )
}

export default Content