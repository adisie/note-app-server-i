const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    note: {
        type: String,
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Note',notesSchema)