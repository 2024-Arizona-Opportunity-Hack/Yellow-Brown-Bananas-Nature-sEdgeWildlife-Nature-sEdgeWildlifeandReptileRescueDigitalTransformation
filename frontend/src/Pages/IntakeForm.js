import React from "react";
import { useCallback } from "react"; 
import { useForm } from "react-hook-form"; 

const IntakeForm = () => {
    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: { errors }, 
      } = useForm(); 

    const onSubmit = useCallback(() => { 
        console.log(getValues()); 
      }, [getValues]); 

    return (
        <>
            <h2>Animal Intake Form</h2> 
            <form onSubmit={handleSubmit(onSubmit)}> 
            
            {/* First Name field */}
            <label htmlFor="firstname">First Name</label> 
            <div> 
                <input 
                placeholder="First Name" 
                {...register("firstname", { required: "This field is required" })} 
                /> 
            </div> 
            <div className="error-message">{errors.firstname?.message}</div> 

            {/* Last Name field */}
            <label htmlFor="lastname">Last name</label> 
            <div> 
                <input 
                placeholder="Last name" 
                {...register("lastname", { required: "This field is required" })} 
                /> 
            </div> 
            <div className="error-message">{errors.lastname?.message}</div>

            {/* Email field */}
            <label htmlFor="email">Email</label>
            <div>
                <input
                placeholder="Email"
                {...register("email", { required: "This field is required" })}
                />
            </div>
            <div className="error-message">{errors.email?.message}</div>

            {/* Phone Number field */}
            <label htmlFor="phone">Phone Number</label>
            <div>
                <input
                placeholder="Phone Number"
                {...register("phone", { required: "This field is required" })}
                />
            </div>
            <div className="error-message">{errors.phone?.message}</div>

            <button type="submit">Submit</button> 
            </form> 
        </>
    );
}

export default IntakeForm;
