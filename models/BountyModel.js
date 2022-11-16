const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bountySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    living: {
        type: Boolean,
        required: true
    },
    bountyAmount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["Sith", "Jedi"]
    }
})

module.exports = mongoose.model("Bounty", bountySchema)