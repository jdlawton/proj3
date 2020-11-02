import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {ONE_HARDWARE} from '../utils/queries';

const SingleHardware = () => {
    const {id: hardwareId} = useParams();
    //console.log(hardwareId);
    //console.log(typeof hardwareId);

    const {loading, data} = useQuery(ONE_HARDWARE, {
        variables: {hardwareId: hardwareId}
    });

    const hardware = data?.oneHardware || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Single Hardware Page</h1>
            <p>{hardware.type}</p>
            <p>{hardware.hostname}</p>
            <p>{hardware.address}</p>
            <p>{hardware.role}</p>
            <p>{hardware.notes}</p>
        </div>

    )
}

export default SingleHardware;