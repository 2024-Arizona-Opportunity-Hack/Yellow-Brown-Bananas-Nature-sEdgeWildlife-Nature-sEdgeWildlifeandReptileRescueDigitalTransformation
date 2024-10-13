import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIService from '../services/APIService.js';

const IntakeDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [intake, setIntake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntake = async () => {
      try {
        const data = await APIService.getIntakeDetail(id); // Fetch intake detail by ID
        setIntake(data);
      } catch (err) {
        setError('Failed to fetch intake data.');
      } finally {
        setLoading(false);
      }
    };

    fetchIntake();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntake({ ...intake, [name]: value });
  };

  const handleSave = async () => {
    try {
      await APIService.updateIntake(intake); // Save the updated intake data
      alert('Changes saved successfully!');
    } catch (err) {
      console.error('Failed to update intake data:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Intake Detail</h1>
      {intake && (
        <form className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="species">Species</label>
            <input
              type="text"
              name="species"
              value={intake.species}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">Breed</label>
            <input
              type="text"
              name="breed"
              value={intake.breed}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colorization">Colorization</label>
            <input
              type="text"
              name="colorization"
              value={intake.colorization}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              value={intake.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="injury">Injury</label>
            <input
              type="text"
              name="injury"
              value={intake.injury}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rescuerName">Rescuer Name</label>
            <input
              type="text"
              name="rescuerName"
              value={intake.rescuerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rescuerPhoneNumber">Rescuer Phone Number</label>
            <input
              type="text"
              name="rescuerPhoneNumber"
              value={intake.rescuerPhoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default IntakeDetail;
