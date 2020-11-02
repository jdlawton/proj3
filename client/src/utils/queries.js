import gql from 'graphql-tag';

export const ALL_HARDWARE = gql `
    query allHardware {
        allHardware{
            _id
            type
            hostname
            address
            role
            notes
        }
    }
`;

export const ONE_HARDWARE = gql `
    query oneHardware ($hardwareId: ID!){
        oneHardware (hardwareId: $hardwareId) {
            _id
            type
            hostname
            address
            role
            notes
        }
    }
`;