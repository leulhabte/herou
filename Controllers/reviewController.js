const crudController = require("./crudController");
const Reviews = require("../Models/Reviews")
const catchAsync = require('../utilities/catchAsync')

exports.createReviews  = catchAsync(async(req,res,next) =>{
    // bring the values
    req.body.user = req.user
    const newData = await Reviews.create(req.body)
      res.status(200).json({
          status:"success",
          newData
      })
})
exports.getAllReviews = crudController.getResults(Reviews)
exports.getProductReviews = crudController.getSingleValue(Reviews)