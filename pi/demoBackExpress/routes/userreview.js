/*var express = require('express');
var router = express.Router();
var UserReview = require('../model/userreview');
var components = require('../model/component');



// Fonction pour récupérer tous les avis des utilisateurs
router.get('/getreviews', async (req, res) => {
    try {
        const userReviews = await UserReview.find();
        res.json(userReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Endpoint pour créer un avis utilisateur associé à un produit existant
router.post('/user-reviews', async (req, res) => {
    try {
        // Extraire les données du corps de la requête
        const { rating, productName } = req.body;

        // Rechercher le composant correspondant au nom du produit
        const existingComponent = await Component.findOne({ name: productName });

        // Vérifier si le composant existe
        if (!existingComponent) {
            return res.status(404).json({ message: `Product '${productName}' not found.` });
        }

        // Créer un nouvel avis utilisateur avec le rating reçu dans le corps de la requête
        const newUserReview = new UserReview({
            rating: rating,
            component: existingComponent.name // Associé l'avis au composant trouvé
        });

        // Sauvegarder le nouvel avis utilisateur
        const savedUserReview = await newUserReview.save();

        // Renvoyer une réponse avec le nouvel avis utilisateur
        res.status(201).json(savedUserReview);
    } catch (err) {
        // En cas d'erreur, envoyer une réponse d'erreur avec le message d'erreur
        res.status(400).json({ message: err.message });
    }
});

// Endpoint pour récupérer un avis utilisateur par son ID
router.get('/getreviews/:id', getUserReview, (req, res) => {
    res.json(res.userReview);
});

// Endpoint pour mettre à jour un avis utilisateur par son ID
router.patch('/user-reviews/:id', getUserReview, async (req, res) => {
    if (req.body.rating != null) {
        res.userReview.rating = req.body.rating;
    }
    try {
        const updatedUserReview = await res.userReview.save();
        res.json(updatedUserReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint pour supprimer un avis utilisateur par son ID
router.delete('/user-reviews/:id', getUserReview, async (req, res) => {
    try {
        await res.userReview.remove();
        res.json({ message: 'Avis utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Endpoint pour créer un avis utilisateur pour un produit spécifique
router.post('/components/:componentId/user-reviews', async (req, res) => {
    const componentId = req.params.componentId; // Récupère l'ID du composant depuis les paramètres d'URL
    const userReview = new UserReview({
        rating: req.body.rating,
        componentId: componentId // Associe l'avis utilisateur au composant spécifique
    });

    try {
        const newUserReview = await userReview.save();
        res.status(201).json(newUserReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Middleware pour récupérer un avis utilisateur par son ID
async function getUserReview(req, res, next) {
    let userReview;
    try {
        userReview = await UserReview.findById(req.params.id);
        if (userReview == null) {
            return res.status(404).json({ message: 'Avis utilisateur non trouvé' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.userReview = userReview;
    next();
}

module.exports = router;*/
