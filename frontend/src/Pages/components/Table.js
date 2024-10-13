import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';

function GlobalFilter({ filter, setFilter }) {
    return (
        <input
            value={filter || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder="Search all columns..."
            style={{
                marginBottom: '10px',
                padding: '5px',
                width: '100%',
                fontSize: '1.1rem',
            }}
        />
    );
}

const Table = ({ columns, data }) => {
    const [globalFilter, setGlobalFilter] = useState('');

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter: setTableGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data,
            globalFilter: globalFilter, // Global filter for search
        },
        useGlobalFilter, // Hook for global filtering
        useSortBy // Hook for sorting
    );

    return (
        <div>
            <GlobalFilter filter={state.globalFilter} setFilter={setTableGlobalFilter} />
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        fontWeight: 'bold',
                                        padding: '10px',
                                    }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
