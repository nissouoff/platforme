const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser le port défini par Render ou 3000 par défaut

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialiser Firebase Admin SDK avec la clé de service et l'URL de la base de données
const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Utiliser une variable d'environnement pour l'URL de la base de données
});

// Configurer Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Utiliser une variable d'environnement pour l'utilisateur email
        pass: process.env.EMAIL_PASS,   // Utiliser une variable d'environnement pour le mot de passe email
    },
});

// Route pour l'envoi d'email
app.post('/email-send', async (req, res) => {
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
            from: process.env.EMAIL_USER, // Utiliser la variable d'environnement
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

// Route pour l'envoi d'email (secondaire)
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
            from: process.env.EMAIL_USER, // Utiliser la variable d'environnement
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

// Route pour l'inscription
app.post('/signup', async (req, res) => {
    const { name, email, password, activ } = req.body;

    try {
        if (!name || !email || !password || !activ) {
            return res.status(400).json({ message: 'Données d\'inscription manquantes.' });
        }

        // Vérifier si un utilisateur avec cet email existe déjà
        const userExists = await admin.auth().getUserByEmail(email).catch(error => null);

        if (userExists) {
            return res.status(409).json({ message: 'Ce compte existe déjà.' });
        }

        const userRecord = await admin.auth().createUser({ email, password });
        
        await admin.database().ref('users/' + userRecord.uid).set({
            name: name,
            email: email,
            premium: 'non',
            statue: 'no confirm',
            id: userRecord.uid,
            boutique: '0',
            solde: '0',
        });

        res.status(201).json({ uid: userRecord.uid, message: 'Utilisateur créé.' });

    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
    }
});

// Route pour récupérer les données d'un utilisateur
app.get('/user/:uid', async (req, res) => {
    try {
        const { uid } = req.params;

        const userSnapshot = await admin.database().ref(`users/${uid}`).once('value');
        const userData = userSnapshot.val();

        if (!userData) {
            return res.status(404).json({ message: 'Données utilisateur non trouvées.' });
        }

        const { statue, boutique, name, solde } = userData;

        res.status(200).json({ statue, boutique, name, solde });

        console.log('statue', statue);
        console.log('boutique', boutique);
        console.log('solde', solde);

    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
    }
});

// Route pour récupérer les informations d'une boutique spécifique
app.get('/boutique/:uid/:nomb', async (req, res) => {
    try {
        const { uid, nomb } = req.params;

        const boutiqueSnapshot = await admin.database().ref(`boutiques/${uid}/${nomb}`).once('value');
        const boutiqueData = boutiqueSnapshot.val();

        if (!boutiqueData) {
            return res.status(404).json({ message: 'Boutique non trouvée.' });
        }

        const { name, etat } = boutiqueData;

        res.status(200).json({ name, etat });

    } catch (error) {
        console.error('Erreur lors de la récupération des données de la boutique :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données de la boutique.' });
    }
});

// Route pour changer la valeur de statue d'un utilisateur
app.patch('/user/:uid/statue', async (req, res) => {
    const { uid } = req.params;
    const { statue } = req.body;

    try {
        if (!statue) {
            return res.status(400).json({ message: 'Valeur de statue manquante.' });
        }

        const userRef = admin.database().ref(`users/${uid}`);
        const userSnapshot = await userRef.once('value');

        if (!userSnapshot.exists()) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        await userRef.update({ statue });
        res.status(200).json({ message: 'Statut mis à jour avec succès.' });

    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut.' });
    }
});

// Route pour créer une boutique pour un utilisateur
app.post('/boutique/:uid', async (req, res) => {
    const { uid } = req.params;
    const { name, etat } = req.body;

    try {
        if (!name || !etat) {
            return res.status(400).json({ message: 'Données manquantes pour la création de la boutique.' });
        }

        const boutiqueRef = admin.database().ref(`boutiques/${uid}/${name}`);

        const boutiqueSnapshot = await boutiqueRef.once('value');
        if (boutiqueSnapshot.exists()) {
            return res.status(400).json({ message: 'Une boutique avec ce nom existe déjà.' });
        }

        await boutiqueRef.set({
            name,
            etat,
            createdAt: admin.database.ServerValue.TIMESTAMP
        });

        const userBoutiqueCountRef = admin.database().ref(`users/${uid}/boutique`);
        const userBoutiqueCountSnapshot = await userBoutiqueCountRef.once('value');
        let currentCount = userBoutiqueCountSnapshot.exists() ? parseInt(userBoutiqueCountSnapshot.val(), 10) : 0;

        await userBoutiqueCountRef.set(currentCount + 1);

        res.status(201).json({ message: 'Boutique créée avec succès.' });

    } catch (error) {
        console.error('Erreur lors de la création de la boutique :', error);
        res.status(500).json({ message: 'Erreur lors de la création de la boutique.' });
    }
});

// Middleware pour les erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
