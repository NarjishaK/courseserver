const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
courseId: {
    type: String,
    required: true
},
mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true
},
subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    required: true
},
instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
},
language: {
    type: String,
},
rating: {
    type: String,
},
price: {
    type: String,
},
discount: {
    type: String,
},
skillLevel: {
    type: String,
},
certificate: {
    type: String,//image
},
Isactive: {
    type: Boolean,
    default: true
},
curriculamName: {
    type: String,
},
curriculamTitle: {
    type: String,
},
curriculamDescription: {
    type: String,
},
curriculamCoverImage: {
    type: String,       //image
},
WhatWillYouLearn: {
    type: String,
},
Requirements: {
    type: String,
},
curriculamModules:[
    {
        moduleName: String,
        moduleTitle: String,
        moduleDescription: String,
        moduleVideo: String,    //video link
        moduleVideoTitle: String,
        moduleVideoDescription: String,
        moduleNotes: String,
        moduleNotesTitle: String,
        moduleImage: String,    //image
        isPaid: {
            type: Boolean,
            default: false
        }
    }
],


});

module.exports = mongoose.model("Course", courseSchema);
