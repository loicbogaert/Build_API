const User = require('../models/User');
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const emailMask2Options = {
    maskWith: "*",
    unmaskedStartCharacterBeforeAt : 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate : false
};


    /** class User with controllers concerning Users informations (logs) */

class Users{

    /** Singup controller (password with HASH and masked email) */
    signingUp(req, res, next){
        const email = req.body.email;
        const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);  

            /**Test for secured password */
        if(/^(?=.*[A-Za-z1-9])(?=.*[0-9])(?=.*[A-Z])[^){}\[\]\*\\"'!=;,:§]{8,}/.test(req.body.password)) { 
             /**generate salt */
            bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                /**hash password */
                    bcrypt.hash(req.body.password, salt)
                    .then(hash =>{
                        const user = new User({
                            email: maskedEmail,
                            password: hash
                        });
                    user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(500).json({ error }));
            })
        }  else {
        res.statusMessage = ('Votre mot de passe doit contenir au minimum 7 caractères, une majuscule et deux chiffres')
        res.status(400).end()
        }
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
                     
                     bcrypt.compare(req.body.password, user.password, (err, data) => {
                        if (err) throw (error => res.status(500).json({ error }));
        
                        /**if both passwords match */

                        if (data) {
                            return res.status(200).json({
                                 userId: user._id,     
                                token: jwt.sign(
                                  { userId: user._id },
                                  'RANDOM_TOKEN_SECRET',
                                  { expiresIn: '24h' }) 
                                })

                        /**if passwords do not match*/

                        } else {
                        return res.status(401).json({ error : "Mot de passe incorrect" })
                        };
                    });
                })
            .catch(error => res.status(500).json({ error }));
        };
};

module.exports = Users;