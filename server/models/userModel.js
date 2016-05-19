var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs");


var UserSchema = new mongoose.Schema({
    username: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true},
    profileImgUrl: {type: 'String', default: "https://qph.is.quoracdn.net/main-qimg-3b0b70b336bbae35853994ce0aa25013?convert_to_webp=true"},
    color: {
        r: {type: 'Number', default: 255},
        g: {type: 'Number', default: 255},
        b: {type: 'Number', default: 255}
    },
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    pending: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});


UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(7), null);
    next();
});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);