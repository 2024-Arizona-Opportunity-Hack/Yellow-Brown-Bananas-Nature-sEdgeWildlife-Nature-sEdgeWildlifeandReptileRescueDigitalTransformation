import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form"; 

function Intake() {
    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: { errors }, 
    } = useForm();

    const [isOther, setIsOther] = useState(false); // State to manage "Other" selection

    const onSubmit = useCallback(() => { 
        console.log(getValues()); 
    }, [getValues]); 

    const handleSpeciesChange = (event) => {
        setIsOther(event.target.value === "other"); // Check if "Other" is selected
    };

    return (
        <>
            <style>{`
                /* Gradient background for the form */
                body {
                   background: white;
                   font-family: Sora, sans-serif;
                   font-size: 22px;
                   padding: 20px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   height: 100vh;
                   margin: 10px;
                   margin-bottom: 25px;
                }

                /* Make form responsive and larger */
                form {
                   display: flex;
                   flex-direction: column;
                   background: white;
                   padding: 30px;
                   border-radius: 30px;
                   box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
                   width: 1000px; /* Increase max-width for larger screens */
                   height: 930px;
                   box-sizing: border-box;
                }

                /* Styling for form title */
                h2 {
                    text-align: center;
                    color: #2f4f4f;
                    font-size: 30px;
                    margin-bottom: 20px;
                }

                /* Input and select field styling */
                input,
                select {
                    width: 100%;
                    padding: 15px;
                    margin: 12px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    font-size: 16px; /* Make input text bigger */
                    margin-bottom: 25px;
                }

                /* Button styling with gradient */
                button {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(90deg, #8fbc8f, #2f4f4f);
                    border: none;
                    border-radius: 5px;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                button:hover {
                    background: linear-gradient(135deg, #2f4f4f, #8fbc8f);
                }

                /* Error message styling */
                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: -8px;
                }

                @media screen and (min-width: 1024px) {
                    form {
                        max-width: 800px; /* Even wider form on larger screens */
                    }

                    h2 {
                        font-size: 32px;
                    }

                    input,
                    select {
                        font-size: 20px;
                    }

                    button {
                        font-size: 22px;
                    }
                }
            `}</style>

            <h2>Animal Intake Form</h2> 
            <form onSubmit={handleSubmit(onSubmit)}> 
                {/* Species (Mandatory) */}
                <label htmlFor="species">Species</label> 
                <div> 
                    <select
                        id="species"
                        {...register("species", { required: "Species is required" })}
                        onChange={handleSpeciesChange} // Handle change event
                    >
                        <option value="">Select Species</option>
                        <option value="snake">Snake</option>
                        <option value="lizard">Lizard</option>
                        <option value="turtle">Turtle</option>
                        <option value="gecko">Tortoise</option>
                        <option value="chameleon">Owl</option>
                        <option value="iguana">Bird</option>
                        <option value="crocodile">Crocodile</option>
                        <option value="alligator">Alligator</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="error-message">{errors.species?.message}</div>

                {/* If "Other" is selected, show the textbox */}
                {isOther && (
                    <div>
                        <label htmlFor="otherSpecies">Please specify:</label>
                        <input
                            id="otherSpecies"
                            type="text"
                            {...register("otherSpecies")}
                        />
                    </div>
                )}

                {/* Breed */}
                <label htmlFor="breed">Breed</label> 
                <div> 
                    <input 
                        id="breed"
                        type="text"
                        {...register("breed")}
                    /> 
                </div>

                {/* Gender */}
                <label htmlFor="gender">Gender</label>
                <div>
                    <select
                        id="gender"
                        {...register("gender")}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Coloration */}
                <label htmlFor="coloration">Coloration</label>
                <div>
                    <input
                        id="coloration"
                        type="text"
                        {...register("coloration")}
                    />
                </div>

                {/* Injury */}
                <label htmlFor="injury">Injury</label>
                <div>
                    <input
                        id="injury"
                        type="text"
                        {...register("injury")}
                    />
                </div>

                {/* Photos/Videos */}
                <label htmlFor="media">Photos/Videos</label>
                <div>
                    <input
                        id="media"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        {...register("media")}
                    />
                </div>

                <button type="submit">Submit</button> 
            </form> 
        </>
    );
}

export default Intake;
