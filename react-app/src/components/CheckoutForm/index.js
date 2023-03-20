import React, { useState } from "react";

function CheckoutForm(){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [card, setCard] = useState("");
    const [pin, setPin] = useState("");
    const [errors, setErrors] = useState([]);

    // to do: change inputs, make submit button
    return(
        <div>
            <form>
                <h3>Shipping Info</h3>
                <label>Name
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Address
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Name
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Address
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Name
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Address
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Name
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
                <label>Address
                    <input
                     type="text"
                     value={name}
                     onChange={(e) => setEmail(e.target.value)}
                     required>
                    </input>
                </label>
            </form>
        </div>
    )
}
