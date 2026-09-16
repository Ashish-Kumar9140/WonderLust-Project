const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    persons: {
        type: Number,
        required: true,
        min: 1
    },

    children: {
        type: Number,
        default: 0,
        min: 0
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["pay_now", "pay_at_villa"],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    bookingStatus: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);