import React, { useState } from 'react'
// import Sidebar from '../../Sidebar'
import './Education.css'
import { RiAddFill } from 'react-icons/ri';
import data from './Edata.json'

import ETable from './ETable';

// import Eform from './Eform'

export default function Education() {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false);

    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reason, setReason] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(`LeaveApp  ${leaveType}, ${fromDate}, ${toDate}, ${reason}, ${status}`);
    }
    const [showNewComponent, setShowNewComponent] = useState(false);

    const handleClick = () => {
        setShowNewComponent(true);
    }




    /// Eform details

    const [tableData, setTableData] = useState(data);

    const [school, setSchUni] = useState('');
    const [degree, setDegree] = useState('');
    const [grade, setGrade] = useState('');
    const [poy, setPoy] = useState('');


    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const handleSubmit1 = (e) => {
    //     e.preventDefault();
    //     const newData = { school, degree, grade, poy };
    //     setTableData([...tableData, newData]);
    //     console.log(`Education  ${school}, ${degree}, ${grade}, ${poy}`);

    //     // Store the new data in localStorage
    //     const storedData = JSON.parse(localStorage.getItem('educationData')) || [];
    //     storedData.push(newData);
    //     localStorage.setItem('educationData', JSON.stringify(storedData));

    //     // Clear input fields
    //     setSchUni('');
    //     setDegree('');
    //     setGrade('');
    //     setPoy('');
    // };


    return (
        <div className='eparent'>
            <div className='ebaby-left'>
                {/* <Sidebar /> */}
            </div>
            <div className='ebaby-right'>

                {!showNewComponent && (<>
                    {/* <div> */}
                    <div>
                        <h2>Employee Education Details

                        </h2>
                        {/* <button variant="primary" onClick={handleClick}><RiAddFill style={{ paddingRight: "0.3rem" }} />
                            Add
                        </button> */}
                    </div>
                    {/* </div> */}

                    <ETable />
                </>
                )}
            </div>
        </div>
    )
}

