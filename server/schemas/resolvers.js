const {Hardware} = require('../models');

const resolvers = {
    Query: {
        //get all Hardware
        allHardware: async (parent, args) => {
            return Hardware.find()
                .select('-__v');
        },
        //get single Hardware by ID
        oneHardware: async (parent, args) => {
            return Hardware.findOne({_id: args.hardwareId})
                .select('-__v');
        }
    },
    Mutation: {
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
        }
    }
}

module.exports = resolvers;