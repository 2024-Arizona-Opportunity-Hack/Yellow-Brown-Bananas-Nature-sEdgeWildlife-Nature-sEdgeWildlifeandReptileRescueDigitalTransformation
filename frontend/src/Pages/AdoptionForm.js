import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

function AdoptionForm() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    // Step 1: Add state to track selected species
    const [selectedSpecies, setSelectedSpecies] = useState("");

    const onSubmit = useCallback(() => {
        console.log(getValues());
    }, [getValues]);

    // Step 2: Handle species change
    const handleSpeciesChange = (event) => {
        setSelectedSpecies(event.target.value);
    };

    return (
        <>
            <h2>Adoption Form</h2>
            <div>
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
                        <select
                            id="species"
                            {...register("species", { required: "Species is required" })}
                            onChange={handleSpeciesChange} // Step 3: Add change handler
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

                    {/* Step 4: Conditionally render the text box for "Other" */}
                    {selectedSpecies === "other" && (
                        <div>
                            <input
                                type="text"
                                placeholder="Please Specify Species"
                                {...register("otherSpecies")}
                            />
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>

            <style jsx>{`
                /* Styles remain unchanged */
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
                    height: 980px;
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
        </>
    );
}

export default AdoptionForm;
