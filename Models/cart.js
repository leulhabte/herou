const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
            //price: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

cartSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);







// const Schema = mongoose.Schema;

// const CartSchema = new Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", required: true,
//     },
//  cart: {
//     items: [{
//         productId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         },
//         price:
//          { 
//              type: Number, 
//              required: true }
//     }]
// }
//   },
//   {
//     timestamps: true,
//   }
// );

// CartSchema.methods.addnew = function(product) {
//     // 'this' keyword still refers to the schema
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//         return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//         newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//         updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//         updatedCartItems.push({
//             productId: product._id,
//             quantity: newQuantity,

//         });
//     }
//     const updatedCart = {
//         items: updatedCartItems
//     };

//     this.cart = updatedCart;
//     return this.save();
// };

// CartSchema.methods.removeFromCart = function(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//         return item.productId.toString() !== productId.toString();
//     });
//     this.cart.items = updatedCartItems;
//     return this.save();
// };

// CartSchema.methods.clearCart = function() {
//     this.cart = { items: [] };
//     return this.save();
// };
// module.exports = mongoose.model("cart", CartSchema);

