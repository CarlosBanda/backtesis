const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctores = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const doctores = await Doctor
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(20)

    
    res.json({
        ok: true,
        doctores,
    })
}



module.exports = {
    getDoctores
}