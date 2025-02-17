// const express = require("express");
// const { userAuth } = require("../middleware/auth");
// const paymentRouter = express.Router();
// const razorpayInstance = require("../utils/razorpay");
// const Payment = require("../model/payment");
// const User = require("../model/user");
// const {membershipAmount} = require("../utils/constants");
// const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils");

// paymentRouter.post("/payment/create" , userAuth, async (req , res) => {
//     try{

//         const { membershipType } = req.body;
//         const {firstName , lastName , emailId} = req.user;
//         console.log(razorpayInstance);
//         const order = await razorpayInstance.orders.create({
//             amount : membershipAmount[membershipType]*100,
//             currency : "INR",
//             receipt : "receipt#1",
//             notes : {
//                 firstName,
//                 lastName,
//                 emailId,
//                 membershipType : membershipType,
//             },
//         })
//         console.log(order);
//         const payment = new Payment({
//             userId : req.user._id,
//             orderId : order.id,
//             status : order.status,
//             amount : order.amount,
//             currency : order.currency,
//             receipt : order.receipt,
//             notes : order.notes,
//         });

//         const savedPayment = await payment.save(); 

//         const user = await User.findOne({_id : payment.userId});
//         user.isPremium = true;
//         user.membershipType = payment.notes.membershipType;
//         await user.save();

//         res.json({ ...savedPayment.toJSON() , keyId :  "rzp_test_pW8tZ50ggGqDB8"});
//     }
//     catch(err){
//         return res.status(500).json({msg : err.message});
//     }
// });




// paymentRouter.get("/premium/verify" , userAuth , async(req , res) => {
//     const user = req.user.toJSON();

//     if(user.isPremium){
//         return res.json({...user});
//     }
//     return res.json({...user});
// }) 


// module.exports = paymentRouter;


const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../model/payment");
const User = require("../model/user");
const { membershipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {
        const { membershipType } = req.body;
        const { firstName, lastName, emailId } = req.user;

        // ✅ Razorpay order create
        const order = await razorpayInstance.orders.create({
            amount: membershipAmount[membershipType] * 100,
            currency: "INR",
            receipt: "receipt#1",
            notes: { firstName, lastName, emailId, membershipType },
        });

        // ✅ Payment DB me store karo
        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            status: "created", // 🟢 Order created status
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes,
        });

        await payment.save();

        res.json({ ...payment.toJSON(), keyId: "rzp_test_pW8tZ50ggGqDB8" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// ✅ Fake Payment Verification API (Test Mode Me Hamesha Success)
paymentRouter.post("/payment/verify", userAuth, async (req, res) => {
    try {
        const { orderId, membershipType } = req.body;

        // ✅ Order ka record lo
        const payment = await Payment.findOne({ orderId });
        if (!payment) return res.status(400).json({ success: false, msg: "Payment not found" });

        // ✅ User ko Premium bana do
        const user = await User.findOne({ _id: payment.userId });
        user.isPremium = true;
        user.membershipType = membershipType;
        await user.save();

        // ✅ Payment status update kar do
        payment.status = "paid"; // Fake success
        await payment.save();

        res.status(200).json({ success: true, msg: "Premium activated (Test Mode)" });

    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
    res.json(req.user.toJSON());
});

module.exports = paymentRouter;


