import gql from 'graphql-tag';

export const ALL_HARDWARE = gql `
    query allHardware {
        allHardware {
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

export const ONE_HARDWARE = gql `
    query oneHardware ($hardwareId: ID!){
        oneHardware (hardwareId: $hardwareId) {
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

export const ALL_SOFTWARE = gql `
    query allSoftware {
        allSoftware {
            _id
            name
            installPoint
            licensing
            instructions
            notes
        }
    }
`;