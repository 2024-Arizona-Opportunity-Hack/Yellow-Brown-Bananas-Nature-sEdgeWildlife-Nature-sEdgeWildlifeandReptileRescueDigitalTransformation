import React from "react";
import { useCallback } from "react"; 
import { useForm } from "react-hook-form"; 
import { useNavigate } from 'react-router-dom';
import SubmitButton from "./components/SubmitButton";
import AuthService from "../services/AuthService";

const LogIn = () => {
    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: { errors }, 
      } = useForm(); 
      const navigate = useNavigate();

      const onSubmit = useCallback(async () => {
        const data = getValues();
        await AuthService.authenticate(data.username, data.password);

        const isAuthenticated = AuthService.isAuthenticated();
        if (isAuthenticated) {
            navigate("/search");
        } else {
            alert("Invalid credentials. Please try again.");
        }
      }, [getValues, navigate]);

    return (
        <>
            <h2>Log In</h2> 
            <form onSubmit={handleSubmit(onSubmit)}> 
            
            {/* Username field */}
            <label htmlFor="username">Username</label> 
            <div> 
                <input 
                placeholder="Username" 
                {...register("username", { required: "This field is required." })} 
                /> 
            </div> 
            <div className="error-message">{errors.username?.message}</div> 

            {/* Password field */}
            <label htmlFor="password">Password</label> 
            <div> 
                <input 
                type="password"
                placeholder="Password" 
                {...register("password", { required: "This field is required." })} 
                /> 
            </div> 
            <div className="error-message">{errors.password?.message}</div>

            <SubmitButton />
            </form>
        </>
    );
}

export default LogIn;
