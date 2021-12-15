const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    products:{
        type:[mongoose.Schema.ObjectId],
        ref:"Product",        
    },
    user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",       
    },
    amount:Number,
    ordered_at:{
        type:Date,
       default:Date.now
    },
    delivery_date:{
        type:Date,
    },
    
    status:{
        type:String,
        enum:['packed','delivered','failed','returned','shipped','ordered']
    },
    quantity:Number,
    paymentOption:{
        type:String,
        enum:['upi','cash','card']
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
orderSchema.pre(/^find/,function(next){
    this.populate({
        path:'products',
        select:'price title images'
    })
    next()
})
orderSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name contactNumber address'
    })
    next()
})
const Order = mongoose.model('Order',orderSchema)
module.exports = Order