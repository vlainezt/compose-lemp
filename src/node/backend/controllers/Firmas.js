const mysqlConnection = require('../database.js');
const {
    google
} = require('googleapis');
const {
    OAuth2
} = google.auth;
const nodemailer = require('nodemailer');

var user = 'hiperefe.contact@gmail.com';
var cliente_id = '367396264455-uorv0btft5fm4k919t5t1db8ris9qom8.apps.googleusercontent.com';
var typeAuth = 'OAuth2';
var clientSecret = 'bZ0xJXOtTMI5Z_G5aitgvU_j';
var refreshToken = '1//04b6981HmurdrCgYIARAAGAQSNwF-L9IrPzQ4NCiqZ1eFtasBUvwy0LwL4Quf5OyI7sxJe1TXsKhh8GNwzIDcl709hM8uJd7Q0yA';
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';


const oauth2Client = new OAuth2(
    cliente_id,
    clientSecret,
    OAUTH_PLAYGROUND
);

var controller = {
    saveFirma: (req, res) => {
        const { nombre, email, comentario } = req.body;
        try {
            let query = `INSERT INTO firmas (Nombre, email, Comentario) VALUES ("${nombre}", "${email}", "${comentario}" )`
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    enviarEmail(email, nombre)
                    return res.status(200).send({
                        message: 'Firma Guardada'
                    })
                } else {
                    console.log(err);
                    return res.status(404).send({
                        message: 'Error, no se guardo la firma'
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    },
    obtenerFirmas : (req, res) => {
        try {
            let query = " SELECT * FROM firmas"
            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {

                    if (rows.length > 0) {
                        return res.status(200).send({
                            message: 'Success',
                            results: rows
                        })
                    } else {
                        return res.status(204).send({
                            message: 'No hay resultados previos de la evaluacion ',
                            results: []
                        })
                    }

                } else {
                    console.log(err);
                    return res.status(500).send({
                        message: 'Fallo en la consulta :('
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

}


const enviarEmail = (email, nombre) => {
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

    const accessToken = oauth2Client.getAccessToken();

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: typeAuth,
            user: user,
            clientId: cliente_id,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'TEAM CILANTRO',
        to: `${email}`,
        subject: 'Gracias por su firma ' + nombre,
        text: "Hola, Gracias por firmar esta valiosa peticion que salvara muchas vidas",

    };

    transporter.sendMail(mailOptions).then(
        resp => {
            return {
                status: 'success',
                message: 'Email enviado a ' + email
            };
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                status: 'error',
                message: err
            });
        });

}

module.exports = controller;