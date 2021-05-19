const User = require('../models/User');
const bcrypt = require('bcrypt');
const Sauce = require('../models/Sauces');
const fs = require('fs');

class Database{
    constructor(){
        this.signingUp();
        this.logingIn();
        this.saucesArray();
        this.saucesUnique();
        this.addSauce();
        this.modifySauce();
        this.deleteSauce();
    }


    signingUp(){
        exports.signup = (req, res, next) => {
            bcrypt.hash(req.body.password, 10) 
            .then(hash =>{
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        };
    };
    
    logingIn(){
        exports.login = (req, res , next) => {
            User.findOne({ email: req.body.email })
             .then(user =>{
                 if(!user) {
                     return res.status(401).json({ error : 'Utilisateur non trouvé !'})
                 }
                 bcrypt.compare(req.body.password, user.password)
                 .then(valid =>{
                     if(!valid) {
                        return res.status(401).json({ error : 'Mot de passe incorrect !'})
                     }
                     res.status(200).json({
                         userId: user.id,
                         token: 'TOKEN'
                     });
                 })
                 .catch(error => res.status(500).json({ error }));
             })
             .catch(error => res.status(500).json({ error }));
        };
    };

    saucesArray(){
        exports.saucesArray = (req, res, next) => {
            Sauce.find()
            .then(sauces => res.status(200).json(sauces))
            .catch(error => res.status(400).json ({ error }));
        };
    };

    saucesUnique(){
        exports.saucesUnique = (req, res, next) => {
            Sauce.findOne({ _id: req.params.id })
            .then(sauce => res.status(200).json(sauce))
            .catch(error => res.status(404).json({ error }));
        };
    };

    addSauce(){
        exports.addSauce = (req, res, next) => {
            const sauceObject = JSON.parse(req.body.sauce);
            const sauce = new Sauce({
                ...sauceObject,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                usersLiked : {},
                usersDisliked : {}
            });
            sauce.save()
            .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
            .catch(error => res.status(400).json({ error }));
        };
    };

    modifySauce(){
        exports.modifySauce = (req, res, next) => {
            const sauceObject = req.file ?
                {
                    ...JSON.parse(req.body.thing),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then (() => res.status(200).json({ message: 'Sauce modifiée !'}))
            .catch(error => res.status(400).json({ error }));
        };
    };

    deleteSauce(){
        exports.deleteSauce = (req, res, next) => {
            Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({ error }))
                });
            })
            .catch(error => res.status(500).json({ error }))
            
        };
    };
};

new Database();

