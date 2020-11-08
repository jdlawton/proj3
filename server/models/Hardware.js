//Model for Hardware type objects. Currently, the application tracks four types of hardware, server, switch, firewall, and printer. These are denoted by the 'type'
//property and this list is something that will be expanded on as the application grows. The Hardware 'type' is determined by a dropdown menu on the Add Hardware form.

const {Schema, model} = require ('mongoose');

const hardwareSchema = new Schema(
    {
        //Not displayed in the app, used for sorting and as a way to maintain the types of equipment the application can work with.
        type: {
            type: String,
            required: true,
            trim: true
        },
        hostname: {
            type: String,
            required: true,
            unique: true,
            trim: true

        },
        address: {
            type: String,
            unique: true,
            trim: true
        },
        mask: {
            type: String,
            trim: true
        },
        gateway: {
            type: String,
            trim: true
        },
        mac: {
            type: String,
            trim: true
        },
        //Primarily for servers, denotes what role the server has, i.e. Print Server, File Server, etc.
        role: {
            type: String,
            trim: true

        },
        //Just a brief description of what the hardware is or does
        description: {
            type: String,
            trim: true
        },
        //A catch-all field for any other important information that someone would need to know about this hardware. Basically allows you to 
        //note information without there needing multiple input fields.
        notes: {
            type: String,
            trim: true

        }
    }
);

const Hardware = model('Hardware', hardwareSchema);

module.exports = Hardware;