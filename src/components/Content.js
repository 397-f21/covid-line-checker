import './Content.css';

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
        <div className='checkout_content'>
          <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
          <p className='checkedin_msg'>You're checked in! <br /> <br /> Don't forget to check out once you have completed your test.</p>
        </div> :
        <div className='checkin_content'>
          <p className='test_location'>Jacobs Center Rapid Test - Covid-19</p>
          <div className='traffic'>
          {numPeople < 15 
            ? <p className='low'>Low</p> 
            : numPeople < 40 
            ? <p className='medium'>Medium</p> 
            : <p className='high'>High</p>}
          <p>Traffic</p>
          </div>
          <p className='num_people'>Approx. People in Line: {numPeople}</p>
        </div>
    )
}

export default Content