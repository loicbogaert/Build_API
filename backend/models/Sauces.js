const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    manufacturer : { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    description : { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    mainPepper : { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    heat : { type : Number, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    imageUrl : { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    userId : { type : String, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    likes : { type : Number, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    dislikes : { type : Number, required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    usersLiked : { type : [String], required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/},
    usersDisliked : { type : [String], required: true, validate : /^(?=.*[A-Za-z1-9])[^\/){}\]\]$\\"'!=;,:§]{2,}/}
});

module.exports = mongoose.model('ListOfSauces', sauceSchema);
