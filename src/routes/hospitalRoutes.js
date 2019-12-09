var express = require('express');
var router = express.Router();
var hospitalController = require('../controllers/hospitalController');
var postAllHospitals = require('../controllers/postAllHospitals');

var VerifyToken = require('../auth/checkToken');
var VerifyAdmin = require('../auth/checkAdmin');

/* GET hospitals listing. */
router.get('/', VerifyToken, hospitalController.findAllHospitals);
router.get('/id/:providerId', VerifyToken, hospitalController.getByProviderId);
router.get('/city/:cityName', VerifyToken, hospitalController.getByCity);
router.get('/state/:stateName', VerifyToken, hospitalController.getByState);
router.get('/county/:countyName', VerifyToken, hospitalController.getByCounty);
router.get('/citystate/:cityName/:stateName', VerifyToken, hospitalController.deleteByCityState);
router.get('/name/:hospitalName', VerifyToken, hospitalController.getByName);
router.get('/type/:hospitalType', VerifyToken, hospitalController.getByType);
router.get('/ownership/:hospitalOwner', VerifyToken, hospitalController.getByOwner);
router.get('/emergency/:hospitalEmergency', VerifyToken, hospitalController.getByEmergency);
/* GET hospitals listing. */

// Post Routes
router.post('/', hospitalController.store);
router.post('/all', postAllHospitals.storeAll);

// DELETE Routes
router.delete('/', VerifyToken, VerifyAdmin, hospitalController.deleteAllHospitals);
router.delete('/id/:providerId', VerifyToken, VerifyAdmin, hospitalController.deleteByID);
router.delete('/city/:cityName', VerifyToken, VerifyAdmin, hospitalController.deleteByCity);
router.delete('/state/:stateName', VerifyToken, VerifyAdmin, hospitalController.deleteByState);
router.delete('/county/:countyName', VerifyToken, VerifyAdmin, hospitalController.deleteByCounty);
router.delete('/citystate/:cityName/:stateName', VerifyToken, VerifyAdmin, hospitalController.deleteByCityState);
router.delete('/name/:hospitalName', VerifyToken, VerifyAdmin, hospitalController.deleteByName);
router.delete('/type/:hospitalType', VerifyToken, VerifyAdmin, hospitalController.deleteByType);
router.delete('/ownership/:hospitalOwner', VerifyToken, VerifyAdmin, hospitalController.deleteByOwner);
router.delete('/emergency/:hospitalEmergency', VerifyToken, VerifyAdmin, hospitalController.deleteByEmergency);

/* UPDATE hospitals listing. */
router.put('/id/:providerId', VerifyToken, VerifyAdmin, hospitalController.updateById);
/* UPDATE hospitals listing. */

module.exports = router;
