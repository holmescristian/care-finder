var mongoose = require('mongoose');
const Schema = mongoose.Schema

const definition = new Schema ({
    'name': { type: String },
    'email': { type: String },
    'password': { type: String },
    'admin': { type: Boolean },
});

const schema = new mongoose.Schema(definition);

module.exports = mongoose.model('user', schema);
