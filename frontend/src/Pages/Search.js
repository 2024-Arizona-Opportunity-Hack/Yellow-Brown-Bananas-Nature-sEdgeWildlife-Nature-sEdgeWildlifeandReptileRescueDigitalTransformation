import React, { useMemo, useState, useEffect } from 'react';
import Table from './components/Table';
import { useNavigate } from 'react-router-dom';
import APIService from '../services/APIService.js'; // Ensure this service is properly defined
import { set } from 'react-hook-form';

const Search = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('Intake response'); // Default category
  const [loading, setLoading] = useState(false); // Loading state
  const [refresh, setRefresh] = useState(false);
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
                newData = setData(await APIService.getAdoptResponse());
            } else if (category === 'Ready for adopt') {
                newData = setData(await APIService.getReadyForAdopt()); // Fetch data for Ready for Adopt
            }

        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };
    

    fetchData();
  }, [category, refresh]); // Re-fetch data when the category changes or if need to refresh

  // Memoize the columns, based on the current category
  const columns = useMemo(() => {
    if (category === 'Adopt response') {
      return [
        {
          Header: 'Name',
          accessor: 'name',
          Cell: ({ row }) => (
            <span
              onClick={() => handleNameClick(row.original.ID)}
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
          Header: 'Email',
          accessor: 'email',
        },
        {
            Header: 'Job',
            accessor: 'job',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },
        {
            Header: 'Species reference',
            accessor: 'species',
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
                  defaultChecked={row.original.isActive === 0} // Check if the animal is marked as ready for adoption
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
    } else if (category === 'Ready for adopt') {
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
            }
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

    const handleCheckboxChange = async (id, checked) => {
        if (checked) {
            try { await APIService.animalReadyForAdoption(id); }
            catch (error) {}
            setRefresh(!refresh);
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
