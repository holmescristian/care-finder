var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const definition = new Schema ({
    'provider_id': { type: String },
    'hospital_name': { type: String },
    'address': { type: String },
    'city': { type: String },
    'state': { type: String },
    'zip_code': { type: String },
    'county_name': { type: String },
    'phone_number': { type: String },
    'hospital_type': { type: String },
    'hospital_ownership': { type: String },
    'emergency_services': { type: String },
    'human_address': { type: String },
    'latitude': { type: String },
    'longitude': { type: String }
});

const options = {
    timeStamps: true
};

const schema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('hospitals', schema)
