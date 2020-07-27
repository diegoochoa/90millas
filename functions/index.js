const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "vionicomx@gmail.com", // generated
        pass: "e4e5Cf3Cc6!" // generated
    }
});

exports.emailSender = functions.https.onRequest((req, res) => {
    const mailOptions = {
        from: 'from@example.com', //Adding sender's email
        to: req.query.dest, //Getting recipient's email by query string
        subject: 'Gracias por tu reserva!', //Email subject
        html: `Gracias por reservar con 90 millas, para hacer válida tu reservación presentate
        con este correo y con una identificación en nuestras instalaciones. \n
        ¡Agradecemos tu preferencia!`
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.send(err.toString());
        }
        return res.send('Email sent successfully');
    });
});