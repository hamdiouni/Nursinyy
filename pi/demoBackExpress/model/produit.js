var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Produit = new Schema({
    Libelle : String,
    Desc    : String
});

module.exports = mongoose.model('produits', Produit);