import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {ADD_HARDWARE} from '../../utils/mutations';
//import {ALL_HARDWARE} from '../../utils/queries';


const AddHeaderForm = ({setShowForm, showForm, hardware}) => {

    const [hostname, setHostname] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState('server');
    const [addHardware, {error}] = useMutation(ADD_HARDWARE);


    const handleChange = event => {
        //console.log(event);
        //console.log(event.target.name);

        if (event.target.name === 'hostname') {
            setHostname(event.target.value);
        }

        if (event.target.name === 'address') {
            setAddress(event.target.value);
        }

        if (event.target.name === 'role') {
            setRole(event.target.value);
        }

        if (event.target.name === 'notes') {
            setNotes(event.target.value);
        }

        if (event.target.name === 'type') {
            setType(event.target.value);
        }

        console.log(error);
        //setAddress(event.target.value);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        //console.log("type: " + type);
        //console.log("hostname: " + hostname);
        //console.log("address: " + address);
        //console.log("role: " + role);
        //console.log("notes: " + notes);

        try{
            //add new hardware to database
            await addHardware({
                variables: {type, hostname, address, role, notes}
            });
            window.location.href="/hardware";

            //clear form values
            setType('server');
            setHostname('');
            setAddress('');
            setRole('');
            setNotes('');
            //console.log("showForm: " + showForm);
            setShowForm(0);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="type">Device Type:</label>
            <select id="type" name="type" value={type} onChange={handleChange}>
                <option value="server">Server</option>
                <option value="switch">Switch</option>
                <option value="firewall">Firewall</option>
                <option value="printer">Printer</option>
            </select>
            <label htmlFor="hostname">Hostname:</label>
            <input type="text" id="hostname" name="hostname" value={hostname} onChange={handleChange}/>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={address} onChange={handleChange}/>
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" value={role} onChange={handleChange}/>
            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" name="notes" value={notes} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddHeaderForm;