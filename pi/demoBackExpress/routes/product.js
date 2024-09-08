var express = require('express');
var router = express.Router();
var Products = require("../model/produit");

/* GET All Products */




router.get('/', function (req, res, next) {
  Products.find(function (err, data) {
    if (err) throw err;

    res.json(data);
  });
});

/* Add Product */

router.post('/add', function (req, res) {

  var prod = new Products(
    {
      Libelle: req.body.Libelle,
      Desc: req.body.Desc
    }
  )
  prod.save();
  res.status(201).send();
  //res.json(prod);
  //console.log(prod)
  console.log("produit ajoute")
});
router.post('/login', (req, res) => {



})



module.exports = router;
