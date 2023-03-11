import React, { useState, useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

export default function WTable() {
    const [wtableData, setWTableData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const [editWorkIndex, setEditWorkIndex] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [designation, setDesignation] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('workExperienceData')) || [];
        setWTableData(storedData);
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        let id = Math.random().toString(16).slice(2);
        const newData = { id, companyName, designation, fromDate, toDate };
        if (editWorkIndex === null) {
            setWTableData([...wtableData, newData]);
        } else {
            const updatedData = [...wtableData];
            updatedData[editWorkIndex] = newData;
            setWTableData(updatedData);
            setEditWorkIndex(null);
        }
        const storedData = JSON.parse(localStorage.getItem('workExperienceData')) || [];
        const updatedStoredData = editWorkIndex === null
            ? [...storedData, newData]
            : storedData.map((d, i) => i === editWorkIndex ? newData : d);
        localStorage.setItem('workExperienceData', JSON.stringify(updatedStoredData));
        setCompanyName('');
        setDesignation('');
        setFromDate('');
        setToDate('');
    };

    const editTableRow = (index) => {
        setEditWorkIndex(index);
        setShowNewComponent(true);
        setCompanyName(wtableData[index].companyName);
        setDesignation(wtableData[index].designation);
        setFromDate(wtableData[index].fromDate);
        setToDate(wtableData[index].toDate);
    };

    const deleteTableRow = (id) => {
        // 10
        const updatedData = wtableData.filter(d => d.id !== id);
        setWTableData(updatedData);
        localStorage.setItem('workExperienceData', JSON.stringify(updatedData));
    };

    return (
        <div>
            {!showNewComponent && (
                <div className='wadd-button'>
                    <button onClick={() => setShowNewComponent(true)}>Add Details</button>
                </div>
            )}
            {!showNewComponent && (
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Designation</th>
                            <th>FromDate</th>
                            <th>ToDate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wtableData.map((record, index) => {
                            return (
                                <tr className='box' key={record.id}>
                                    <td>{record.companyName}</td>
                                    <td>{record.designation}</td>
                                    <td>{record.fromDate}</td>
                                    <td>{record.toDate}</td>
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
                        <h2>{editWorkIndex === null ? 'Add WorkExperience Details' : 'Edit WorkExperience Details'}</h2>
                    </div>
                    <div className='form-detail'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='companyName'>Company Name </label>
                                <input type='text' id='companyName' name='companyName' value={companyName} placeholder='CompanyName' onChange={(e) => setCompanyName(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='designation'>Designation</label>
                                <input type='text' id='designation' name='designation' value={designation} placeholder='Designation' onChange={(e) => setDesignation(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='fromDate'>FromDate</label>
                                <input type='date' id='fromDate' name='fromDate' value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='toDate'>ToDate</label>
                                <input type='date' id='toDate' name='toDate' value={toDate} onChange={(e) => setToDate(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <button type='submit'>{editWorkIndex === null ? 'Add' : 'Update'}</button>
                                <button onClick={() => setShowNewComponent(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}




