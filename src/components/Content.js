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
        <div>
          <p>Jacobs Center Rapid Test - Covid-19</p>
          <p>You're checked in! Don't forgot to check out!</p>
        </div> :
        <div className='checkin_content'>
          <p>Jacobs Center Rapid Test - Covid-19</p>
          <div className='traffic'>
          {numPeople < 15 
            ? <p className='low'>Low</p> 
            : numPeople < 40 
            ? <p className='medium'>Medium</p> 
            : <p className='high'>High</p>}
          <p>Traffic</p>
          </div>
          <p>Approx. People in Line: {numPeople}</p>
        </div>
    )
}

export default Content