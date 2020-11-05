import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {ONE_SERVICE} from '../utils/queries';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_SERVICE, DELETE_SERVICE} from '../utils/mutations';

const SingleService = () => {
    const {id: serviceId} = useParams();
    console.log(serviceId);
    const [showForm, setShowForm] = useState(0);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [portal, setPortal] = useState('');
    const [notes, setNotes] = useState('');

    const [updateService, {error}] = useMutation(UPDATE_SERVICE);
    const [deleteService] = useMutation(DELETE_SERVICE);

    const {loading, data} = useQuery(ONE_SERVICE, {
        variables: {serviceId: serviceId}
    });

    const service = data?.oneService || {};

    const handleChange = event => {

        if (event.target.name === 'name') {
            setName(event.target.value);
        }

        if (event.target.name === 'role') {
            setRole(event.target.value);
        }

        if (event.target.name === 'phone') {
            setPhone(event.target.value);
        }

        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }

        if (event.target.name === 'portal') {
            setPortal(event.target.value);
        }

        if (event.target.name === 'notes'){
            setNotes(event.target.value);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log("serviceId: " + serviceId);
        console.log("name: " + name);
        console.log("role: " + role);
        console.log("phone: " + phone);
        console.log("email: " + email);
        console.log("portal: " + portal);
        console.log("notes: " + notes);

        try {
            await updateService({
                variables: {serviceId, name, role, phone, email, portal, notes}
            });
            setShowForm(0);
        } catch (e) {
            console.error(e);
        }
    };

    const removeService = () => {
        try {
            deleteService({
                variables: {serviceId}
            });
            window.location.href="/service";
        } catch (e) {
            console.error(e);
        }
    };

    const toggleForm = () => {
        if (showForm === 0) {
            setName(service.name);
            setRole(service.role);
            setPhone(service.phone);
            setEmail(service.email);
            setPortal(service.portal);
            setNotes(service.notes);
            setShowForm(1);
        }
        else setShowForm(0);
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="detailswrapper">
            <h1>Service Details</h1>
            <div className="details">
                <h2>{service.name}</h2>
                <div className="detailsbody">
                    <p><span className="cardlabel">Role: </span>{service.role}</p>
                    <p><span className="cardlabel">Phone: </span>{service.phone}</p>
                    <p><span className="cardlabel">Email: </span>{service.email}</p>
                    <p><span className="cardlabel">Portal: </span>{service.portal}</p>
                    <p><span className="cardlabel">Notes: </span>{service.notes}</p>
                </div>
            </div>

            <div classname="detailsbuttons">
                <button className="btn" onClick={toggleForm}>Edit</button>
                <button className="btn" onClick={removeService}>Delete</button>
            </div>

            {showForm > 0 &&
                <form className="editform" onSubmit={handleFormSubmit}>
                    <div className="formitem">
                        <label htmlFor="name" className="formlabel">Name:</label><br></br>
                        <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="role" className="formlabel">Role:</label><br></br>
                        <input type="text" id="role" name="role" value={role} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="phone" className="formlabel">Phone:</label><br></br>
                        <input type="text" id="phone" name="phone" value={phone} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="email" className="formlabel">Email:</label><br></br>
                        <input type="text" id="email" name="email" value={email} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="portal" className="formlabel">Portal:</label><br></br>
                        <input type="text" id="portal" name="portal" value={portal} onChange={handleChange}/>
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

export default SingleService;