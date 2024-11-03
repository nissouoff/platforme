require('dotenv').config({ path: 'az.env' }); // Spécifie le fichier az.env

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser la variable d'environnement PORT

app.use(express.static('public'));

// Route pour rediriger vers index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Middleware
app.use(cors());
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

// Exemple de route
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
            // Envoyer une réponse avec un code 409 pour indiquer que l'utilisateur existe déjà
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
});// Route pour récupérer les données d'un utilisateur

app.get('/user/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        
        // Récupération des données spécifiques de l'utilisateur depuis Firebase
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
        
        // Récupération des données de la boutique depuis Firebase
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

        // Référence à la boutique spécifique dans la base de données Firebase
        const boutiqueRef = admin.database().ref(`boutiques/${uid}/${name}`);

        // Vérifier si une boutique avec le même nom existe déjà
        const boutiqueSnapshot = await boutiqueRef.once('value');
        if (boutiqueSnapshot.exists()) {
            return res.status(400).json({ message: 'Une boutique avec ce nom existe déjà.' });
        }

        // Ajouter la nouvelle boutique dans Firebase
        await boutiqueRef.set({
            name,
            etat,
            createdAt: admin.database.ServerValue.TIMESTAMP
        });

        // Référence pour le compteur de boutiques dans le profil de l'utilisateur
        const userBoutiqueCountRef = admin.database().ref(`users/${uid}/boutique`);

        // Récupérer le nombre actuel de boutiques de l'utilisateur, en forçant la conversion en nombre
        const userBoutiqueCountSnapshot = await userBoutiqueCountRef.once('value');
        let currentCount = userBoutiqueCountSnapshot.exists() ? parseInt(userBoutiqueCountSnapshot.val(), 10) : 0;

        // Incrémenter le compteur de boutiques de 1
        await userBoutiqueCountRef.set(currentCount + 1);

        // Répondre avec succès
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







