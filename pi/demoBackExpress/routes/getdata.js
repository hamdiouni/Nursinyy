
const Mesure = require('../model/getdata');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

// Route pour récupérer toutes les données
router.get('/getAllData', (req, res) => {
    Mesure.find({}, 'ad8232')
        .then(data => {
            // Ajouter des en-têtes pour empêcher la mise en cache
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.status(200).json(data);
        })
        .catch(err => {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        });
});


// Middleware pour traiter les données POST
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// POST /sendData
router.post('/sendData', (req, res) => {
    const { ad8232, accelX, accelY, accelZ } = req.body;

    console.log('Données reçues:');
    console.log('Valeur AD8232:', ad8232);
    console.log('Accélération X:', accelX);
    console.log('Accélération Y:', accelY);
    console.log('Accélération Z:', accelZ);

    const mesure = new Mesure({
        ad8232: parseInt(ad8232),
        accelX: parseFloat(accelX),
        accelY: parseFloat(accelY),
        accelZ: parseFloat(accelZ)
    });

    mesure.save()
        .then(savedMesure => {
            console.log('Données enregistrées avec succès:', savedMesure);
            res.status(200).send('Données reçues et enregistrées avec succès');
        })
        .catch(err => {
            console.error('Erreur lors de l\'enregistrement des données:', err);
            res.status(500).send('Erreur lors de l\'enregistrement des données');
        });
});
module.exports = router;
