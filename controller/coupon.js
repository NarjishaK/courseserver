const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get all
exports.getAll = async (req, res) => {
    try {
        const coupons = await Coupon.find().populate("courses");
        res.status(200).json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get by id
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findById(id).populate("courses");
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//delete by id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findByIdAndDelete(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//update by id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//delete all
exports.deleteAll = async (req, res) => {
    try {
        await Coupon.deleteMany({});
        res.status(200).json({ message: "All coupons deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};