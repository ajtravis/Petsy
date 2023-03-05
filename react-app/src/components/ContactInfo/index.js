import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ContactInfo.css'

export default function ContactInfo(){
    const { closeModal } = useModal();

    return(
        <div className="contact-container">
            <div>
                Please feel free to contact me:
            </div>
            <div>Github:
                <a onClick={closeModal} href="https://github.com/ajtravis"> github.com/ajtravis</a>
            </div>
            <div>LinkedIn:
                <a onClick={closeModal} href="https://www.linkedin.com/in/alexander-james-travis/"> linkedin.com/in/alexander-james-travis</a>
            </div>
            <div>
            email: ajtravis2@gmail.com
            </div>
        </div>
    )
}
