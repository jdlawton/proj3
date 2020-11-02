import gql from 'graphql-tag';

export const ADD_HARDWARE = gql `
    mutation addHardware($type: String!, $hostname: String!, $address: String, $role: String!, $notes: String){
        addHardware(type: $type, hostname: $hostname, address: $address, role: $role, notes: $notes){
            _id
            type
            hostname
            address
            role
            notes
        }
    }
`;