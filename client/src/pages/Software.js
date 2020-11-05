import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_SOFTWARE} from '../utils/queries';
import {Link} from 'react-router-dom';

//import any components used on this page

const Software = () => {

    //use useQuery to make a query request
    const {loading, data} = useQuery(ALL_SOFTWARE);
    const software = data?.allSoftware || [];
    //console.log(software);

    //const [showForm, setShowForm] = useState(0);

    /*
    const toggleForm = () => {
        //console.log(showForm);
        if (showForm === 0){
            setShowForm(1);
        }
        else setShowForm(0);
    }
    */
    
    return (
        <main>
            <h1>Software</h1>
            {/*<button onClick={toggleForm}>Add Software</button>*/}
            {/*showForm > 0 && <AddSoftwareForm setShowForm={setShowForm} showForm={showForm} software={software}/>*/}
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