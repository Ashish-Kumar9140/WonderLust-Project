const express = require("express");
const router = express.Router();

const Booking = require("../models/booking.js");
const { Listing } = require("../models/listing.js");
// const { isLoggedIn } = require("../middleware.js");
const { isloggedIn, isOwner, validateListing } = require("../Middleware.js");

router.get(
    "/listings/:id/booking",
    isloggedIn,
    async (req, res) => {

        const listing = await Listing.findById(req.params.id);

        res.render("listings/booking.ejs", { listing });
    }
);


router.get("/my-bookings", isloggedIn, async (req, res) => {
    const bookings = await Booking.find({
        user: req.user._id
    })
        .populate("listing")
        .sort({ createdAt: -1 });

    res.render("listings/mybooking.ejs", { bookings });
});

router.post(
    "/listings/:id/booking",
    isloggedIn,
    async (req, res) => {

        // console.log("========== BOOKING REQUEST ==========");
        // console.log("Listing ID:", req.params.id);
        // console.log("User:", req.user);
        // console.log("Form Data:", req.body);

        const listing = await Listing.findById(req.params.id);

        // console.log("Listing found:", listing);

        const booking = new Booking({
            listing: listing._id,
            user: req.user._id,

            name: req.body.name,
            persons: req.body.persons,
            children: req.body.children,

            startDate: req.body.startDate,
            endDate: req.body.endDate,

            paymentMethod: req.body.paymentMethod
        });

        // console.log("Booking object:", booking);

        await booking.save();

        // console.log("BOOKING SAVED SUCCESSFULLY");

        req.flash("success", "Booking created successfully!");

        res.redirect(`/listings/${listing._id}`);
    }
);

module.exports = router;