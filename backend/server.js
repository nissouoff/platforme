// server.js
const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Pour autoriser les requêtes cross-origin
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    .catch((error) => res.status(500).send(error.toString()));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
