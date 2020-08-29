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
const cors = require('cors')({ origin: true });
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "vionicomx@gmail.com", // generated
        pass: "e4e5Cf3Cc6!" // generated
    }
});

exports.emailSender = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const mail = req.body.correo;
        const nombre = req.body.nombre;
        const inicio = req.body.inicio;
        const fin = req.body.fin;
        const mailOptions = {
            from: 'from@example.com', //Adding sender's email
            to: mail, //Getting recipient's email by query string
            subject: 'Gracias ' + nombre + ' por tu reserva!', //Email subject
            html: `Gracias por reservar con 90 millas. <br><br>
            El horario de tu reserva es: ${inicio}  a  ${fin}. Para hacer válida tu reservación presentate
            con este correo y con una identificación en nuestras instalaciones. <br><br><br>
            ¡Agradecemos tu preferencia!`
        };

        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.send({ status: err.toString() });
            }
            return res.send({ status: 'envidado' });
        });
    })

});