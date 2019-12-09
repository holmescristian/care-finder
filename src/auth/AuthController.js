var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var VerifyToken = require('./checkToken');
var VerifyAdmin = require('./checkAdmin');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

router.post('/register', function (req, res) {

    var encryptedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            admin : req.body.admin
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err)
            return res.status(500).send('Error on the server.');
        if (!user)
            return res.status(404).send('No user found.');
        var validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

router.get('/me', VerifyToken, function(req, res) {
    var token = req.headers['x-api-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id,
            { password: 0 }, // projection
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                res.status(200).send(user);
                // next(user);
            });
    });
});

router.get('/getAllUsers', async function(req, res) {
    const user = await User.find({}, { password: 0 }).exec()
    res.json({ data: user })
});

router.delete('/deleteAllUsers', async function(req, res) {
    await User.deleteMany({}).exec()
    res.status(204).send()
});

router.delete('/delete/user/:email', async function(req, res) {
    await User.deleteMany({
        email: req.params.email
    }).exec()
    res.status(204).send()
});

router.use(function (user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;
