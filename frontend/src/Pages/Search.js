import React, { useMemo, useState, useEffect } from 'react';
import Table from './components/Table';

const Search = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const newData = [
                { id: 1, name: 'John', age: 28, city: 'New York' },
                { id: 2, name: 'Jane', age: 22, city: 'Los Angeles' },
                { id: 3, name: 'Mike', age: 32, city: 'Chicago' },
            ];
            setData(newData);
        };

        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
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

    return (
        <div>
            <h1>React Table Example</h1>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default Search;
