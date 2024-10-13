import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../services/APIService";

function IntakeForm() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const [speciesList, setSpeciesList] = useState([]);

    // Fetch species from API
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const species = await APIService.getSpecies();
                setSpeciesList(species);
            } catch (error) {
                console.error('Failed to fetch species:', error);
            }
        };

        fetchSpecies();
    }, []);

    // Handle form submission
    const onSubmit = useCallback(() => {
        const data = getValues();
    
        // Map species from string to speciesID as an integer, or null if "No preference"
        const speciesID = data.species === "" ? null : parseInt(data.species);
    
        // Create intakeResponseObj with mapped attributes
        const intakeResponseObj = {
            breed: data.breed,
            coloration: data.coloration,
            gender: data.gender,
            injury: data.injury,
            speciesID: speciesID, // Replace species with speciesID
        };
    
        console.log(intakeResponseObj);
    }, [getValues]);    

    return (
        <>
            <style>{`
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
                form {
                   display: flex;
                   flex-direction: column;
                   background: white;
                   padding: 30px;
                   border-radius: 30px;
                   box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
                   width: 1000px; 
                   height: 930px;
                   box-sizing: border-box;
                }
                h2 {
                    text-align: center;
                    color: #2f4f4f;
                    font-size: 30px;
                    margin-bottom: 20px;
                }
                input,
                select {
                    width: 100%;
                    padding: 15px;
                    margin: 12px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    font-size: 16px;
                    margin-bottom: 25px;
                }
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
                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: -8px;
                }
                @media screen and (min-width: 1024px) {
                    form {
                        max-width: 800px; 
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
                        {...register("species")}
                    >
                        <option value="">No preference</option> {/* "No preference" option with blank value */}
                        {speciesList.map((species) => (
                            <option key={species.sID} value={species.sID}>
                                {species.sType}
                            </option>
                        ))}
                    </select>
                </div>

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

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default IntakeForm;
