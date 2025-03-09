const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
})

module.exports = mongoose.model("Quiz", QuizSchema);