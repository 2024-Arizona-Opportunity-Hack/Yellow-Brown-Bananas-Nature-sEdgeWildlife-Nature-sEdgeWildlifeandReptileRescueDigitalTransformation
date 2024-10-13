import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

function Adoption() {
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
        <div style={styles.body}>
            <h2 style={styles.h2}>Adoption Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}> 
                {/* Name (Mandatory) */}
                <label htmlFor="name">Name</label> 
                <div> 
                    <input 
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        style={styles.input}
                    /> 
                </div>
                <div style={styles.errorMessage}>{errors.name?.message}</div>

                {/* Email (Mandatory) */}
                <label htmlFor="email">Email</label>
                <div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        style={styles.input}
                    />
                </div>  
                <div style={styles.errorMessage}>{errors.email?.message}</div>      

                {/* Phone (Mandatory) */}
                <label htmlFor="phone">Phone</label>
                <div>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone"
                        {...register("phone", { required: "Phone number is required" })}
                        style={styles.input}
                    />
                </div>  
                <div style={styles.errorMessage}>{errors.phone?.message}</div> 

                {/* Address (Mandatory) */}
                <label htmlFor="address">Address</label>
                <div>
                    <input
                        id="address"
                        type="text"
                        placeholder="Address"
                        {...register("address", { required: "Address is required" })}
                        style={styles.input}
                    />
                </div>  
                <div style={styles.errorMessage}>{errors.address?.message}</div> 

                {/* Age (Mandatory) */}
                <label htmlFor="age">Age</label>
                <div>
                    <input
                        id="age"
                        type="number"
                        placeholder="Age"
                        {...register("age", { required: "Age is required" })}
                        style={styles.input}
                    />
                </div>  
                <div style={styles.errorMessage}>{errors.age?.message}</div>

                {/* Job (Mandatory) */}
                <label htmlFor="job">Job</label>
                <div>
                    <input
                        id="job"
                        type="text"
                        placeholder="Job"
                        {...register("job", { required: "Job is required" })}
                        style={styles.input}
                    />
                </div>  
                <div style={styles.errorMessage}>{errors.job?.message}</div>

                {/* Species (Mandatory) */}
                <label htmlFor="species">Species</label> 
                <div> 
                    <select
                        id="species"
                        {...register("species", { required: "Species is required" })}
                        style={styles.input}
                    >
                        <option value="">Select Species</option>
                        <option value="snake">Snake</option>
                        <option value="lizard">Lizard</option>
                        <option value="turtle">Turtle</option>
                        <option value="gecko">Gecko</option>
                        <option value="chameleon">Chameleon</option>
                        <option value="iguana">Iguana</option>
                        <option value="crocodile">Crocodile</option>
                        <option value="alligator">Alligator</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.errorMessage}>{errors.species?.message}</div>

                <button type="submit" style={styles.button}>Submit</button> 
            </form>
        </div>
    );
}

const styles = {
    body: {
        background: 'linear-gradient(135deg, #8FBC8F, #2F4F4F)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    },
    form: {
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box',
    },
    h2: {
        textAlign: 'center',
        color: '#2F4F4F',
        fontSize: '24px',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        background: 'linear-gradient(135deg, #8FBC8F, #2F4F4F)',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        marginTop: '-8px',
    }
};

export default Adoption;
