const Quiz = require("../models/quiz");

exports.create = async (req, res) => {
    try {
        const { question, answers, correctAnswer, course } = req.body;
        const quiz = await Quiz.create({ question, answers, correctAnswer, course });
        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get all
exports.getAll = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("course");
        res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//get by id
exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findById(id).populate("course");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//delete by id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findByIdAndDelete(id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//update by id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


//delete all
exports.deleteAll = async (req, res) => {
    try {
        await Quiz.deleteMany({});
        res.status(200).json({ message: "All quizzes deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
