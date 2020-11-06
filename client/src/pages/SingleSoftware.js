import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {ONE_SOFTWARE} from '../utils/queries';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_SOFTWARE, DELETE_SOFTWARE} from '../utils/mutations';

const SingleSoftware = () => {
    const {id: softwareId} = useParams();
    console.log(softwareId);
    const [showForm, setShowForm] = useState(0);
    const [name, setName] = useState('');
    const [installPoint, setInstallPoint] = useState('');
    const [licensing, setLicensing] = useState('');
    const [instructions, setInstructions] = useState('');
    const [notes, setNotes] = useState('');

    const [updateSoftware, {error}] = useMutation(UPDATE_SOFTWARE);
    const [deleteSoftware] = useMutation(DELETE_SOFTWARE);

    const {loading, data} = useQuery(ONE_SOFTWARE, {
        variables: {softwareId: softwareId}
    });

    const software = data?.oneSoftware || {};

    const handleChange = event => {

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
        console.log("softwareId: " + softwareId);
        console.log("name: " + name);
        console.log("installPoint: " + installPoint);
        console.log("licensing: " + licensing);
        console.log("instructions: " + instructions);
        console.log("notes: " + notes);

        try {
            await updateSoftware({
                variables: {softwareId, name, installPoint, licensing, instructions, notes}
            });
            setShowForm(0);
        } catch (e) {
            console.error(e);
        }
    };

    const removeSoftware = () => {
        try {
            deleteSoftware({
                variables: {softwareId}
            });
            window.location.href="/software";
        } catch (e) {
            console.error(e);
        }
    };

    const toggleForm = () => {
        if (showForm === 0) {
            setName(software.name);
            setInstallPoint(software.installPoint);
            setLicensing(software.licensing);
            setInstructions(software.instructions);
            setNotes(software.notes);
            setShowForm(1);
        }
        else setShowForm(0);
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="detailswrapper">
            <h1>Software Details</h1>
            <div className="details">
                <h2>{software.name}</h2>
                <div className="detailsbody">
                    <p><span className="cardlabel">Install Point: </span>{software.installPoint}</p>
                    <p><span className="cardlabel">Licensing: </span>{software.licensing}</p>
                    <p><span className="cardlabel">Instructions: </span>{software.instructions}</p>
                    <p><span className="cardlabel">Notes: </span><br></br>{software.notes}</p>
                </div>
            </div>

            <div classname="detailsbuttons">
                <button className="btn" onClick={toggleForm}>Edit</button>
                <button className="btn" onClick={removeSoftware}>Delete</button>
            </div>

            {showForm > 0 &&
                <form className="editform" onSubmit={handleFormSubmit}>
                    <div className="formitem">
                        <label htmlFor="name" className="formlabel">Name:</label><br></br>
                        <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="installPoint" className="formlabel">Install Point:</label><br></br>
                        <input type="text" id="installPoint" name="installPoint" value={installPoint} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="licensing" className="formlabel">Licensing:</label><br></br>
                        <input type="text" id="licensing" name="licensing" value={licensing} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="instructions" className="formlabel">Instructions:</label><br></br>
                        <input type="text" id="instructions" name="instructions" value={instructions} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="notes" className="formlabel">Notes:</label><br></br>
                        <textarea type="text" id="notes" name="notes" rows="10" cols="100" value={notes} onChange={handleChange}/>
                    </div> 
                    <button type="submit">Submit</button>
                </form>
            }
            {error && <div>Unable to update software...</div>}
        </div>

    )

}

export default SingleSoftware;