const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

});

DoctorSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Doctor', DoctorSchema );