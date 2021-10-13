import React from "react";
import './Content.css';

const Symptom = () =>{
    return (
        <>
            <div className="symptom_content">
                <div><b>Since you last visited the Evanston or Chicago campuses, 
                    have you experienced any of these symptoms unrelated to a 
                    known or pre-existing medical illness?</b></div>
                    <ul>
                        <li>Fever</li>
                        <li>New or worsening cough</li>
                        <li>Sore throat</li>
                        <li>Shortness of breath</li>
                        <li>Loss of taste or smell</li>
                        <li>Chills or rigors</li>
                        <li>New headache, neck ache or muscle pain not related to physical activity</li>
                        <li>More than one episode of vomiting or diarrhea</li>
                    </ul>
            </div>
        </>
    )
}

export default Symptom