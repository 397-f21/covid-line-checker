import React, { useState, useEffect } from "react";
import { setData, useData } from "../utilities/firebase";
import './Button.css'

const checkIn = async (numPeople) => {
    //isn't called until user clicks 'no' on symptom tracker page
    try {
        numPeople += 1;
        await setData("/numPeople", numPeople);
        localStorage.setItem("userId", numPeople);
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
        setUpdate(update + 1);
        
    }
    catch (error) {
        alert(error);
    }
}

const getButton = (status, setStatus, numPeople, update, setUpdate) => {
    switch (status) {
        case "checkIn":
            return (
                <button className="btn btn-checked-in" onClick={() => {
                    setStatus("symptom");
                }
                }>Check In</button>
            )
        case "symptom":
            return (
                <div className="btn-symptom">
                    <button className="btn btn-yes" onClick={() => {
                        // move on to failure page
                        setStatus("fail");
                    }}> Yes </button>
                    <button className="btn btn-no" onClick={() => {
                        checkIn(numPeople);
                        setStatus("checkOut");
                    }}> No </button>
                </div>
            )
        case "fail":
            return (
                <button className="btn btn-fail" onClick={() => {
                    setStatus("checkIn");
                }}> Ok </button>
            )
        case "checkOut":
            return (
                <button className="btn btn-checked-out" onClick={() => {
                    setStatus("checkIn");
                    checkOut(numPeople, update, setUpdate);
                }
                }>Check Out</button> 
            )
    }
}

const Button = ({ status, setStatus, numPeople }) => {
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
        localStorage.removeItem("userId");

    }, [update]);

    if (errorData) return <h1>{errorData}</h1>;
    if (loadingData) return <h1>Loading the data...</h1>;


    // CheckedIn        Symptom
    // true             false       they failed so show failure screen
    // true             true        they passed and were checked in so show check out screen
    // false            false       on check in screen
    // false            true        on symptom screen 



    return (
        <>
            {getButton(status, setStatus, numPeople, update, setUpdate)}
        </>
    )
}

/* 

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
                // move on to failure page
                setSymptom(false);
                setCheckedIn(true);
              }}> Yes </button>
              <button onClick={()=>{
                setSymptom(true);
                //setCheckedIn(true);
                checkIn(numPeople);
              }}> No </button></div>
          :
          <button className="btn btn-checked-in" onClick={() => {
            setCheckedIn(true);
            //checkIn(numPeople);
          }
          }>Check In</button>
*/

export default Button;