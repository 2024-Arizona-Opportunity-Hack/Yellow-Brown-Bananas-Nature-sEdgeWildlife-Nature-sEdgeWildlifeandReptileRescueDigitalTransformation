import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../services/APIService";

function IntakeForm() {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
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
    const onSubmit = useCallback(async () => {
        const data = getValues();

        // Map species from string to speciesID as an integer, or null if "No preference"
        const speciesID = data.species === "" ? null : parseInt(data.species);

        // Create intakeResponseObj with mapped attributes
        const intakeResponseObj = {
            breed: data.breed,
            colorization: data.colorization,
            gender: data.gender,
            injury: data.injury,
            speciesID: speciesID,
            rescuerName: data.rescuerName,
            rescuerPhone: data.rescuerPhone
        };

        console.log(intakeResponseObj);

        try {
            // Add intakeResponseObj to the database via APIService
            await APIService.addIntakeResponse(intakeResponseObj);

            // If successful, reset the form to clear all fields
            reset();  // Clear the form
            console.log("Form submitted successfully and cleared.");
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    }, [getValues]);

    return (
        <>
            <style>{`
    body {
       background: white;
       font-family: Sora, sans-serif;
       font-size: 22px;
       height: 100vh;
       margin: 0;
       padding: 0;
       display: flex;
       justify-content: center;
       align-items: center;
    }

    /* Container for form positioned at the bottom with 20px margin */
    .intake-form-container {
       display: flex;
       justify-content: center;
       align-items: flex-end;
       width: 100%;
       height: 100vh;
       padding: 0;
       margin: 0;
       margin-bottom: 3.5rem;
    }

    /* Intake form with 80% height, with scroll for overflow content */
    .intake-form {
       display: flex;
       flex-direction: column;
       background: white;
       padding: 30px;
       border-radius: 30px;
       box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
       width: 1000px; 
       height: 80%; /* Set height to 80% of the viewport */
       box-sizing: border-box;
       overflow-y: auto; /* Enable vertical scroll if content overflows */
    }

    /* Custom scrollbar styles */
    .intake-form::-webkit-scrollbar {
        width: 6px; /* Reduce scrollbar width to half (default is usually 12px) */
    }

    .intake-form::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3); /* Scrollbar thumb color */
        border-radius: 10px; /* Make the scrollbar thumb rounded */
    }

    .intake-form::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1); /* Scrollbar track color */
    }

    /* Ensure the content inside the form has a margin of 20px from the bottom */
    .intake-form form {
       flex-grow: 1;
       overflow-y: auto; /* Enable scroll inside the form */
       padding-bottom: 20px; /* Space between form content and bottom of card */
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

    .form-submit-button {
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

    .form-submit-button:hover {
        background: linear-gradient(135deg, #2f4f4f, #8fbc8f);
    }

    .error-message {
        color: red;
        font-size: 12px;
        margin-top: -8px;
    }

    @media screen and (min-width: 1024px) {
        .intake-form {
            max-width: 800px; 
        }

        h2 {
            font-size: 32px;
        }

        input,
        select {
            font-size: 20px;
        }

        .form-submit-button {
            font-size: 22px;
        }
    }
`}</style>
            <div className="intake-form-container">
                <div className="intake-form">
                    <h2>Animal Intake Form</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <br />
                        <h3>Animal Information</h3>
                        <br />

                        {/* Species (Mandatory) */}
                        <label htmlFor="species">Species</label>
                        <div>
                            <select
                                id="species"
                                {...register("species")}
                            >
                                <option value="">Unsure</option> {/* "No preference" option with blank value */}
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

                        {/* colorization */}
                        <label htmlFor="colorization">Colorization</label>
                        <div>
                            <input
                                id="colorization"
                                type="text"
                                {...register("colorization")}
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

                        <br />
                        <h3>Rescuer Information</h3>
                        <br />

                        {/* Rescuer Name */}
                        <label htmlFor="rescuerName">Rescuer Name</label>
                        <div>
                            <input
                                id="rescuerName"
                                type="text"
                                {...register("rescuerName")}
                            />
                        </div>

                        {/* Rescuer Email */}
                        <label htmlFor="rescuerPhone">Rescuer Phone</label>
                        <div>
                            <input
                                id="rescuerPhone"
                                type="phone"
                                {...register("rescuerPhone")}
                            />
                        </div>

                        <button type="submit" className="form-submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default IntakeForm;
