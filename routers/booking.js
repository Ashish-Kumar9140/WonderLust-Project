const express = require("express");
const router = express.Router();

const Booking = require("../models/booking.js");
const { Listing } = require("../models/listing.js");
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
        const listing = await Listing.findById(req.params.id);

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
        await booking.save();
        req.flash("success", "Booking created successfully!");
        res.redirect(`/listings/${listing._id}`);
    }
);

module.exports = router;