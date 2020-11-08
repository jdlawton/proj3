//When initially creating the Hardware page, I made the AddHardwareForm a separate component, and while it works, I ultimately
//decided I preferred to have the form included in the page and not on its own, so the Software and Service pages have it 
//that way instead of their own separate components.

import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_HARDWARE} from '../utils/queries';
import {Link} from 'react-router-dom';

//import any components used on this page
import AddHardwareForm from '../components/HardwareForm';

const Hardware = () => {

    //use useQuery hook to make a query request
    const {loading, data} = useQuery(ALL_HARDWARE);
    const hardware = data?.allHardware || [];
    //console.log(hardware);

    //state used to toggle whether or not the "Add Hardware" form is showing
    const [showForm, setShowForm] = useState(0);

    const toggleForm = () => {
        //console.log(showForm);
        if (showForm === 0){
            setShowForm(1);
        }
        else setShowForm(0);

    }
    
    return (
        <main>
            <p className="pagetitle">Hardware</p>
            <button className="addbtn" onClick={toggleForm}>Add Hardware</button>
            {showForm > 0 && <AddHardwareForm setShowForm={setShowForm} showForm={showForm} hardware={hardware}/>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="cardwrapper">
                    {hardware.map((element, index) => (
                        <div key={index} className="card">
                            <Link to={`/hardware/${element._id}`}>
                                <div className="cardheader">
                                    <h3>{element.hostname}</h3>
                                    <p>{element.role}</p>
                                </div>
                                <div className="cardbody">
                                    <p><span className="cardlabel">Address:</span><br></br>{element.address}</p>
                                    <p><span className="cardlabel">Description:</span><br></br>{element.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            
        </main>
    )
}


export default Hardware;