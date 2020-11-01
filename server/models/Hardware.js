const {Schema, model} = require ('mongoose');

const hardwareSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true
        },
        hostname: {
            type: String,
            required: true,
            trim: true

        },
        address: {
            type: String,
            trim: true

        },
        role: {
            type: String,
            trim: true

        },
        notes: {
            type: String,
            trim: true

        }
    }
);

const Hardware = model('Hardware', hardwareSchema);

module.exports = Hardware;