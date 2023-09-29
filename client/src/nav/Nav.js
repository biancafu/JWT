import { React, useState } from 'react';
import axios from 'axios';


export default function Nav() {
    const onClick = () => {
        const token = localStorage.getItem("token")

        axios.post('/signout', {token})
            .then(res => {
                console.log("sign out as", token)
                localStorage.removeItem("token")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return <button onClick={onClick}>sign out</button>
};



