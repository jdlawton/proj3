//import the gql tagged template function
const {gql} = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`
    type Hardware {
        _id: ID
        type: String
        hostname: String
        address: String
        role: String
        notes: String
    }

    type Query {
        allHardware: [Hardware]
        oneHardware(hardwareId: ID!): Hardware
    }

    type Mutation {
        addHardware(type: String!, hostname: String!, address: String, role: String, notes: String): Hardware
        updateHardware(hardwareId: ID!, type: String, hostname: String, address: String, role: String, notes: String): Hardware
        deleteHardware(hardwareId: ID!): Hardware
    }

`;

//export the typeDefs
module.exports = typeDefs;  