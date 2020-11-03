import gql from 'graphql-tag';

export const ADD_HARDWARE = gql `
    mutation addHardware($type: String!, $hostname: String!, $address: String, $mask: String, $gateway: String, $mac: String, $role: String, $description: String, $notes: String){
        addHardware(type: $type, hostname: $hostname, address: $address, mask: $mask, gateway: $gateway, mac: $mac, role: $role, description: $description, notes: $notes){
            _id
            type
            hostname
            address
            mask
            gateway
            mac
            role
            description
            notes
        }
    }
`;

export const UPDATE_HARDWARE = gql`
    mutation updateHardware($hardwareId: ID!, $type: String!, $hostname: String!, $address: String, $mask: String, $gateway: String, $mac: String, $role: String, $description: String, $notes: String){
        updateHardware(hardwareId: $hardwareId, type: $type, hostname: $hostname, address: $address, mask: $mask, gateway: $gateway, mac: $mac, role: $role, description: $description, notes: $notes) {
            _id
            type
            hostname
            address
            mask
            gateway
            mac
            role
            description
            notes
        }
    }
`;

export const DELETE_HARDWARE = gql`
    mutation deleteHardware ($hardwareId: ID!){
        deleteHardware(hardwareId: $hardwareId) {
            _id
            type
            hostname
            address
            mask
            gateway
            mac
            role
            description
            notes
        }
    }
`;