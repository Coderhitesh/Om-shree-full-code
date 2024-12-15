const Order = require('../Models/OrderModel');
const User = require('../Models/UserModel');
const Product = require('../Models/ProductModel');
const mongoose = require('mongoose');
const crypto = require('crypto')
const Razorpay = require('razorpay');
const axios = require('axios');
require('dotenv').config()

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,   // Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay Secret Key
});

exports.createOrder = async (req, res) => {
    try {
        // console.log(req.user)
        const userId = req.user.id._id
        const { City, PinCode, HouseNo, finalMainPrice, Street, NearByLandMark, items, isReferralCodeApplied, appliedCode, paymentMode } = req.body;
        console.log(req.body)
        const emptyFields = [];
        if (!City) emptyFields.push('City');
        if (!PinCode) emptyFields.push('PinCode');
        if (!HouseNo) emptyFields.push('HouseNo');
        if (!Street) emptyFields.push('Street');
        if (!paymentMode) emptyFields.push('Payment Method');
        if (!NearByLandMark) emptyFields.push('NearByLandMark');

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please fill in the following fields: ${emptyFields.join(', ')}`
            });
        }


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (paymentMode === 'Online') {
            const razorpayOptions = {
                amount: finalMainPrice * 100 || 5000000,
                currency: 'INR',
                payment_capture: 1,
            };

            const razorpayOrder = await razorpayInstance.orders.create(razorpayOptions);

            if (!razorpayOrder) {
                return res.status(500).json({
                    success: false,
                    message: 'Error in creating Razorpay order',
                });
            }

            const newOrder = new Order({
                userId,
                City,
                PinCode,
                HouseNo,
                Street,
                isReferralCodeApplied,
                appliedCode,
                NearByLandMark,
                OrderStatus: 'pending',
                items,
                finalMainPrice: finalMainPrice,
                razorpayOrderId: razorpayOrder.id,
                paymentMode
            });

            await newOrder.save();

            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: { newOrder, razorpayOrder }
            });
        }

        // Create new order
        const newOrder = new Order({
            userId,
            City,
            PinCode,
            HouseNo,
            Street,
            isReferralCodeApplied,
            appliedCode,
            NearByLandMark,
            OrderStatus: 'pending',
            items,
            finalMainPrice: finalMainPrice,
            paymentMode
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request',
            })
        }

        const genreaterSignature = crypto.createHash('SHA256', {
            razorpay_payment_id,
            razorpay_order_id,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        }).update(process.env.RAZORPAY_KEY_SECRET).digest('hex')
        if (!genreaterSignature === razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid signature',
            })
        }
        const paymentDetails = await axios.get(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
            auth: {
                username: process.env.RAZORPAY_KEY_ID,
                password: process.env.RAZORPAY_KEY_SECRET,
            }
        });
        const { method, status, bank, wallet, card_id } = paymentDetails.data;
        if (status !== 'captured') {
            return res.redirect(`http://localhost:5174/vendors/payment-failure?error=Payment failed via ${method || 'unknown method'}`);
        }

        // console.log("i am hit")
        const findOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id });
        // console.log("i am hit")
        if (!findOrder) {
            return res.status(400).json({
                success: false,
                message: 'Order not found.',
            });
        }

        findOrder.transactionId = razorpay_payment_id;
        findOrder.PaymentStatus = 'paid';
        findOrder.paymentMethod = method;
        // console.log("i am hit")
        await findOrder.save();
        // res.redirect('http://localhost:5987/successfull-payment')
        // return res.status(200).json({
        //     success: true,
        //     message: 'Payment verified and wallet updated successfully',
        //     data: {
        //         transactionId: razorpay_payment_id,
        //         PaymentStatus: findOrder.PaymentStatus,
        //         data:findOrder
        //     },
        // });
        return res.redirect('http://localhost:5173/successfull-payment');
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.checkReferralCode = async (req, res) => {
    try {
        const { code } = req.body;
        // console.log("code",code)

        if (!code) {
            return res.status(400).json({ success: false, message: "Referral code is required." });
        }

        // Find user by referral code
        const userWithCode = await User.findOne({ referralCode: code });

        // Check if referral code exists
        if (userWithCode) {
            return res.status(200).json({ success: true, message: "Referral code is valid." });
        } else {
            return res.status(404).json({ success: false, message: "Referral code not found." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


exports.getAllOrder = async (req, res) => {
    try {
        const allOrder = await Order.find()
            .populate('userId') // Populate the user details
            .populate('items.productId');
        if (!allOrder) {
            return res.status(404).json({
                success: false,
                message: "No order found",
            });
        }
        res.status(200).json({
            success: true,
            data: allOrder,
            message: "All orders retrieved successfully",
        })
    } catch (error) {
        console.error("Error getting order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Get the order ID from request parameters
        const { OrderStatus } = req.body; // Get the new order status from the request body



        // Find the order by its ID and update the status
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        order.OrderStatus = OrderStatus; // Update the order status
        await order.save(); // Save the updated order

        res.status(200).json({
            success: true,
            message: "Order status updated successfully.",
            data: order
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

exports.deliverMarkOrder = async (req, res) => {
    try {
        // console.log("i am hit")
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        console.log("body", req.body)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Check if the order is already delivered
        if (order.status === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Order has already been marked as delivered"
            });
        }

        // Check if the order has a referral code applied
        if (order.isReferralCodeApplied === true) {
            if (order.appliedCode) {
                // Find the user who referred the customer using the referral code
                const referrer = await User.findOne({ referralCode: order.appliedCode });

                if (!referrer) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid referral code"
                    });
                }

                // Add 2% commission to the referrer's wallet (assuming `wallet` field exists on the User model)
                const commission = order.finalMainPrice * 0.02; // 2% commission
                const roundedNumber = Math.round(commission * 100) / 100;
                // Update the referrer's wallet balance
                referrer.referralCodeBonus += Number(roundedNumber);
                await referrer.save();

                // Update the order status to "Delivered" and save it
                order.OrderStatus = "Delivered";
                await order.save();

                return res.status(200).json({
                    success: true,
                    message: "Order marked as delivered and 2% commission added to referrer's wallet"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Referral code applied, but no code found"
                });
            }
        } else {
            // No referral code applied, just mark the order as delivered
            order.status = "Delivered";
            await order.save();

            return res.status(200).json({
                success: true,
                message: "Order marked as delivered"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the order",
            error: error.message
        });
    }
};


exports.getMyOrderOnly = async (req, res) => {
    try {
        const { id } = req.query;

        // console.log(req.query);

        // Use findOne to search by userId instead of findById
        const findOrder = await Order.find({ userId: id }).populate({
            path: 'items.productId', // Populating the `productId` field within `items`
        });

        // console.log(findOrder);

        if (!findOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found for the given user ID.'
            });
        }

        res.status(200).json({
            success: true,
            orders: findOrder
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching orders.',
            error: error.message
        });
    }
};

// exports.makepayment = async (req,res) => {
//     try {
//         const {orderId} = req.params;
//         const
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while fetching orders.',
//             error: error.message
//         });
//     }
// }