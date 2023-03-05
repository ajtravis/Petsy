import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ContactInfo.css'

export default function ContactInfo(){
    const { closeModal } = useModal();

    return(
        <div className="contact-container">
            <div style={{alignSelf: "center"}}>
                Please feel free to contact me with any questions or feedback:
            </div>
            <div className="contact-info">
                Github:
                <a onClick={closeModal} href="https://github.com/ajtravis"> github.com/ajtravis</a>
            </div>
            <div className="contact-info">
                LinkedIn:
                <a onClick={closeModal} href="https://www.linkedin.com/in/alexander-james-travis/"> linkedin.com/in/alexander-james-travis</a>
            </div>
            <div className="contact-info">
            email: ajtravis2@gmail.com
            </div>
        </div>
    )
}
