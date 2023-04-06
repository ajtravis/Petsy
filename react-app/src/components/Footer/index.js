import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ContactInfo from "../ContactInfo";
import { useHistory } from "react-router-dom";
import './Footer.css'

export default function Footer() {
    const history = useHistory()
    const handleHelp = () => {
        history.push('/help')
    }

    return (
        <div id="footer-container">
            <div>
            <OpenModalButton
              location = "footer"
              buttonText="Contact"
              modalComponent={<ContactInfo />}
              />
            </div>

            {/* <div className="stack">
                Backend:
                <div>Flask</div>
                <div>SQLAlchemy</div>
                <div>PostgresSQL</div>
            </div>
            <div className="stack">Frontend:
                <div>React</div>
                <div>Redux</div>
            </div> */}
            <div className="help-button" onClick={handleHelp}>Help</div>
        </div>
    )
}
