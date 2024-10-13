import React, { useMemo, useState, useEffect } from 'react';
import Table from './components/Table';
import { useNavigate } from 'react-router-dom';
import APIService from '../services/APIService.js'; // Ensure this service is properly defined

const Search = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('Intake response'); // Default category
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      setError(null); // Reset error state
      let newData = [];
        try {
            if (category === 'Intake response') {
            newData = setData(await APIService.getIntakeResponse()); // Fetch data for Intake Response
            } else if (category === 'Adopt response') {
            newData = [
                { id: 4, name: 'Alice', age: 25, city: 'San Francisco' },
                { id: 5, name: 'Bob', age: 30, city: 'Boston' },
                { id: 6, name: 'Charlie', age: 35, city: 'Seattle' },
            ];
            } else if (category === 'Ready for adopt') {
            newData = [
                { id: 10, name: 'Gina', age: 26, city: 'Denver' },
                { id: 11, name: 'Henry', age: 29, city: 'Austin' },
                { id: 12, name: 'Isabel', age: 31, city: 'Phoenix' },
            ];
            }

        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };
    

    fetchData();
  }, [category]); // Re-fetch data when the category changes

  // Memoize the columns, based on the current category
  const columns = useMemo(() => {
    if (category === 'Adopt response' || category === 'Ready for adopt') {
      return [
        {
          Header: 'Name',
          accessor: 'name',
          Cell: ({ row }) => (
            <span
              onClick={() => handleNameClick(row.original.id)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              {row.original.name}
            </span>
          ),
        },
        {
          Header: 'Age',
          accessor: 'age',
        },
        {
          Header: 'City',
          accessor: 'city',
        },
      ];
    } else if (category === 'Intake response') {
      return [
        {
            Header: 'Species',
            accessor: 'species',
            Cell: ({ row }) => (
                <span
                  onClick={() => handleNameClick(row.original.ID)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  {row.original.species}
                </span>
            ),
        },
        {
          Header: 'Breed',
          accessor: 'breed',
          
        },
        {
          Header: 'Colorization',
          accessor: 'colorization',
        },
        {
          Header: 'Gender',
          accessor: 'gender',
        },
        {
          Header: 'Injury',
          accessor: 'injury',
        },
        {
          Header: 'Rescuer Name',
          accessor: 'rescuerName',
        },
        {
          Header: 'Rescuer Phone Number',
          accessor: 'rescuerPhoneNumber',
        },
        {
            Header: 'Ready for Adoption', // New column for the checkbox
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  defaultChecked={row.original.isActive === 1} // Check if the animal is marked as ready for adoption
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const confirmAction = window.confirm(
                      `Are you sure you want to ${isChecked ? 'mark' : 'unmark'} this animal as ready for adoption?`
                    );
                    if (confirmAction) {
                      handleCheckboxChange(row.original.ID, isChecked); // Pop the ID and handle the change
                      alert(`Animal ID: ${row.original.ID} has been ${isChecked ? 'marked' : 'unmarked'} as ready for adoption.`);
                    } else {
                      e.target.checked = !isChecked; // Revert the checkbox if the action is not confirmed
                    }
                  }}
                />
              </div>
            ),
          },
     
      ];
    }
  }, [category]);

    const handleNameClick = (id) => {
        if (id) {
        const formattedCategory = category.replace(/\s+/g, '-').toLowerCase(); 
        const url = `/search/${formattedCategory}/${id}`;
    
        console.log('Navigating to:', url); 
        navigate(url); 
        } else {
        console.error('ID is undefined');
        }
    };

    const handleCheckboxChange = (id, checked) => {
        if (checked) {
          console.log(`Animal with ID ${id} is ready for adoption.`);
        } else {
          console.log(`Animal with ID ${id} is NOT ready for adoption.`);
        }
    };
    
  
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Database Search</h1>

        {/* Category buttons */}
        <div className="mb-4 w-full flex justify-center">
            <div className="flex bg-transparent backdrop-blur-md border border-gray-300 rounded-full p-2">
            <button
                onClick={() => setCategory('Intake response')}
                className={`px-4 py-2 ${category === 'Intake response' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} rounded-full`}
            >
                Intake Response
            </button>
            <button
                onClick={() => setCategory('Adopt response')}
                className={`px-4 py-2 ml-1 ${category === 'Adopt response' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} rounded-full`}
            >
                Adopt Response
            </button>
            <button
                onClick={() => setCategory('Ready for adopt')}
                className={`px-4 py-2 ml-1 ${category === 'Ready for adopt' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} rounded-full`}
            >
                Ready for Adopt
            </button>
            </div>
        </div>

        {/* Table section */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
            {loading ? (
            <div>Loading...</div>
            ) : error ? (
            <div className="text-red-500">{error}</div>
            ) : data.length === 0 ? (
            <div>No data available.</div>
            ) : (
            <Table columns={columns} data={data} />
            )}
        </div>
        </div>
  );
};

    export default Search;
