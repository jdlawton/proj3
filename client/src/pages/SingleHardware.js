import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {ONE_HARDWARE} from '../utils/queries';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_HARDWARE, DELETE_HARDWARE} from '../utils/mutations';

const SingleHardware = () => {
    const {id: hardwareId} = useParams();
    //console.log(hardwareId);
    //console.log(typeof hardwareId);
    const [showForm, setShowForm] = useState(0);
    const [hostname, setHostname] = useState('');
    const [address, setAddress] = useState('');
    const [mask, setMask] = useState('');
    const [gateway, setGateway] = useState('');
    const [mac, setMac] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState('server');
    const [updateHardware, {error}] = useMutation(UPDATE_HARDWARE);
    const [deleteHardware] = useMutation(DELETE_HARDWARE);

    const {loading, data} = useQuery(ONE_HARDWARE, {
        variables: {hardwareId: hardwareId}
    });

    const hardware = data?.oneHardware || {};

    const handleChange = event => {

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
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        // console.log(hardwareId);
        // console.log("type: " + type);
        // console.log("hostname: " + hostname);
        // console.log("address: " + address);
        // console.log("mask: " + mask);
        // console.log("gateway: " + gateway);
        // console.log("MAC: " + mac);
        // console.log("role: " + role);
        // console.log("description: " + description);
        // console.log("notes: " + notes);

        try{
            await updateHardware({
                variables: {hardwareId, type, hostname, address, mask, gateway, mac, role, description, notes}
            });

            setShowForm(0)
        } catch (e) {
            console.error(e);
        }
    };

    const removeHardware = () => {
        console.log("Inside Delete");
        try{
            deleteHardware({
                variables: {hardwareId}
            });
            window.location.href="/hardware";
        } catch (e) {
            console.error(e);
        }
    }

    const toggleForm = () => {
        if (showForm === 0) {
            setType(hardware.type);
            setHostname(hardware.hostname);
            setAddress(hardware.address);
            setMask(hardware.mask);
            setGateway(hardware.gateway);
            setMac(hardware.mac);
            setRole(hardware.role);
            setDescription(hardware.description);
            setNotes(hardware.notes);
            setShowForm(1);
        }
        else setShowForm(0);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="detailswrapper">
            <h1>Details</h1>
            <div className="details">
                <h2>{hardware.hostname}</h2>
                <div className="detailsbody">
                    <p><span className="cardlabel">Role: </span>{hardware.role}</p>
                    <p><span className="cardlabel">Address: </span>{hardware.address}</p>
                    <p><span className="cardlabel">Netmask: </span>{hardware.mask}</p>
                    <p><span className="cardlabel">Gateway: </span>{hardware.gateway}</p>
                    <p><span className="cardlabel">MAC Address: </span>{hardware.mac}</p>
                    <p><span className="cardlabel">Description: </span>{hardware.description}</p>
                    <p><span className="cardlabel">Notes: </span><br></br>{hardware.notes}</p>
                </div>
            </div>

            <div classname="detailsbuttons">
                <button className="btn" onClick={toggleForm}>Edit</button>
                <button className="btn" onClick={removeHardware}>Delete</button>
            </div>
            
            {showForm > 0 && 
                <form className="hardwareeditform" onSubmit={handleFormSubmit}>
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
            }
        </div>
    )
}

export default SingleHardware;