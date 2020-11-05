const {Schema, model} = require ('mongoose');

const softwareSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        installPoint: {
            type: String,
            trim: true
        },
        licensing: {
            type: String,
            trim: true
        },
        instructions: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        }
    }
);

const Software = model('Software', softwareSchema);

module.exports = Software;