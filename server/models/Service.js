//Services would denote any sort of 3rd party service or contact that you would want to keep track of, i.e. Cloud Services, Support contacts for vendors, ISPs, etc.

const {Schema, model} = require ('mongoose');

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Please enter a valid email address.'],
            trim: true
        },
        portal: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        }
    }
);

const Service = model('Service', serviceSchema);

module.exports = Service;