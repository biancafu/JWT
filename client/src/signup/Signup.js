import { React } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Signup() {
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const onSubmit = (data) => {
        axios.post('/signup', data)
        .then(res => {
            //store jwt token in local storage
            localStorage.setItem("token", JSON.stringify(res.data.token));
        })
        reset();
    }; 
    const onError = (error) => {
        console.log(error)
    };

    return <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <input
                    name="username"
                    placeholder='username'
                    type="text"
                    {...register('username', {
                        required: "Username is required",
                       // minLength: 5
                    })}
                />
                 {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div>
                <input
                    name="email"
                    placeholder='email'
                    type="email"
                    {...register('email', {required: "Email is required"})}
                />
                 {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <input
                    name="password"
                    placeholder='password'
                    type="password"
                    {...register('password',  {required: "Password is required"})}
                />
                 {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button>Submit</button>
        </form>
    </div>;
};