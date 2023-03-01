const Joi = require('joi')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        minlength : 5,
        maxlength : 255,
        // required : true
    },
    password :{
        type : String,
        minlength : 5,
        maxlength : 255,
        // required : true
    },
    phone :{
        type : String,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    email:{
        type : String,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    country_Id : {
        type : String,
        // default : 'Pakistan'
    },
    countryId : {
        type : String,
        nonPersistedField: mongoose.Schema.Types.Mixed
        // default : 'Pakistan'
    },
    default_country : {
        type : String
    },
    currencies : {
        type : String
    },
    // default_country: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Country'
    //   }

});

// userSchema.virtual('default_currency').get(async function() {
//     const country = await mongoose.model('Country').findById(this.default_country);
//     return country.currencies[0];
//   });


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ userId: this._id , userRole : this.role}, 'myPrivateKey');
    return token;
}

const User = mongoose.model('users',userSchema) 

    const schema = Joi.object({
        name : Joi.string().min(5).max(50).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(255).required(),
        phone : Joi.string().min(5).max(255).required(),
        role : Joi.string().min(3).max(255),
        country_Id : Joi.string().min(3).max(255)
    })



exports.User = User;
exports.schema = schema;