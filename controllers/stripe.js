const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price
  const {coupon}= req.body
  // 1. find a user 
  const user = await User.findOne({email: req.user.email}).exec();

  //2. a cart total 
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderdBy: user._id}).exec();
  
  console.log("CART TOTAL :", cartTotal)
  //3 create an amount with currenecy 
  let finalAmt = 0;

  if (coupon && totalAfterDiscount){
    finalAmt= Math.round(totalAfterDiscount * 100)
  }else{
   finalAmt= Math.round(cartTotal * 100)
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmt,
    currency: "cad",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable : finalAmt,

  });
};
