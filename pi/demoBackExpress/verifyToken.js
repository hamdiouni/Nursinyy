const jwt = require('jsonwebtoken');
const secretKey = 'votre_clé_secrète';

module.exports = function (req, res, next) {
    // Récupérez le token d'authentification du header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifiez si le token existe
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Vérifiez si le token est valide
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next(); // Passez à l'étape suivante
    });
};
