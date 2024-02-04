const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'username required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'password required'],
        minlength: [3,'too short password'],
    },
},{
    timestamps: true,
})

usersSchema.pre('save',function(next){
    this.password = bcryptjs.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model('User',usersSchema)