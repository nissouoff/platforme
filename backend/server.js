// server.js
const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Pour autoriser les requêtes cross-origin
app.use(express.json());

sgMail.setApiKey(process.env.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);

app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  const msg = {
    to: email,
    from: 'nissoulintouchable@gmail.com', // Adresse d'envoi vérifiée sur SendGrid
    subject: subject,
    html: message,
  };

  sgMail
    .send(msg)
    .then(() => res.status(200).send('Email envoyé avec succès'))
    .catch((error) => {
      console.error('Erreur SendGrid:', error); // Log de l'erreur dans la console du serveur
      res.status(500).send(error.toString()); // Réponse d'erreur envoyée au frontend
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
