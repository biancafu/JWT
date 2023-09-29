import { React, useState } from 'react';
import axios from 'axios';


export default function Signout() {
    const onClick = () => {
        const token = localStorage.getItem("token")

        axios.post('/signout', {token})
            .then(res => {
                console.log("sign out as", token)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                // window.location.reload(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return <button onClick={onClick} id="signout">sign out</button>
};



