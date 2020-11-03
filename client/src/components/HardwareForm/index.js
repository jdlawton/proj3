import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {ADD_HARDWARE} from '../../utils/mutations';
//import {ALL_HARDWARE} from '../../utils/queries';


const AddHeaderForm = ({setShowForm, showForm, hardware}) => {

    const [type, setType] = useState('server');
    const [hostname, setHostname] = useState('');
    const [address, setAddress] = useState('');
    const [mask, setMask] = useState('');
    const [gateway, setGateway] = useState('');
    const [mac, setMac] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    const [addHardware, {error}] = useMutation(ADD_HARDWARE);


    const handleChange = event => {
        //console.log(event);
        //console.log(event.target.name);

        if (event.target.name === 'type') {
            setType(event.target.value);
        }

        if (event.target.name === 'hostname') {
            setHostname(event.target.value);
        }

        if (event.target.name === 'address') {
            setAddress(event.target.value);
        }

        if (event.target.name === 'mask') {
            setMask(event.target.value);
        }

        if (event.target.name === 'gateway') {
            setGateway(event.target.value);
        }

        if (event.target.name === 'mac') {
            setMac(event.target.value);
        }

        if (event.target.name === 'role') {
            setRole(event.target.value);
        }

        if (event.target.name === 'description') {
            setDescription(event.target.value);
        }

        if (event.target.name === 'notes') {
            setNotes(event.target.value);
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
                variables: {type, hostname, address, mask, gateway, mac, role, description, notes}
            });
            window.location.href="/hardware";

            //clear form values
            setType('server');
            setHostname('');
            setAddress('');
            setMask('');
            setGateway('');
            setMac('');
            setRole('');
            setDescription('');
            setNotes('');
            //console.log("showForm: " + showForm);
            setShowForm(0);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="addhardwareform">
            <form onSubmit={handleFormSubmit}>
                <div className="formitem">
                    <label htmlFor="type" className="formlabel">Device Type:</label><br></br>
                    <select id="type" name="type" value={type} onChange={handleChange}>
                        <option value="server">Server</option>
                        <option value="switch">Switch</option>
                        <option value="firewall">Firewall</option>
                        <option value="printer">Printer</option>
                    </select>
                </div>
                
                <div className="formitem">
                    <label htmlFor="hostname" className="formlabel">Hostname:</label><br></br>
                    <input type="text" id="hostname" name="hostname" value={hostname} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="address" className="formlabel">Address:</label><br></br>
                    <input type="text" id="address" name="address" value={address} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="mask" className="formlabel">Mask:</label><br></br>
                    <input type="text" id="mask" name="mask" value={mask} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="gateway" className="formlabel">Gateway:</label><br></br>
                    <input type="text" id="gateway" name="gateway" value={gateway} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="mac" className="formlabel">MAC Address:</label><br></br>
                    <input type="text" id="mac" name="mac" value={mac} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="role" className="formlabel">Role:</label><br></br>
                    <input type="text" id="role" name="role" value={role} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="description" className="formlabel">Description:</label><br></br>
                    <input type="text" id="description" name="description" value={description} onChange={handleChange}/>
                </div>

                <div className="formitem">
                    <label htmlFor="notes" className="formlabel">Notes:</label><br></br>
                    <textarea type="text" id="notes" name="notes" rows="10" cols="100" value={notes} onChange={handleChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    );
}

export default AddHeaderForm;