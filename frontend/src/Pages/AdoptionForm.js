import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../services/APIService";

function AdoptionForm() {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const [speciesList, setSpeciesList] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false); // State to track successful submission

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
    
        // Create adoptionResponseObj with mapped attributes
        const adoptionResponseObj = {
            address: data.address,
            age: parseInt(data.age),
            email: data.email,
            job: data.job,
            speciesID: speciesID,
            name: data.name,
            phone: data.phone
        };
    
        try {
            await APIService.addAdoptionResponse(adoptionResponseObj);

            // If successful, reset the form and display success alert
            reset();
            setFormSubmitted(true); // Show the success alert
            console.log("Form submitted successfully and cleared.");
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    }, [getValues]);

    return (
        <>
            <div className="adoption-form-container">
                <div className="adoption-form">
                    <h2>Animal Adoption Form</h2>

                    {/* Show success alert */}
                    {formSubmitted && (
                        <div className="success-alert">
                            Form submitted successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name (Mandatory) */}
                        <label htmlFor="name">Name</label>
                        <div>
                            <input
                                id="name"
                                type="text"
                                {...register("name", { required: "Name is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.name?.message}</div>

                        {/* Email (Mandatory) */}
                        <label htmlFor="email">Email</label>
                        <div>
                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.email?.message}</div>

                        {/* Phone (Mandatory) */}
                        <label htmlFor="phone">Phone</label>
                        <div>
                            <input
                                id="phone"
                                type="tel"
                                {...register("phone", { required: "Phone number is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.phone?.message}</div>

                        {/* Address (Mandatory) */}
                        <label htmlFor="address">Address</label>
                        <div>
                            <input
                                id="address"
                                type="text"
                                {...register("address", { required: "Address is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.address?.message}</div>

                        {/* Age (Mandatory) */}
                        <label htmlFor="age">Age</label>
                        <div>
                            <input
                                id="age"
                                type="number"
                                {...register("age", { required: "Age is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.age?.message}</div>

                        {/* Job (Mandatory) */}
                        <label htmlFor="job">Job</label>
                        <div>
                            <input
                                id="job"
                                type="text"
                                {...register("job", { required: "Job is required" })}
                            />
                        </div>
                        <div className="error-message">{errors.job?.message}</div>

                        {/* Species (Mandatory) */}
                        <label htmlFor="species">Species</label>
                        <div>
                            <select id="species" {...register("species")}>
                                <option value="">Unsure</option> {/* "No preference" option with blank value */}
                                {speciesList.map((species) => (
                                    <option key={species.sID} value={species.sID}>
                                        {species.sType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="form-submit-button">Submit</button>
                    </form>
                </div>
            </div>

            {/* Regular style block for React */}
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
                .adoption-form-container {
                   display: flex;
                   justify-content: center;
                   align-items: flex-end;
                   width: 100%;
                   height: 100vh;
                   padding: 0;
                   margin: 0;
                   margin-bottom: 3.5rem;
                }

                /* Adoption form with 80% height, with scroll for overflow content */
                .adoption-form {
                   display: flex;
                   flex-direction: column;
                   background: white;
                   padding: 30px;
                   border-radius: 30px;
                   box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
                   width: 1000px; 
                   height: 80%;
                   box-sizing: border-box;
                   overflow-y: auto;
                }

                /* Custom scrollbar styles */
                .adoption-form::-webkit-scrollbar {
                    width: 6px;
                }

                .adoption-form::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                }

                .adoption-form::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                }

                /* Success alert styles */
                .success-alert {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    font-size: 16px;
                    text-align: center;
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
                    .adoption-form {
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
        </>
    );
}

export default AdoptionForm;
