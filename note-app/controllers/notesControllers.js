// models
const Note = require('../models/notesModel')

// all post
const allPosts = async (req,res) => {
    try{
        const notes = await Note.find().select({
            _id: 1,
            authorId: 1,
            note: 1,
            createdAt: 1
        })
        res.status(200).json({notes})
    }catch(err){
        res.status(400).json({
            error: 'get all notes error'
        })
    }
}

// new post
const newPost = async (req,res) => {
    try{
        const authorId = req.user._id 
        const {note} = req.body 
        const newNote = await Note.create({authorId,note})
        res.status(200).json({
            note: {
                _id: newNote._id,
                authorId: newNote.authorId,
                note: newNote.note,
                createdAt: newNote.createdAt,
            }
        })
    }catch(err){
        res.status(400).json({
            error: 'add new note error'
        })
    }
}

// delete post
const deletePost = async (req,res) => {
    try{
        const {_id} = req.params 
        const note = await Note.findById(_id) 
        if(!note){
            return res.status(400).json({
                error: 'note not found'
            })
        }
        if(note.authorId.toString() !== req.user._id.toString()){
            return res.status(401).json({
                error: 'unauthorized to delete'
            })
        }
        await note.deleteOne()
        res.status(200).json({
            _id,
            message: 'note deleted'
        })
    }catch(err){
        res.status(400).json({
            error: 'delete note error'
        })
    }
}

module.exports = {
    allPosts,
    newPost,
    deletePost,
}