const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
 
    image: {
        type: String,
        default: ''
    },
 
    price : {
        type: Number,
        default:0
    },
    category: {
        type: String,//mongoose.Schema.Types.ObjectId,
        //ref: 'Category',
        required:true
    },
    fid : {
        type: Number,
        default:0
    },
    subscribed_user:  [String]
     ,
    dateCreated: {
        type: Date,
        default: Date.now,
    },

})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);
