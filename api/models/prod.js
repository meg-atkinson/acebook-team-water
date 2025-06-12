const mongoose = require('mongoose');

const { Schema } = mongoose;

const prodSchema = new Schema({
    fromUser: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    toUser: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Prod = mongoose.model('Prod', prodSchema);
module.exports = Prod;


