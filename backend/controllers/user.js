const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const emailMask2Options = {
    maskWith: "*",
    unmaskedStartCharacterBeforeAt : 3,
    unmaskedEndCharactersAfterAt: 2,
    laskAtTheRate : false
};

    /** class User with controllers concerning Users informations (logs) */

class Users{

    /** Singup controller (password with HASH and email) */

        signingUp(req, res, next){
            const email = req.body.email;
            const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);  
                bcrypt.hash(req.body.password, 10)
                .then(hash =>{
                    const user = new User({
                        email: maskedEmail,
                        password: hash
                    });
                    user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
            };
        
    /** Loging controller (Find existing email and password (match hashed password) + Token creation) */

        logingIn(req, res , next){
            const email = req.body.email;
            const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);  
                User.findOne({ email: maskedEmail })
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
                            userId: user._id,
                            token: jwt.sign(
                              { userId: user._id },
                              'RANDOM_TOKEN_SECRET',
                              { expiresIn: '24h' }
                             )
                         });
                     })
                     .catch(error => res.status(500).json({ error }));
                 })
                 .catch(error => res.status(500).json({ error }));
            };
        };

module.exports = Users;