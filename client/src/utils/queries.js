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