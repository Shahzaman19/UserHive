const bcrypt = require('bcrypt')
const { User, schema } = require('../modal/user')
const Country = require('../modal/country');
const ObjectId = require('mongodb').ObjectId;


exports.userCountry = async (req, res) => { 
const { id } = req.params;
const { default_country } = req.body;

try {
    const user = await User.findOne({_id : id});
    const country = await Country.findOne({ name: default_country });
    if (!country) {
        return res.status(400).json({ error: 'Country name not found' });
    }
    const result = await User.updateOne({ _id: new ObjectId(id) }, { $set: {default_country: country._id} });
    if(country._id == user.default_country){
        user.currencies = country.currencies.name;
        await user.save(); 
    }
    res.send(result);
} catch (error) {
    console.log(error.message);
}

      
    
}

exports.getUser = async (req, res) => {
    const user = await User.find()
    res.send(user);
}

exports.createUser = async (req, res) => {
    try {
        const { error } = schema.validate(req.body)
        if (error) return res.status(404).send(error.details[0].message)

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("User already registered")

        user = await new User({
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            role: req.body.role,
            country_Id : req.body.country_Id
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).json({

            user: {
                id: user._id,
                name: user.name,
                password: user.password,
                phone: user.phone,
                email: user.email,
                role: user.role,
                country_Id : user.country_Id
            },
        },
        );

    }
    catch (error) {
        console.log(error.message);
    }
};
