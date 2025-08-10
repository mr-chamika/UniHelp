import './OtpPopup.css'
import React, { useState } from 'react';

const OtpPopup = ({ show, cancel, handleDone }) => {

    if (!show) { return null; }

    const [input, setInput] = useState('');

    return (

        <div className={"otpPopup-container"}>

            <div className={'popup'}>

                <p>
                    Enter the OTP Code that we
                    sent to your email. Check your email.
                </p>

                <input type="text" placeholder="Enter your OTP Code here......." onChange={e => setInput(e.target.value)} />

                <div className='buttons'>
                    <button className='done' onClick={() => { handleDone(input) }}>Done</button>
                    <button className='cancel' onClick={cancel}>Cancel</button>
                </div>

            </div>

        </div>

    );

}

export default OtpPopup;