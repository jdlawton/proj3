import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_SOFTWARE} from '../utils/queries';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {ADD_SOFTWARE} from '../utils/mutations';

//import any components used on this page

const Software = () => {

    const [showForm, setShowForm] = useState(0);
    const [name, setName] = useState('');
    const [installPoint, setInstallPoint] = useState('');
    const [licensing, setLicensing] = useState('');
    const [instructions, setInstructions] = useState('');
    const [notes, setNotes] = useState('');

    const [addSoftware, {error}] = useMutation(ADD_SOFTWARE);


    //use useQuery to make a query request
    const {loading, data} = useQuery(ALL_SOFTWARE);
    const software = data?.allSoftware || [];
    //console.log(software);

    const handleChange = event => {
        //console.log(event);
        //console.log(event.target.name);

        if (event.target.name === 'name') {
            setName(event.target.value);
        }

        if (event.target.name === 'installPoint') {
            setInstallPoint(event.target.value);
        }

        if (event.target.name === 'licensing') {
            setLicensing(event.target.value);
        }

        if (event.target.name === 'instructions') {
            setInstructions(event.target.value);
        }

        if (event.target.name === 'notes'){
            setNotes(event.target.value);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log("name: " + name);
        console.log("installPoint: " + installPoint);
        console.log("licensing: " + licensing);
        console.log("instructions: " + instructions);
        console.log("notes: " + notes);

        try {
            //add new software to the database
            await addSoftware({
                variables: {name, installPoint, licensing, instructions, notes}
            });

            //clear form values
            setName('');
            setInstallPoint('');
            setLicensing('');
            setInstructions('');
            setNotes('');
            setShowForm(0);
            window.location.href="/software";
            
        } catch (e) {
            console.error(e);
        }
    };

    const toggleForm = () => {
        //console.log(showForm);
        if (showForm === 0){
            setShowForm(1);
        }
        else setShowForm(0);
    }

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <main>
            <p className="pagetitle">Software</p>
            <button className="addbtn" onClick={toggleForm}>Add Software</button>
            {showForm > 0 && 
                <form className="addform" onSubmit={handleFormSubmit}>
                    <div className="formitem">
                        <label htmlFor="name" className="formlabel">Name: </label><br></br>
                        <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="installPoint" className="formlabel">Install Point: </label><br></br>
                        <input type="text" id="installPoint" name="installPoint" value={installPoint} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="licensing" className="formlabel">Licensing: </label><br></br>
                        <input type="text" id="licensing" name="licensing" value={licensing} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="instructions" className="formlabel">Instructions: </label><br></br>
                        <input type="text" id="instructions" name="instructions" value={instructions} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="notes" className="formlabel">Notes: </label><br></br>
                        <textarea type="text" id="notes" name="notes" rows="10" cols="100" value={notes} onChange={handleChange}/>
                    </div> 
                    <button type="submit">Submit</button>
                </form>
            }
            {error && <div>Unable to add software to database...</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="cardwrapper">
                    {software.map((element, index) => (
                        <div key={index} className="card">
                            <Link to={`/software/${element._id}`}>
                                <div className="cardheader">
                                    <h3>{element.name}</h3>
                                    <p>{element.installPoint}</p>
                                </div>
                                <div className="cardbody">
                                    <p><span className="cardlabel">Licensing:</span><br></br>{element.licensing}</p>
                                    <p><span className="cardlabel">Instructions:</span><br></br>{element.instructions}</p>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}


export default Software;