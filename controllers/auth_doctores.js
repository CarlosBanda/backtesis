const { response } = require('express');
const bcrypt = require('bcryptjs');

const Doctor = require('../models/doctor');
const { generarJWT } = require('../helpers/jwt');



const crearDoctor = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Doctor.findOne({ email });
        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const doctor = new Doctor( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        doctor.password = bcrypt.hashSync( password, salt );

        await doctor.save();

        // Generar mi JWT
        const token = await generarJWT( doctor.id );

        res.json({
            ok: true,
            doctor,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const doctorDB = await Doctor.findOne({ email });
        if ( !doctorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, doctorDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT( doctorDB.id );
        
        res.json({
            ok: true,
            doctor: doctorDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async( req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT( uid );

    // Obtener el usuario por el UID, Usuario.findById... 
    const doctor = await Doctor.findById( uid );

    res.json({
        ok: true,
        doctor,
        token
    });

}


module.exports = {
    crearDoctor,
    login,
    renewToken
}
