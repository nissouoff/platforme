require('dotenv').config({ path: 'az.env' }); // Spécifie le fichier az.env

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser la variable d'environnement PORT

// Middleware
app.use(cors({
    origin: 'https://platforme-1wzq.vercel.app', // Remplacez par votre domaine
    methods: ['GET', 'POST', 'OPTIONS'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

app.use(bodyParser.json());

// Initialiser Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(require('./alp.json')), // Remplacez par le chemin correct de votre fichier JSON Firebase
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Utiliser la variable d'environnement
});

// Configurer Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Utiliser la variable d'environnement
        pass: process.env.GMAIL_PASS, // Utiliser la variable d'environnement
    },
});

// Exemple de route pour envoyer des e-mails
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Route pour l'envoi d'e-mail de confirmation
app.post('/email-send2', async (req, res) => {
    const { uid, activ, email, name } = req.body;

    try {
        if (!uid || !activ || !email || !name) {
            return res.status(400).json({ message: 'Données manquantes pour l\'envoi de l\'email.' });
        }

        const userSnapshot = await admin.database().ref('users/' + uid).once('value');
        const user = userSnapshot.val();

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const mailOptions = {
            from: 'nissoulintouchable@gmail.com',
            to: email,
            subject: 'Activer votre compte',
            text: `Bonjour ${name},\n\nMerci de vous être inscrit sur notre plateforme! Votre code d'activation est : ${activ}\n\nCordialement,\nL'équipe`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail envoyé avec succès.' });

    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
});

// Route pour récupérer les données utilisateur
app.get('/user/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const userSnapshot = await admin.database().ref('users/' + uid).once('value');
        const user = userSnapshot.val();

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données utilisateur.' });
    }
});

// Démarrer le serveur
app.options('*', cors()); // Permet toutes les options CORS

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
