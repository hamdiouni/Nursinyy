var express = require('express');
var router = express.Router();
var Component = require('../model/component');




// Fonction pour récupérer tous les composants
router.get('/getcomponents', async (req, res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fonction pour récupérer un composant par son ID
router.get('/getcomponents/:name', async (req, res) => {
    try {
        const component = await Component.findOneOne({ name: req.params.name });
        if (!component) return res.status(404).json({ message: 'Component not found.' });
        res.json(component);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fonction pour ajouter un nouveau composant
router.post('/postcomponents', async (req, res) => {
    const component = new Component(req.body);
    try {
        const newComponent = await component.save();
        res.status(201).json(newComponent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Fonction pour mettre à jour un composant existant
router.put('/updatecomponents/:name', async (req, res) => {
    try {
        // Trouver le composant à mettre à jour
        const componentToUpdate = await Component.findOne({ name: req.params.name });
        if (!componentToUpdate) return res.status(404).json({ message: 'Component not found.' });

        // Extraire les champs mis à jour du corps de la requête
        const { name, description, price, image, quantity } = req.body;

        // Mettre à jour les champs du composant
        if (name) componentToUpdate.name = name;
        if (description) componentToUpdate.description = description;
        if (price) componentToUpdate.price = price;
        if (image) componentToUpdate.image = image;
        if (quantity) componentToUpdate.quantity = quantity;

        // Enregistrer les modifications
        const updatedComponent = await componentToUpdate.save();

        // Envoyer le composant mis à jour en réponse
        res.json(updatedComponent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Fonction pour supprimer un composant
router.delete('/deletecomp/:name', async (req, res) => {
    try {
        await Component.findOneAndDelete({ name: req.params.name });
        res.json({ message: 'Component deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint pour récupérer tous les avis des utilisateurs
router.get('/getreviews', async (req, res) => {
    try {
        const userReviews = await Component.find();
        res.json(userReviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Endpoint pour récupérer les avis des utilisateurs pour un composant spécifique
router.get('/components/:componentName/user-reviews', async (req, res) => {
    try {
        // Extraire le nom du composant de la requête
        const componentName = req.params.componentName;

        // Rechercher le composant par son nom
        const component = await Component.findOne({ name: componentName });

        // Vérifier si le composant existe
        if (!component) {
            return res.status(404).json({ message: `Component '${componentName}' not found.` });
        }

        // Récupérer les avis associés à ce composant
        const reviews = await Component.findOne({ component: component.name });

        res.json(reviews);
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

        // Ajouter l'avis au composant existant
        existingComponent.rating = rating;

        // Sauvegarder le composant mis à jour avec le nouvel avis
        const updatedComponent = await existingComponent.save();

        // Renvoyer une réponse avec le composant mis à jour
        res.status(201).json(updatedComponent);
    } catch (err) {
        // En cas d'erreur, envoyer une réponse d'erreur avec le message d'erreur
        res.status(400).json({ message: err.message });
    }
});

// Endpoint pour récupérer un avis utilisateur par son ID
router.get('/getreviews/:id', getUserReview, (req, res) => {
    res.json(res.Component);
});

// Endpoint pour mettre à jour un avis utilisateur par son ID
router.patch('/user-reviews/:id', getUserReview, async (req, res) => {
    if (req.body.rating != null) {
        res.Component.rating = req.body.rating;
    }
    try {
        const updatedUserReview = await res.Component.save();
        res.json(updatedUserReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint pour supprimer un avis utilisateur par son ID
router.delete('/user-reviews/:id', getUserReview, async (req, res) => {
    try {
        await res.Component.remove();
        res.json({ message: 'Avis utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour récupérer un avis utilisateur par son ID
async function getUserReview(req, res, next) {
    let userReview;
    try {
        userReview = await Component.findById(req.params.id);
        if (userReview == null) {
            return res.status(404).json({ message: 'Avis utilisateur non trouvé' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.Component = userReview;
    next();
}
module.exports = router;
