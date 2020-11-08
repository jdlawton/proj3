const {Hardware, User, Software, Service} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        //get all Hardware
        allHardware: async (parent, args, context) => {
            if (context.user) {
                return Hardware.find()
                .select('-__v')
                .sort('type')
                .sort('role');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //get single Hardware by ID
        oneHardware: async (parent, args, context) => {
            if (context.user) {
                return Hardware.findOne({_id: args.hardwareId})
                    .select('-__v');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //get info of logged in user (not used in the app, more for testing authentication)
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v');
                return userData;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //gets list of all software in the database
        allSoftware: async (parent, args, context) => {
            if (context.user) {
                return Software.find()
                .select('-__v');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //gets one software by ID
        oneSoftware: async (parent, args, context) => {
            if (context.user) {
                return Software.findOne({_id: args.softwareId})
                    .select('-__v');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //gets a list of all users in the database (not used in the app)
        allUser: async (parent, args) => {
            return User.find()
                .select('-__v');
        },
        //gets one user by ID (not used in the app)
        oneUser: async (parent, args) => {
            return User.findOne({_id: args.userId})
                .select('-__v');
        },
        //get one services in the database by ID
        oneService: async (parent, args, context) => {
            if (context.user){
                return Service.findOne({_id: args.serviceId})
                    .select('-__v');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //get all services in the database
        allService: async (parent, args, context) => {
            if (context.user){
                return Service.find()
                    .select('-__v');
            }
            throw new AuthenticationError('You must be logged in to view this information.');
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
        addHardware: async (parent, args, context) => {
            if (context.user) {
                const hardware = await Hardware.create(args);
                return hardware;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //update existing hardware by ID
        updateHardware: async (parent, args, context) => {
            if (context.user) {
                const hardware = await Hardware.findOneAndUpdate({_id: args.hardwareId}, args, {new: true});
                return hardware;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //delete existing hardware by ID
        deleteHardware: async (parent, args, context) => {
            if (context.user) {
                const hardware = await Hardware.findOneAndDelete({_id: args.hardwareId});
                return hardware;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //add a software to the database
        addSoftware: async (parent, args, context) => {
            if (context.user) {
                const software = await Software.create(args);
                return software
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //update an existing software in the database
        updateSoftware: async (parent, args, context) => {
            if (context.user) {
                const software = await Software.findOneAndUpdate({_id: args.softwareId}, args, {new: true});
                return software;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //delete a software from the database
        deleteSoftware: async (parent, args, context) => {
            if (context.user) {
                const software = await Software.findOneAndDelete({_id: args.softwareId});
                return software;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //add a service to the database
        addService: async (parent, args, context) => {
            if (context.user) {
                const service = await Service.create(args);
                return service;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //update an existing service in the database
        updateService: async (parent, args, context) => {
            if (context.user){
                const service = await Service.findOneAndUpdate({_id: args.serviceId}, args, {new: true});
                return service;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        //delete an existing service from the database
        deleteService: async (parent, args, context) => {
            if (context.user) {
                const service = await Service.findOneAndDelete({_id: args.serviceId});
                return service;
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        }
    }
}

module.exports = resolvers;