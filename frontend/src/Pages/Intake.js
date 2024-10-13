import React, { useCallback } from "react";
import { useForm } from "react-hook-form"; 

function Intake() {
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
            <style>{`
                body {
                    background: linear-gradient(135deg, #8FBC8F, #2F4F4F);
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                form {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    width: 100%; 
                    max-width: 400px; 
                    box-sizing: border-box; 
                }

                h2 {
                    text-align: center;
                    color: #2F4F4F; 
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                input, select {
                    width: 100%; 
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box; 
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background: linear-gradient(135deg, #8FBC8F, #2F4F4F);
                    border: none;
                    border-radius: 5px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                button:hover {
                    background: linear-gradient(135deg, #2F4F4F, #8FBC8F);
                }

                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: -8px;
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
                <div className="error-message">{errors.species?.message}</div>

                {/* Breed */}
                <label htmlFor="breed">Breed</label> 
                <div> 
                    <input 
                        id="breed"
                        type="text"
                        placeholder="Breed" 
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
                        placeholder="Coloration"
                        {...register("coloration")}
                    />
                </div>

                {/* Injury */}
                <label htmlFor="injury">Injury</label>
                <div>
                    <input
                        id="injury"
                        type="text"
                        placeholder="Injury"
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
//hii