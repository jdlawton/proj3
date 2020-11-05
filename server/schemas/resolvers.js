const {Hardware, User, Software} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        //get all Hardware
        allHardware: async (parent, args) => {
            return Hardware.find()
                .select('-__v')
                .sort('type')
                .sort('role');
        },
        //get single Hardware by ID
        oneHardware: async (parent, args) => {
            return Hardware.findOne({_id: args.hardwareId})
                .select('-__v');
        },
        //get info of logged in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        allSoftware: async (parent, args, context) => {
            if (context.user) {
                return Software.find()
                .select('-__v');
            }
            throw new AuthenticationError('Not logged in');
        },
        allUser: async (parent, args) => {
            return User.find()
                .select('-__v');
        },
        oneUser: async (parent, args) => {
            return User.findOne({_id: args.userId})
                .select('-__v');
        },
    },
    Mutation: {
        //create a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        //login an existing user
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        },
        //add new hardware
        addHardware: async (parent, args) => {
            const hardware = await Hardware.create(args);
            return hardware;
        },
        //update existing hardware by ID
        updateHardware: async (parent, args) => {
            const hardware = await Hardware.findOneAndUpdate({_id: args.hardwareId}, args, {new: true});
            return hardware;
        },
        //delete existing hardware by ID
        deleteHardware: async (parent, args) => {
            const hardware = await Hardware.findOneAndDelete({_id: args.hardwareId});
            return hardware;
        },
        //add a software to the database
        addSoftware: async (parent, args, context) => {
            //if (context.user) {
                const software = await Software.create(args);
                return software
            //}
            //throw new AuthenticationError('Not logged in');
        },
    }
}

module.exports = resolvers;