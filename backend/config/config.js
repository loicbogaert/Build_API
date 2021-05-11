const mongoose = require('mongoose');

 const connect = () => mongoose.connect('mongodb+srv://loic:yesyes62120@cluster0.vxupa.mongodb.net/Cluster0?retryWrites=true&w=majority',
{ useNewUrlParser : true,
    useUnifiedTopology : true})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = {
    connect
}