import { React, useState, useEffect } from 'react';


export default function Nav() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('INITIAL', user)
        const curr = JSON.parse(localStorage.getItem("user"));
         console.log('CURR', JSON.parse(localStorage.getItem("user")))
        setUser(curr);
    }, []);

    return (<div>
        {user && <div>log in as: {user}</div>}
    </div> )
};


