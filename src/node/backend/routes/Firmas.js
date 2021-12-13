var express = require('express');
var firmasControllers = require('../controllers/Firmas');

var router = express.Router();

router.post('/save', firmasControllers.saveFirma);
router.get('/firmas', firmasControllers.obtenerFirmas)

module.exports = router;