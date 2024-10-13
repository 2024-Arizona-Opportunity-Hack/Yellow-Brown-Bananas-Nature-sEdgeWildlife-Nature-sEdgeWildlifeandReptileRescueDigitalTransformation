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
        <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light flex-column">
  
        <h2 className="text-center mb-4">Log In</h2>

        <div className="w-100 p-5" style={{ 
            maxWidth: '600px',
            padding: '20px',
            borderRadius: '30px',
            position: 'relative',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', 
            }}>

            <div style={{
            borderRadius: 'inherit', 
            backgroundColor: 'white',
            padding: '30px',
            filter: 'blur(0)', 
            }}>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group mb-4">
                <label htmlFor="username" className="form-label" style={{ marginBottom: '8px', fontWeight: '500' }}>Username</label>
                <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="username" 
                    placeholder="Enter username" 
                    style={{ padding: '12px' }}
                    {...register("username", { required: "This field is required." })} 
                />
                <div className="text-danger mt-2">{errors.username?.message}</div>
                </div>

                <div className="form-group mb-4">
                <label htmlFor="password" className="form-label" style={{ marginBottom: '8px', fontWeight: '500' }}>Password</label>
                <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    id="password" 
                    placeholder="Enter password" 
                    style={{ padding: '12px' }}
                    {...register("password", { required: "This field is required." })} 
                />
                <div className="text-danger mt-2">{errors.password?.message}</div>
                </div>

                <div className="d-grid">
                <SubmitButton className="btn btn-primary btn-lg py-2 shadow-sm" />
                </div>
            </form>
            
            <div className="text-center mt-3">
                <p>Don't have an account ? <a href="/register" className="text-primary">Register here!</a></p>
            </div>
            </div>
        </div>
    </div>

      
    );
}

export default LogIn;
