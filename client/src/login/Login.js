import { React, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Login() {
    let [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("login as:", data);
        axios.post('/login', data)
            .then(res => {

                setErrorMessage(res.data.message);

                //store jwt token in local storage
                if(res.data.token) {
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    // window.location.reload(false);

                }
            })
            .catch(err => {
                console.log(err);
            })
        reset();
        setErrorMessage("");
    };
    const onError = (error) => {
        console.log(error)
    };
    return <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <input
                    name="email"
                    placeholder='email'
                    type="email"
                    {...register('email', { required: "Email is required" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <input
                    name="password"
                    placeholder='password'
                    type="password"
                    {...register('password', { required: "Password is required" })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            <button>Login</button>
        </form>
    </div>;
};