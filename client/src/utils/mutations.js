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

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_SOFTWARE = gql`
    mutation addSoftware($name: String!, $installPoint: String, $licensing: String, $instructions: String, $notes: String){
        addSoftware(name: $name, installPoint: $installPoint, licensing: $licensing, instructions: $instructions, notes: $notes){
            _id
            name
            installPoint
            licensing
            instructions
            notes
        }
    }
`;

export const UPDATE_SOFTWARE = gql`
    mutation updateSoftware ($softwareId: ID!, $name: String, $installPoint: String, $licensing: String, $instructions: String, $notes: String){
        updateSoftware (softwareId: $softwareId, name: $name, installPoint: $installPoint, licensing: $licensing, instructions: $instructions, notes: $notes){
            _id
            name
            installPoint
            licensing
            instructions
            notes
        }
    }
`;

export const DELETE_SOFTWARE = gql`
    mutation deleteSoftware ($softwareId: ID!){
        deleteSoftware (softwareId: $softwareId) {
            _id
            name
            installPoint
            licensing
            instructions
            notes
        }
    }
`;
