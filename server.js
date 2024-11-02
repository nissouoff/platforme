const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); // Ajouté pour gérer les chemins de fichiers statiques
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser le port défini par Render ou 3000 par défaut

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialiser Firebase Admin SDK avec la clé de service et l'URL de la base de données
const serviceAccount = require('./ab.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Utiliser une variable d'environnement pour l'URL de la base de données
});

// Configurer Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Utiliser une variable d'environnement pour l'utilisateur email
        pass: process.env.EMAIL_PASS, // Utiliser une variable d'environnement pour le mot de passe email
    },
});

// Configurer les fichiers statiques
app.use(express.static(path.join(__dirname, 'V 1.0'))); // Servir le dossier contenant les fichiers statiques

// Route pour la page d'accueil
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "V 1.0", "index.html")); // Charger la page d'accueil
});

// Routes pour l'envoi d'e-mail et l'inscription (identiques à votre code)
app.post('/email-send', async (req, res) => { /* ... */ });
app.post('/email-send2', async (req, res) => { /* ... */ });
app.post('/signup', async (req, res) => { /* ... */ });
app.get('/user/:uid', async (req, res) => { /* ... */ });
app.get('/boutique/:uid/:nomb', async (req, res) => { /* ... */ });
app.patch('/user/:uid/statue', async (req, res) => { /* ... */ });
app.post('/boutique/:uid', async (req, res) => { /* ... */ });

// Middleware pour les erreurs 404 (route par défaut si la route demandée est introuvable)
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
