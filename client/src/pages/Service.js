import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_SERVICE} from '../utils/queries';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import {ADD_SERVICE} from '../utils/mutations';


//import any components used on this page

const Service = () => {
    const [showForm, setShowForm] = useState(0);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [portal, setPortal] = useState('');
    const [notes, setNotes] = useState('');

    const [addService, {error}] = useMutation(ADD_SERVICE);


    //use useQuery to make a query request
    const {loading, data} = useQuery(ALL_SERVICE);
    const service = data?.allService || [];
    //console.log(service);

    const handleChange = event => {
        //console.log(event);
        //console.log(event.target.name);

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
        console.log("name: " + name);
        console.log("role: " + role);
        console.log("phone: " + phone);
        console.log("email: " + email);
        console.log("portal: " + portal);
        console.log("notes: " + notes);

        try {
            //add new service to the database
            await addService({
                variables: {name, role, phone, email, portal, notes}
            });

            //clear form values
            setName('');
            setRole('');
            setPhone('');
            setEmail('');
            setPortal('');
            setNotes('');
            setShowForm(0);
            window.location.href="/service";
            
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
            <h1>Services</h1>
            <button onClick={toggleForm}>Add Service</button>
            {showForm > 0 && 
                <form className="addform" onSubmit={handleFormSubmit}>
                    <div className="formitem">
                        <label htmlFor="name" className="formlabel">Name:</label><br></br>
                        <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="role" className="formlabel">Role: </label><br></br>
                        <input type="text" id="role" name="role" value={role} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="phone" className="formlabel">Phone: </label><br></br>
                        <input type="text" id="phone" name="phone" value={phone} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="email" className="formlabel">Email: </label><br></br>
                        <input type="text" id="email" name="email" value={email} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="portal" className="formlabel">Portal: </label><br></br>
                        <input type="text" id="portal" name="portal" value={portal} onChange={handleChange}/>
                    </div>
                    <div className="formitem">
                        <label htmlFor="notes" className="formlabel">Notes: </label><br></br>
                        <textarea type="text" id="notes" name="notes" rows="10" cols="100" value={notes} onChange={handleChange}/>
                    </div> 
                    <button type="submit">Submit</button>
                </form>
            }
            {error && <div>Unable to add service to database...</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="cardwrapper">
                    {service.map((element, index) => (
                        <div key={index} className="card">
                            <Link to={`/service/${element._id}`}>
                                <div className="cardheader">
                                    <h3>{element.name}</h3>
                                    <p>{element.role}</p>
                                </div>
                                <div className="cardbody">
                                    <p><span className="cardlabel">Phone:</span><br></br>{element.phone}</p>
                                    <p><span className="cardlabel">Email:</span><br></br>{element.email}</p>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}


export default Service;