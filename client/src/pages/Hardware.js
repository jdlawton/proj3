import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {ALL_HARDWARE} from '../utils/queries';
//import any components used on this page

const Hardware = () => {

    //use useQuery hook to make a query request
    const {loading, data} = useQuery(ALL_HARDWARE);
    const hardware = data?.allHardware || [];
    //console.log(hardware);

    /*const hardware = [
        {
            hostname: "server01",
            address: "192.168.100.100",
            role: "DC",
            notes: "DC for contoso.com domain"
        },
        {
            hostname: "server02",
            address: "192.168.100.101",
            role: "Mail Server",
            notes: "Mail server for contoso.com domain"
        },
    ];
    */

    
    return (
        <main>
            <h1>Hardware Page</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="hardware">
                    {hardware.map((element, index) => (
                        <div key={index}>
                            <h3>{element.hostname}</h3>
                            <p>{element.address}</p>
                            <p>{element.role}</p>
                            <p>Notes:</p>
                            <p>{element.notes}</p>
                        </div>
                    ))}
                </div>
            )}
            
        </main>
    )
}


export default Hardware;