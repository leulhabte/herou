const Order = require('../Models/ordersModel')
const Product = require('../Models/productsModel')
const catchAsync = require('../utilities/catchAsync')
const crudController = require('./crudController')

exports.getOrders = crudController.getResults(Order)
//exports.addOrder = crudController.addNew(Order)
exports.getOrder = crudController.getSingleValue(Order)
exports.updateOrder = crudController.update(Order)
exports.deleteOrder = crudController.delete(Order)

exports.createOrder = catchAsync(async(req,res,next) =>{
    // bring the values
    req.body.user = req.user
    const newData = await Order.create(req.body)
   
    // // bring the id of the products
    const product = await Product.find({ '_id': { $in: newData.products } });
    // decrease the quantity
    for(let i=0 ; i<product.length;i++){
        product[i].amnt_inStock  -= req.body.quantity;
       product[i].save()
        //console.log("i",product[i].amnt_inStock- req.body.quantity);
    }
      res.status(200).json({
          status:"success",
          newData
      })
})

exports.getOrderForUser = catchAsync(async(req,res,next) =>{
 //bring the user id
 //search orders on using that id
 const records = await Order.find({'user':req.user}).sort({ ordered_at: -1 })

 //console.log(records)
 res.status(200).json({
    status:"success",
    records
})
})

exports.updateOrderStatus = catchAsync(async (req,res,next) =>{

    //get order id
    // edit the status
})