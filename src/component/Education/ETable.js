import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

export default function ETable() {
    const [tableData, setTableData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [schUni, setSchUni] = useState('');
    const [degree, setDegree] = useState('');
    const [grade, setGrade] = useState('');
    const [poy, setPoy] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
        setTableData(storedData);
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        let id = Math.random().toString(16).slice(2);
        const newData = { id, schUni, degree, grade, poy };
        if (editIndex === null) {
            setTableData([...tableData, newData]);
        } else {
            const updatedData = [...tableData];
            updatedData[editIndex] = newData;
            setTableData(updatedData);
            setEditIndex(null);
        }
        const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
        const updatedStoredData = editIndex === null
            ? [...storedData, newData]
            : storedData.map((d, i) => i === editIndex ? newData : d);
        localStorage.setItem('educationData', JSON.stringify(updatedStoredData));
        setSchUni('');
        setDegree('');
        setGrade('');
        setPoy('');
    };

    const editTableRow = (index) => {
        setEditIndex(index);
        setShowNewComponent(true);
        setSchUni(tableData[index].schUni);
        setDegree(tableData[index].degree);
        setGrade(tableData[index].grade);
        setPoy(tableData[index].poy);
    };

    const deleteTableRow = (id) => {
        // 10
        const updatedData = tableData.filter(d => d.id !== id);
        setTableData(updatedData);
        localStorage.setItem('educationData', JSON.stringify(updatedData));
    };

    return (
        <div>
            {!showNewComponent && (
                <div className='eadd-button'>
                    <button onClick={() => setShowNewComponent(true)}>Add Details</button>
                </div>
            )}
            {!showNewComponent && (
                <table>
                    <thead>
                        <tr>
                            <th>School/University</th>
                            <th>Degree</th>
                            <th>Grade</th>
                            <th>Passing Of Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((record, index) => {
                            return (
                                <tr className='box' key={record.id}>
                                    <td>{record.schUni}</td>
                                    <td>{record.degree}</td>
                                    <td>{record.grade}</td>
                                    <td>{record.poy}</td>
                                    <td>
                                        <nav>
                                            <BiEdit onClick={() => editTableRow(index)} style={{ paddingRight: "0.5rem" }} />
                                            <MdDelete onClick={() => deleteTableRow(record.id)} />
                                        </nav>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            {showNewComponent && (
                <div>
                    <div className='form-header'>
                        <h2>{editIndex === null ? 'Add Education Details' : 'Edit Education Details'}</h2>
                    </div>
                    <div className='form-detail'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='schUni'>School: </label>
                                <input type='text' id='schUni' name='schUni' value={schUni} placeholder='School/Uni' onChange={(e) => setSchUni(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='degree'>Degree:</label>
                                <input type='text' id='degree' name='degree' value={degree} placeholder='Degree' onChange={(e) => setDegree(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='grade'>Grade:</label>
                                <input type='text' id='grade' name='grade' value={grade} placeholder='Grades in point' onChange={(e) => setGrade(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='poy'>Passing Of Year:</label>
                                <input type='text' id='poy' name='poy' value={poy} placeholder='Year' onChange={(e) => setPoy(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <button type='submit'>{editIndex === null ? 'Add' : 'Update'}</button>
                                <button onClick={() => setShowNewComponent(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}




