//import the gql tagged template function
const {gql} = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Hardware {
        _id: ID
        type: String
        hostname: String
        address: String
        mask: String
        gateway: String
        mac: String
        role: String
        description: String
        notes: String
    }

    type Software {
        _id: ID
        name: String
        installPoint: String
        licensing: String
        instructions: String
        notes: String
    }

    type Query {
        me: User
        allUser: [User]
        oneUser(userId: ID!): User
        allHardware: [Hardware]
        oneHardware(hardwareId: ID!): Hardware
        allSoftware: [Software]
        oneSoftware(softwareId: ID!): Software
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addHardware(type: String!, hostname: String!, address: String, mask: String, gateway: String, mac: String, role: String, description: String, notes: String): Hardware
        updateHardware(hardwareId: ID!, type: String, hostname: String, address: String, mask: String, gateway: String, mac: String, role: String, description: String, notes: String): Hardware
        deleteHardware(hardwareId: ID!): Hardware
        addSoftware(name: String!, installPoint: String, licensing: String, instructions: String, notes: String): Software
        updateSoftware(softwareId: ID!, name: String, installPoint: String, licensing: String, instructions: String, notes: String): Software
        deleteSoftware(softwareId: ID!): Software
    }

`;

//export the typeDefs
module.exports = typeDefs;  