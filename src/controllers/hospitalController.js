const Hospital = require('../models/hospital');

// Post methods

exports.store = async (req,res) => {
    await Hospital.insertMany(req.body);
    res.status(201).json({ data: Hospital })
};

// Get methods

exports.findAllHospitals = async (req, res) => {
    const hospitals = await Hospital.find().exec();
    res.json({data: hospitals})
};

exports.getByProviderId = async ( req ,res ) => {
    const hospitals = await Hospital.find({
        provider_id: req.params.providerId
    }).exec();
    res.json({ data: hospitals })
};

exports.getByCity = async ( req, res ) => {
    const hospitals = await Hospital.find({
        city: {
            $regex: req.params.city,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByState = async ( req, res ) => {
    const hospitals = await Hospital.find({
        state: {
            $regex: req.params.state,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByCounty = async ( req, res ) => {
    const hospitals = await Hospital.find({
        city: {
            $regex: req.params.county,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByName = async ( req, res ) => {
    const hospitals = await Hospital.find({
        hospital_name: {
            $regex: req.params.hospitalName,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByStateAndCity = async ( req, res ) => {
    const hospitals = await Hospital.find({
        city: {
            $regex: req.params.city,
            $options: 'i'
        },
        state: {
            $regex: req.params.state,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByType = async ( req, res ) => {
    const hospitals = await Hospital.find({
        hospital_type: {
            $regex: req.params.type,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByOwner = async ( req, res ) => {
    const hospitals = await Hospital.find({
        hospital_ownership: {
            $regex: req.params.owner,
            $options: 'i'
        }
    }).exec();
    res.json({ data: hospitals})
};

exports.getByEmergency = async ( req, res ) => {
    if (req.params.emergencyServices === "false"){
        const hospitals = await Hospital.find({
            emergency_services: {
                $regex: 'false'
            }
        }).exec();
        res.json({ data: hospitals})
    } else if (req.params.emergencyServices === "true") {
        const hospitals = await Hospital.find({
            emergency_services: {
                $regex: 'true',
                $options: 'i'
            }
        }).exec();
        res.json({ data: hospitals})
    }
};

// Delete methods

exports.deleteAllHospitals = async ( req, res ) => {
    await Hospital.deleteMany({}).exec()
    res.status(204).send()
};

exports.deleteByID = async ( req, res ) => {
    await Hospital.deleteMany({
        provider_id: req.params.providerId
    });
    res.status(204).send()
};

exports.deleteByCity = async ( req, res ) => {
    await Hospital.deleteMany({
        city: { $regex: req.params.city, $options: 'i' }
    });
    res.status(204).send()
};

exports.deleteByState = async ( req, res ) => {
    await Hospital.deleteMany({
        state: { $regex: req.params.state, $options: 'i' }
    });
    res.status(204).send()
};

exports.deleteByCounty = async ( req, res ) => {
    await Hospital.deleteMany({
        county_name: { $regex: req.params.county, $options: 'i' }
    });
    res.status(204).send()
};

exports.deleteByCityState = async ( req, res ) => {
    await Hospital.deleteMany({
        state: { $regex: req.params.state, $options: 'i' },
        city: { $regex: req.params.city, $options: 'i' }
    });
    res.status(204).send()
};

exports.deleteByName = async ( req, res ) => {
    await Hospital.deleteMany({
        hospital_name: { $regex: req.params.hospitalName, $options: 'i' }
    }).exec();
    res.status(204).send()
};

exports.deleteByType = async ( req, res ) => {
    await Hospital.deleteMany({
        hospital_type: { $regex: req.params.type, $options: 'i' }
    }).exec();
    res.status(204).send()
};

exports.deleteByOwner = async ( req, res ) => {
    await Hospital.deleteMany({
        hospital_ownership: { $regex: req.params.owner, $options: 'i' }
    }).exec();
    res.status(204).send()
};

exports.deleteByEmergency = async ( req, res ) => {
    await Hospital.deleteMany({
        emergency_services: { $eq: req.params.emergencyServices }
    }).exec();
    res.status(204).send()
};

//Update methods

exports.updateById = async ( req, res ) => {
    await Hospital.findOneAndUpdate({
        provider_id: req.params.providerId
    }, req.body).exec();
    res.status(204).send()
};
