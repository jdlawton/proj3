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
        console.log(hardwareId);
        console.log("type: " + type);
        console.log("hostname: " + hostname);
        console.log("address: " + address);
        console.log("mask: " + mask);
        console.log("gateway: " + gateway);
        console.log("MAC: " + mac);
        console.log("role: " + role);
        console.log("description: " + description);
        console.log("notes: " + notes);

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
        <div>
            <h1>Single Hardware Page</h1>
            <p>{hardware.type}</p>
            <p>{hardware.hostname}</p>
            <p>{hardware.address}</p>
            <p>{hardware.mask}</p>
            <p>{hardware.gateway}</p>
            <p>{hardware.mac}</p>
            <p>{hardware.role}</p>
            <p>{hardware.description}</p>
            <p>{hardware.notes}</p>
            <button onClick={toggleForm}>Edit</button>
            <button onClick={removeHardware}>Delete</button>
            {showForm > 0 && 
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

                    <label htmlFor="mask">Mask:</label>
                    <input type="text" id="mask" name="mask" value={mask} onChange={handleChange}/>

                    <label htmlFor="gateway">Gateway:</label>
                    <input type="text" id="gateway" name="gateway" value={gateway} onChange={handleChange}/>

                    <label htmlFor="mac">MAC Address:</label>
                    <input type="text" id="mac" name="mac" value={mac} onChange={handleChange}/>

                    <label htmlFor="role">Role:</label>
                    <input type="text" id="role" name="role" value={role} onChange={handleChange}/>

                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={description} onChange={handleChange}/>

                    <label htmlFor="notes">Notes:</label>
                    <textarea type="text" id="notes" name="notes" value={notes} onChange={handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleHardware;