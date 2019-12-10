var express = require('express');
var router = express.Router();
var hospitalController = require('../controllers/hospitalController');
var postAllHospitals = require('../controllers/postAllHospitals');

var VerifyToken = require('../auth/checkToken');
var VerifyAdmin = require('../auth/checkAdmin');

/* GET hospitals listing. */
router.get('/', VerifyToken, hospitalController.findAllHospitals);
router.get('/id/:providerId', VerifyToken, hospitalController.getByProviderId);
router.get('/city/:city', VerifyToken, hospitalController.getByCity);
router.get('/state/:state', VerifyToken, hospitalController.getByState);
router.get('/county/:county', VerifyToken, hospitalController.getByCounty);
router.get('/citystate/:city/:state', VerifyToken, hospitalController.getByStateAndCity);
router.get('/name/:hospitalName', VerifyToken, hospitalController.getByName);
router.get('/type/:type', VerifyToken, hospitalController.getByType);
router.get('/ownership/:owner', VerifyToken, hospitalController.getByOwner);
router.get('/emergency/:emergencyServices', VerifyToken, hospitalController.getByEmergency);
/* GET hospitals listing. */

// Post Routes
router.post('/', hospitalController.store);
router.post('/all', postAllHospitals.storeAll);

// DELETE Routes
router.delete('/', VerifyToken, VerifyAdmin, hospitalController.deleteAllHospitals);
router.delete('/id/:providerId', VerifyToken, VerifyAdmin, hospitalController.deleteByID);
router.delete('/city/:city', VerifyToken, VerifyAdmin, hospitalController.deleteByCity);
router.delete('/state/:state', VerifyToken, VerifyAdmin, hospitalController.deleteByState);
router.delete('/county/:county', VerifyToken, VerifyAdmin, hospitalController.deleteByCounty);
router.delete('/citystate/:city/:state', VerifyToken, VerifyAdmin, hospitalController.deleteByCityState);
router.delete('/name/:hospitalName', VerifyToken, VerifyAdmin, hospitalController.deleteByName);
router.delete('/type/:type', VerifyToken, VerifyAdmin, hospitalController.deleteByType);
router.delete('/ownership/:owner', VerifyToken, VerifyAdmin, hospitalController.deleteByOwner);
router.delete('/emergency/:emergencyServices', VerifyToken, VerifyAdmin, hospitalController.deleteByEmergency);

/* UPDATE hospitals listing. */
router.put('/id/:providerId', VerifyToken, VerifyAdmin, hospitalController.updateById);
/* UPDATE hospitals listing. */

module.exports = router;
