const Announcement = require("../models/announcements");

//create announcement
exports.create = async (req, res) => {
    try {
        const announcement = await Announcement.create(req.body);
        res.status(201).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get all announcement
exports.getAll = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get announcement by id
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//delete announcement by id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement.findByIdAndDelete(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//update announcement by id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        res.status(200).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//delete all announcement
exports.deleteAll = async (req, res) => {
    try {
        await Announcement.deleteMany({});
        res.status(200).json({ message: "All announcements deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

