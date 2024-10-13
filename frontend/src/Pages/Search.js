import React, { useMemo, useState, useEffect } from 'react';
import Table from './components/Table';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('Intake response'); // Set the default category
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data based on the current category
    const fetchData = async () => {
      let newData;
      if (category === 'Intake response') {
        newData = [
          { id: 1, name: 'John', age: 28, city: 'New York' },
          { id: 2, name: 'Jane', age: 22, city: 'Los Angeles' },
          { id: 3, name: 'Mike', age: 32, city: 'Chicago' },
        ];
      } else if (category === 'Adopt response') {
        newData = [
          { id: 4, name: 'Alice', age: 25, city: 'San Francisco' },
          { id: 5, name: 'Bob', age: 30, city: 'Boston' },
          { id: 6, name: 'Charlie', age: 35, city: 'Seattle' },
        ];
      } else if (category === 'Rescued animal') {
        newData = [
          { id: 7, name: 'David', age: 40, city: 'Houston' },
          { id: 8, name: 'Eve', age: 28, city: 'Miami' },
          { id: 9, name: 'Frank', age: 33, city: 'Dallas' },
        ];
      } else if (category === 'Ready for adopt') {
        newData = [
          { id: 10, name: 'Gina', age: 26, city: 'Denver' },
          { id: 11, name: 'Henry', age: 29, city: 'Austin' },
          { id: 12, name: 'Isabel', age: 31, city: 'Phoenix' },
        ];
      }
      setData(newData);
    };

    fetchData();
  }, [category]); // Re-fetch data when the category changes

  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const handleNameClick = (id) => {
    navigate(`/search/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">React Table Example</h1>

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
            onClick={() => setCategory('Rescued animal')}
            className={`px-4 py-2 ml-1 ${category === 'Rescued animal' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} rounded-full`}
            >
            Rescued Animal
            </button>
            <button
            onClick={() => setCategory('Ready for adopt')}
            className={`px-4 py-2 ml-1 ${category === 'Ready for adopt' ? 'bg-blue-500 text-white' : 'bg-transparent text-black'} rounded-full`}
            >
            Ready for Adopt
            </button>
        </div>
        </div>



      {/* Table for selected category */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Search;
