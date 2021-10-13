import React, { useState, useEffect } from "react";
import { setData, useData } from "../utilities/firebase";
import './Button.css'

const checkIn = async (numPeople) => {
    try {
        numPeople += 1;
        await setData("/numPeople", numPeople);
        localStorage.setItem("userId", numPeople);
        console.log("Checked in: ", Date.now());
        await setData(`/${numPeople}/checkIn`, Date.now());
        // await setData(`/${numPeople}/checkOut`, 0);
    }
    catch (error) {
        alert(error);
    }
}

const checkOut = async (numPeople, update, setUpdate) => {
    try {
        await setData(`/${numPeople}/checkOut`, Date.now());
        console.log("Checked out: ", Date.now());
        setUpdate(update + 1);

    }
    catch (error) {
        alert(error);
    }
}



// const Button = ({ checkedIn, setCheckedIn, numPeople, setUpdate, update }) => {
const Button = ({ checkedIn, setCheckedIn, symptom, setSymptom, numPeople }) => {
    const [update, setUpdate] = useState(0);
    const [data, loadingData, errorData] = useData('/');

    useEffect(() => {
        if (errorData) return <h1>{errorData}</h1>;
        if (loadingData) return <h1>Loading the data...</h1>;
        const userId = localStorage.getItem("userId");
        console.log("UserId: ", userId)
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
            if (data[currId]["checkOut"] != null) {
                checkoutTime = data[currId]["checkOut"];
                console.log("CurrId:", currId)
                total += (checkoutTime - checkinTime);
                count += 1;
            }
            currId -= 1;
        }

        let avgTime = (total / (count * 60000));
        console.log("Average Time:", avgTime);
        setData(`/avgTime`, avgTime);

    }, [update]);

    if (errorData) return <h1>{errorData}</h1>;
    if (loadingData) return <h1>Loading the data...</h1>;

    return (
        checkedIn ?
          symptom ? 
            <button className="btn btn-checked-out" onClick={() => {
              setCheckedIn(false);
              checkOut(numPeople, update, setUpdate);
              setSymptom(false);
            }
            }>Check Out</button>
            :
              <div><button onClick={()=>{
                setSymptom(true);
              }}> Yes </button>
              <button onClick={()=>{
                setSymptom(true);
              }}> No </button></div>
          :
          <button className="btn btn-checked-in" onClick={() => {
            setCheckedIn(true);
            checkIn(numPeople);
          }
          }>Check In</button>
    )
}

export default Button;