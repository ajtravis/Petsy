import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ContactInfo from "../ContactInfo";
import './Footer.css'

export default function Footer() {
    return (
        <div id="footer-container">
            <div>
            <OpenModalButton
              buttonText="Contact Me"
              modalComponent={<ContactInfo />}
              />
            </div>

            <div>
                Backend
                <div>Flask</div>
                <div>SqlAlchemy</div>
            </div>
            <div>Frontend
                <div>React</div>
                <div>Redux</div>
            </div>
            <div>Help</div>
        </div>
    )
}
