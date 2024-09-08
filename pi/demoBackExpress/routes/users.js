var express = require('express');
var session = require('express-session');
var router = express.Router();
var Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');



router.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Configuration de la session
router.use(session({
  secret: 'your-secret-key', // Une clé secrète pour signer le cookie de session
  resave: false, // Ne sauvegarde pas la session à chaque requête si elle n'est pas modifiée
  saveUninitialized: false // Ne crée pas de session pour les requêtes qui ne l'ont pas déjà
}));
/*const requireAuth = (req, res, next) => {
  // Vérifiez si l'utilisateur est authentifié, par exemple en vérifiant la présence d'un cookie de session ou d'un jeton d'authentification dans l'en-tête de la requête
  if (!req.session.userId) { // Exemple avec sessions
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};*/
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, password: hashedPassword, email });
    await user.save();

    // Stockage des données utilisateur dans la session
    req.session.user = user;

    res.json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Error signing up user' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Stockage des données utilisateur dans la session
    req.session.user = user;

    // Générer un lien unique pour réinitialiser le mot de passe
    const resetLink = 'http://localhost:4200/rest?email=' + encodeURIComponent(email);

    // Envoyer l'e-mail avec le lien de réinitialisation
    const mailOptions = {
      from: 'ounihamdi4@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Simulation d'une authentification réussie pour l'administrateur
    if (username === 'admin' && password === 'admin') {
      // Si l'authentification réussit pour l'administrateur, générez un token JWT
      const token = jwt.sign({ username }, '12345678', { expiresIn: '1h' });
      return res.json({ token });
    } else {
      // Recherche de l'utilisateur dans la base de données
      const user = await Users.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Génération du token JWT pour l'utilisateur authentifié
      const token = jwt.sign({ username }, '12345678', { expiresIn: '1h' });
      return res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
});

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const token = req.headers['authorization']; // Récupérer le token JWT du header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token.split(' ')[1], '12345678', (err, decoded) => { // Vérifier le token
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.username = decoded.username; // Décoder le token et l'ajouter à la requête
    next();
  });
}

/*Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.username = decoded.username;
    next();
  });
};*/

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username }); // Renvoyez les informations utilisateur
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});


router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'User signed in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in user' });
  }
});
const nodemailer = require('nodemailer');

// Configurer le transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ounihamdi4@gmail.com',
    pass: 'vizp nnur khzw riun'
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Générer un lien unique pour réinitialiser le mot de passe
    const resetLink = 'http://localhost:4200/rest?email=' + encodeURIComponent(email);

    // Envoyer l'e-mail avec le lien de réinitialisation
    const mailOptions = {
      from: 'ounihamdi4@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hacher et mettre à jour le nouveau mot de passe dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    console.log("Password has been sent to your email");

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});
router.get('/is-authenticated', (req, res) => {
  // Vérifiez si l'utilisateur est connecté en vérifiant s'il y a une session utilisateur
  if (req.session.user) {
    // Si l'utilisateur est connecté, renvoyer true
    res.json({ authenticated: true });
  } else {
    // Si l'utilisateur n'est pas connecté, renvoyer false
    res.json({ authenticated: false });
  }
});
// Déconnexion
// Déconnexion
router.post('/logout', (req, res) => {
  // Pas de token à détruire dans le cas des tokens JWT
  res.json({ message: 'User logged out successfully' });
});

// Afficher tous les utilisateurs
router.get('/showallusers', async (req, res) => {
  try {
    const users = await Users.find({}, '-password'); // Exclure le champ de mot de passe
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});
// Récupérer les détails d'un utilisateur par ID
router.get('/showallusers/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});
// Supprimer un utilisateur
router.delete('/deleteuser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Mettre à jour un utilisateur
router.put('/updateuser/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, { username, email }, { new: true });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
