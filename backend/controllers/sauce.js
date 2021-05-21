const Sauce = require('../models/Sauces');
const fs = require('fs');

/** Controllers for the sauces (delete, modify, add...) */

class Sauces{
    constructor(){
        this.saucesArray();
        this.saucesUnique();
        this.addSauce();
        this.modifySauce();
        this.deleteSauce();
    }

    /**
     * List of all the sauces
     */
    saucesArray(){
        exports.saucesArray = (req, res, next) => {
            Sauce.find()
            .then(sauces => res.status(200).json(sauces))
            .catch(error => res.status(400).json ({ error }));
        };
    };


    /**
     * Get only one sauce
     */
    saucesUnique(){
        exports.saucesUnique = (req, res, next) => {
            Sauce.findOne({ _id: req.params.id })
            .then(sauce => res.status(200).json(sauce))
            .catch(error => res.status(404).json({ error }));
        };
    };

    /**
     * Add a sauce to the list (creation)
     */
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

    /**
     * Modifying a sauce
     */
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

    /**
     * Deleting a sauce
     */
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

new Sauces();

