import { React } from 'react';


export default function Nav() {
    user = localStorage.getItem("user")
    return <div>
        {user && <div>log in as: {user}</div>}
    </div> 
};



